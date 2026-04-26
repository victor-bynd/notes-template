# notes/ agent rules

Scoped instructions for AI agents working inside the `notes/` folder. Read this *and* `SCHEMA.md` before performing any note operation.

## Read order (progressive disclosure)

When asked about notes, read in this order — stop as soon as you have enough:

1. `INDEX.md` — one-line summaries of every note. Use this to filter candidates.
2. **Frontmatter only** of candidate notes. Use frontmatter to refine the candidate set: filter by `status`, `tags`, `key_claims`, `open_questions`, `related`.
3. **Body** of the final candidate set, scoped to specific sections (`## Synthesis`, `## Observations`) when possible.

Do not read full bodies of every note. The structure exists to make this unnecessary.

## Hard rules

- Every note must have valid frontmatter matching `SCHEMA.md`. Validate before saving.
- Filename convention: kebab-case, optionally suffixed with date (e.g. `oauth-decision-2026-04-26.md`). Never spaces, never camelCase.
- When you create, rename, archive, or change the status of a note: update `INDEX.md` in the same edit.
- Never synthesise from notes whose `status: draft` unless the user explicitly asks. Drafts are unfinished thinking.
- Never invent claim IDs. If you assign a new claim ID, ensure it's unique across the folder (grep before assigning).
- Do not edit files inside `_examples/`. They're reference content, deletable as a unit.

## Synthesis behaviour

When asked to synthesise:

1. Use the read order above to assemble the candidate set.
2. Cite source notes by filename. Do not paraphrase claims silently — agents downstream need traceability.
3. Reference claim IDs (`[claim:auth-001]`) when synthesising across notes. Don't restate the claim text.
4. Surface tensions and contradictions explicitly — that's the high-value output of synthesis.
5. Distinguish observation from interpretation. The Synthesis section is your current thinking; Observations are evidence.

## When updating multiple notes

Some operations cross many files (e.g. "update `related:` frontmatter across all notes to reflect cross-references mentioned in their bodies"). For these:

1. Read INDEX.md first.
2. Make a plan listing every file you intend to touch and the proposed change.
3. Apply changes file by file.
4. Update INDEX.md last.

## Related references

- `SCHEMA.md` — full frontmatter spec, section conventions, tag conventions, glossary
- `INDEX.md` — the manifest you maintain
- `../AGENTS.md` — repo-wide agent rules
- `../PROCESSES.md` — named recipes for common tasks
