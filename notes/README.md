# Notes

Markdown notes structured for AI-supported synthesis and research.

## Workflow

1. Copy `_template.md` to a descriptive filename. Suggested format: `topic-YYYY-MM-DD.md` or `topic-slug.md`.
2. Fill frontmatter immediately. Status, tags, and related are how agents orient.
3. Write the body. Keep observations separate from synthesis.
4. When the note matures, change `status` from `draft` to `active`, then `synthesised` once you've extracted insights into derived work.

## Frontmatter fields

- `title` — Human-readable title. Often the same as the filename minus the date.
- `status` — `draft` (in progress), `active` (referenced often), `synthesised` (insights extracted), `archived` (no longer relevant).
- `tags` — Free-form. Use sparingly and consistently; agents filter on these.
- `related` — Filenames of other notes this one connects to. Bidirectional links are a manual chore — agents can be asked to maintain them.
- `date` — ISO format. The date the note was first written, not last edited.
- `source` — Optional. URL, person, doc, or meeting that prompted the note.

## Asking agents to work on notes

Useful prompts:

- "Synthesise notes tagged `research` from the last month into a one-page summary."
- "Find tensions or contradictions across notes related to `discovery-2026-04-20.md`."
- "Read all `draft` notes and suggest which are ready to promote to `active`."
- "Update the `related` frontmatter across all notes to reflect cross-references mentioned in their bodies."
