---
name: content-schema-validation
description: >
  Use this skill WHENEVER a change touches how blog post content is structured or
  parsed — new/changed frontmatter fields, new MDX components, changes to post
  routing/slug logic, or i18n/locale-related content structure — whether requested
  directly by the user or decided by the agent while implementing a feature. This
  applies EVEN IF `npm run build` is expected to pass, because a successful build does
  NOT guarantee every existing post still renders correctly or that content authors
  will use new fields/components correctly — build success only proves the code
  compiles, not that the content contract is upheld.
---

# Content Schema Validation — A passing build does not mean content is safe

## The problem this prevents
An agent adds a new required frontmatter field (e.g. `locale`), a new MDX component
(e.g. `<Tabs>`), or changes how `lib/posts.ts` parses metadata. `npm run build` passes
because Next.js/MDX compiles fine — but at runtime, an existing post missing the new
field renders with `undefined` values, a broken link, or a silently missing UI element
that nobody notices until a user reports it. Unlike a TypeScript error, this class of
bug is invisible to the standard CI pipeline (lint/tsc/build/test) because it's a
content-data problem, not a code-compilation problem.

## When this skill applies (non-exhaustive triggers)
- Adding, renaming, or making a frontmatter field required (e.g. `title`, `date`,
  `tags`, `locale`, `slug`).
- Adding a new MDX component that content is expected to adopt (e.g. `<Tabs>`,
  `<Callout>`) and registering it in `lib/mdx-components.tsx`.
- Changing the post-loading mechanism (e.g. `lib/posts.ts` metadata extraction, or the
  dynamic `.mdx` import pattern in `page.tsx`).
- Introducing i18n structure that changes how posts are organized (e.g. splitting a
  single post into `slug.en.mdx` / `slug.vi.mdx`, or adding a `locale` field).

## Mandatory rule (follow this exact order)

1. **Inventory all existing posts before making the change**
   ```bash
   ls posts/*.mdx
   ```
   - Know the full scope of what could be affected. Do not assume "just the new post
     I'm working on" — a schema/parsing change affects every existing file.

2. **Define the schema change explicitly before touching code**
   - State clearly: is the new field/component REQUIRED or OPTIONAL for existing posts?
   - If required, there MUST be either (a) a migration step that backfills the field
     into every existing `.mdx` file, or (b) a safe fallback/default in the parsing
     code (`lib/posts.ts`) so missing-field posts don't break or render incorrectly.
   - Never silently assume every existing post will "just happen" to have the new
     field — verify it.

3. **Grep for actual usage before assuming impact is limited**
   ```bash
   grep -rl "specific-field-or-component-name" posts/
   ```
   - Confirms exactly which posts already use something related, and which don't.

4. **After implementing, validate EVERY existing post, not just the one being edited**
   ```bash
   npm run build
   ```
   - A successful build is necessary but NOT sufficient. Additionally:
   - Spot-check render output for at least one OLD post (pre-existing, not touched in
     this change) and one NEW/edited post, confirming both display correctly — old
     posts must not silently degrade.
   - If a frontmatter field was added, verify the metadata extraction in
     `lib/posts.ts` (via `gray-matter`) has a sane default for posts that lack it,
     rather than propagating `undefined` into the UI.

5. **If a new MDX component is introduced, document its exact usage syntax**
   - Per the `readme-sync` skill: add a concrete example to README.md showing the
     exact MDX syntax (e.g. the `<Tabs><Tab label="...">` pattern) so future posts
     are written consistently, not reinvented per-post.

6. **For i18n/locale content structure changes specifically**
   - Explicitly decide and document the fallback behavior when a post has no
     translation yet in the selected locale (e.g. fall back to default locale, show a
     "not yet translated" notice, or hide the post from that locale's listing).
   - Never leave this behavior undefined/accidental — a missing-translation post
     rendering as a blank page or a broken import is a common failure mode here.

## What NOT to do
- Do not treat "the build passed" as proof the content layer is safe — this skill
  exists specifically because that assumption is false for content-schema changes.
- Do not make a new frontmatter field required without either migrating existing posts
  or adding a fallback — pick one explicitly, don't leave it ambiguous.
- Do not add a new MDX component without registering it in the shared component map
  (`lib/mdx-components.tsx`) — an unregistered component compiles fine in isolation but
  fails at runtime the moment a post tries to use it.

## Quick self-check checklist for the agent (before reporting "done")
- [ ] Listed all existing `posts/*.mdx` files potentially affected by this change
- [ ] Explicitly decided: is the new field/component required or optional for
      existing content?
- [ ] If required: migrated existing posts OR added a safe fallback in parsing code
- [ ] Ran `npm run build` AND spot-checked at least one pre-existing post's rendered
      output, not just the one being actively edited
- [ ] New MDX components are registered in `lib/mdx-components.tsx`
- [ ] Usage example added to README.md (per `readme-sync` skill) if this introduces a
      new pattern for future content authors
- [ ] For i18n-related changes: fallback behavior for missing translations is
      explicitly defined and tested, not left to chance

## Common failure modes to stay alert for
- Agent tests only the one post it's actively working on, never checking whether
  older posts still render correctly after a shared parsing/schema change.
- Agent adds a new component and it works in the post where it was first used, but
  forgets to add it to `lib/mdx-components.tsx`'s shared map — it then fails the
  moment a DIFFERENT post tries to use the same component, since only the first
  usage happened to be manually wired up during testing.
- Agent assumes `gray-matter`'s frontmatter parsing will "just work" for old posts
  missing a newly-required field, without checking what value actually gets returned
  (often `undefined`, which can silently propagate into broken UI rather than
  throwing a visible error).