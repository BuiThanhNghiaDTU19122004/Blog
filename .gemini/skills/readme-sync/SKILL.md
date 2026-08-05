---
name: readme-sync
description: >
  Use this skill WHENEVER a change is made that affects the project's architecture,
  data flow, routing, storage mechanism, environment variables, MDX components, or
  how a contributor is expected to write/add content — whether requested directly by
  the user ("update the README") or not. This applies EVEN IF the user did not
  explicitly ask for documentation, because README drift (docs describing an old
  architecture) is a silent, compounding problem that gets worse the longer it's
  ignored. Goal: README.md always reflects the CURRENT state of the system, not a
  past one.
---

# README Sync — Documentation is not optional cleanup, it's part of the task

## The problem this prevents
An agent implements a new feature (e.g. switches view-count storage from file-only to
RAM-cache, adds i18n routing, adds an MDX `<Tabs>` component) and reports the task as
"done" without touching README.md. Weeks later, a new contributor (or the user's future
self) reads the README, follows outdated instructions, and either breaks something or
wastes time reverse-engineering the real architecture from source code.

## When README.md MUST be updated (non-exhaustive triggers)
- A new API route is added, removed, or its request/response shape changes.
- The way data is stored or persisted changes (e.g. file → RAM cache → DB/KV).
- A new environment variable is required to run or deploy the project.
- A new MDX component is added that content-writers are expected to use in future
  posts (e.g. `<Tabs>`, a new shortcode, a new frontmatter field).
- Routing structure changes (e.g. introducing locale-prefixed routes for i18n).
- A new script/command is added to `package.json` that a contributor would need to
  know about (e.g. a new `npm run` task).
- Any change that alters "how do I do X" for a future contributor or content writer.

## Mandatory rule (follow this exact order)

1. **Identify what changed from a contributor's perspective, not an implementer's**
   Ask: "If I were a new person joining this repo today, what would I need to read in
   the README to understand or use this feature correctly?" This is different from
   describing implementation details — focus on the *usage* and *mental model*, not
   every internal function name.

2. **Locate the relevant existing section in README.md before writing**
   ```bash
   grep -n "^#" README.md
   ```
   - Check whether an existing section should be updated in place, versus a new
     section being needed. Prefer updating existing sections over creating duplicate/
     near-duplicate ones.

3. **Match the existing README's tone, structure, and level of detail**
   - Do not introduce a wildly different documentation style (e.g. suddenly adding
     heavy diagrams when the rest of the README is plain prose, or vice versa) unless
     the user asks for a style change.
   - If the README uses text-flow diagrams (e.g. `GET → Read JSON → Return`), keep
     using that convention for new flows rather than switching to something else.

4. **Update, don't just append**
   - If a section describes an architecture that the current change replaces (e.g.
     "views are stored in a JSON file read on every request"), that section must be
     REWRITTEN to reflect the new reality — not left in place with a new section
     awkwardly bolted on below it describing the new behavior. Contradictory or
     outdated content left in the README is worse than no documentation at all.

5. **Include a "how to use this going forward" note when relevant**
   - For structural/content features (like a new MDX component, a new frontmatter
     field, a new locale-adding process), include a short, concrete example showing
     how a future contributor would use it — not just a description of what it does.

6. **Verify README renders correctly**
   - If README uses Markdown features (tables, code fences, nested lists), do a final
     read-through to confirm formatting isn't broken, especially after editing existing
     sections.

## What NOT to do
- Do not create a separate `ARCHITECTURE.md`, `CHANGELOG.md`, or similar file instead
  of updating README.md unless the user explicitly asks for a separate file, or the
  existing README already delegates to one.
- Do not write documentation that describes intent/plans ("we will eventually...") —
  README should describe what IS true right now in the codebase.
- Do not leave TODO placeholders in README ("TODO: document this") — either write the
  documentation now or explicitly tell the user it still needs to be written and why.

## Quick self-check checklist for the agent (before reporting a task "done")
- [ ] Did this change alter architecture, data flow, routing, storage, env vars, or
      the content-writing workflow?
- [ ] If yes: was the relevant README.md section identified and updated (not just
      appended to)?
- [ ] Does the updated section match the existing README's tone/structure/diagram style?
- [ ] Is there a concrete usage example for any new pattern a content writer or future
      contributor would need to follow?
- [ ] Were any now-inaccurate parts of the OLD README content removed or corrected,
      not just left alongside the new content?

## Common failure modes to stay alert for
- Agent documents the NEW behavior but forgets to remove/correct the OLD description
  still sitting a few paragraphs above or below it, leaving the README self-contradictory.
- Agent writes a highly technical, implementation-detail-heavy paragraph when the
  README's existing style is a simple text-flow diagram plus a short explanation —
  match the existing register.
- Agent treats README updates as a "nice to have" tacked onto the end of the task
  instead of a required deliverable equal in priority to the code change itself.