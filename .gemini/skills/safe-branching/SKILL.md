---
name: safe-branching
description: >
  Use this skill WHENEVER a new git branch needs to be created (feature, fix, chore, etc.)
  — whether requested directly by the user ("create a new branch", "start feature X") or
  decided by the agent itself when starting a new task. This applies EVEN IF the agent is
  currently sitting on a different feature branch (not main). Goal: ensure every new branch
  is always created from the latest synced state of the base branch (main/master), never
  accidentally inheriting code/commits from another feature branch.
---

# Safe Branching — Always create new branches from a freshly synced base branch

## The problem this prevents
An AI agent (or a human) is on `feature/A`, gets assigned a new task, and runs
`git checkout -b feature/B` right there. Result: `feature/B` inherits every commit from
`feature/A`, causing confusing reviews, unnecessary conflicts, and dirty PRs.

## Mandatory rule (follow this exact order, no skipping steps)

Before creating ANY new branch, always perform the following sequence:

1. **Check that the working tree is clean**
   ```bash
   git status --porcelain
   ```
   - If there are uncommitted changes → STOP. Ask the user whether to commit, stash,
     or discard them first. Never stash/discard on your own without confirmation.

2. **Determine the repo's actual base branch name**
   ```bash
   git remote show origin | grep "HEAD branch"
   # or
   git symbolic-ref refs/remotes/origin/HEAD --short
   ```
   - Do not assume it's `main`. Many repos use `master`, `develop`, or something else.
   - If it can't be determined, ask the user what the base branch is.

3. **Fetch to get the latest remote info**
   ```bash
   git fetch origin --prune
   ```

4. **Checkout the base branch**
   ```bash
   git checkout <base-branch>   # e.g. git checkout main
   ```
   - If the local base branch doesn't exist yet: `git checkout -b <base-branch> origin/<base-branch>`

5. **Pull to sync with origin**
   ```bash
   git pull origin <base-branch>
   ```
   - If there's a conflict while pulling the base branch (rare) → STOP, report it to the
     user, do not resolve it on your own.

6. **Only after steps 1–5 are done, create the new branch FROM the just-pulled base branch**
   ```bash
   git checkout -b <new-branch-name>
   ```
   - Follow the repo's naming convention (e.g. `feature/`, `fix/`, `chore/` + short description).

7. **Confirm before reporting completion**
   ```bash
   git log --oneline -1 origin/<base-branch>
   git log --oneline -1 HEAD
   ```
   - Both commit hashes must MATCH at the moment the new branch is created (no new commits yet).
   - If they don't match → something went wrong; stop and report instead of continuing to code.

## When it's OK to branch from something other than main
Only when the user **explicitly asks for it**, e.g.:
> "Create a sub-branch off feature/A to split out the UI work"

Even then, the agent must:
- Confirm the exact base branch name with the user (don't guess).
- Still run `git fetch origin` + `git pull origin <that-branch>` before creating the
  sub-branch, to make sure that base branch is also up to date.

## After a PR is merged (cleanup)
```bash
git checkout <base-branch>
git pull origin <base-branch>
git branch -d <merged-branch-name>   # delete the local branch that was merged
git remote prune origin              # clean up stale remote-tracking branches
```

## Quick self-check checklist for the agent (before reporting "branch created")
- [ ] Working tree was clean before starting (or handled per user's instruction)
- [ ] Ran `git fetch origin`
- [ ] Checked out the correct base branch (main/master/...), NOT another feature branch
- [ ] `git pull origin <base-branch>` succeeded with no errors
- [ ] New branch was created with `git checkout -b` IMMEDIATELY after the pull step,
      with no other steps in between
- [ ] `HEAD` of the new branch matches the commit of `origin/<base-branch>` at creation time
- [ ] No leftover commits/code from a previous feature branch leaked in

## Common failure modes to stay alert for
- Agent "misremembers" being on main while it's actually still on an old feature branch
  (context loss) → ALWAYS run `git branch --show-current` to confirm before `checkout -b`.
- Agent creates the new branch but forgets to `pull` after checking out the base branch
  (local base branch is stale vs. origin) → ALWAYS pull right after checking out the base
  branch, even if it seems freshly checked out.
- Multiple remotes exist (not just `origin`) → confirm the correct remote to pull from if
  the repo has an upstream/fork setup.