---
name: local-ci-mirror
description: >
  Use this skill WHENEVER the agent is about to push commits or open a pull request
  against main — whether requested directly by the user ("push this", "open a PR") or
  decided by the agent itself after finishing a task. Goal: catch the same failures
  CI.yaml would catch (lint, type errors, test failures, build errors), but locally
  and BEFORE pushing, so CI never has to be the first place a problem is discovered.
  This does not replace CI.yaml — it mirrors the `quality` job locally to fail fast
  and save CI runtime/Action minutes.
---

# Local CI Mirror — Fail fast, before CI has to

## The problem this prevents
An agent finishes a task, commits, and pushes straight to a PR. CI runs 5+ minutes
later and fails on something trivial (a lint error, a type error, a broken test) that
could have been caught in 30 seconds locally. This wastes CI minutes, delays feedback,
and creates a noisy PR history of "fix lint" follow-up commits.

## Mandatory rule — run BEFORE every push (not after)

Before running `git push`, always execute the following sequence, in this exact order,
mirroring the `quality` job in `.github/workflows/CI.yaml`:

1. **Install dependencies exactly as CI does**
   ```bash
   npm ci
   ```
   - Do NOT use `npm install` here — `npm ci` matches what CI runs and will catch a
     stale/broken `package-lock.json` that `npm install` would silently paper over.

2. **Lint**
   ```bash
   npm run lint
   ```
   - If this fails, fix the reported issues. Do not push with known lint errors under
     the assumption "CI will catch it" — that defeats the purpose of this skill.

3. **Type check**
   ```bash
   npx tsc --noEmit
   ```
   - Must return zero errors. Type errors are non-negotiable — never push with `any`
     casts or `@ts-ignore` added purely to silence this step; fix the actual type issue
     or ask the user if a suppression is genuinely warranted.

4. **Unit tests**
   ```bash
   npm test
   ```
   - All tests must pass. If a test is failing because the feature intentionally changed
     behavior, update the test as part of the same commit — never leave a red test with
     a comment like "will fix later."

5. **Build**
   ```bash
   npm run build
   ```
   - This is the step most likely to catch MDX/content issues (e.g. a broken `.mdx`
     import, a missing component in `mdx-components.tsx`) that lint/tsc alone won't
     catch, since Next.js statically resolves post imports at build time.

6. **Only after steps 1–5 all pass, proceed to push**
   ```bash
   git push origin <branch-name>
   ```

## Local secrets check (lightweight complement to Gitleaks in CI)
CI.yaml already runs Gitleaks on every push/PR, scanning full git history. However,
Gitleaks only catches a secret AFTER it has already been committed — at that point it's
already in git history and removing it cleanly requires a history rewrite. So, before
`git add`/`git commit`, do a quick sanity pass:
- Never hardcode API keys, tokens, or credentials directly in source files.
- Confirm `.env`, `.env.local`, and any secret files are covered by `.gitignore` before
  staging changes.
- If a secret was pasted into a file by mistake, remove it before commit — don't rely
  on CI to catch it after the fact.

## When it's OK to skip a step
Only when the user **explicitly says so** for a specific, low-risk reason, e.g.:
> "Skip the build step, I just want to check lint quickly on this draft."

Even then:
- Never skip steps silently — state out loud which step is being skipped and why.
- Never skip all steps just to push faster — that defeats the purpose of this skill.
- Trivy (vuln scanning) and Lighthouse CI (perf) remain CI-only checks (they require
  network/CI infra); this skill does not attempt to replicate those locally.

## Quick self-check checklist for the agent (before reporting "pushed")
- [ ] Ran `npm ci` (not `npm install`) to match CI's dependency resolution
- [ ] `npm run lint` passed with zero errors
- [ ] `npx tsc --noEmit` passed with zero errors
- [ ] `npm test` passed with zero failing tests
- [ ] `npm run build` completed successfully (this also validates all `.mdx` posts
      still import and render correctly)
- [ ] No secrets/credentials were hardcoded in any staged file
- [ ] Only THEN pushed to origin

## Common failure modes to stay alert for
- Agent runs `npm run build` successfully once, then makes a "small" content or MDX
  change afterward without re-running the build → always re-run step 5 after ANY file
  change, even ones that seem unrelated to code.
- Agent assumes a passing local `npm run dev` (dev server) is equivalent to a passing
  `npm run build` → it is NOT; dev mode is more forgiving of certain errors that only
  surface in production builds.
- Agent adds a new MDX component (e.g. a `<Tabs>` component) but forgets to register it
  in `lib/mdx-components.tsx` → this will only surface at build time, which is exactly
  why step 5 must never be skipped when content/component changes are involved.