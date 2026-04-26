# Conventions

Cross-cutting conventions that span both notes and prototypes. These are project defaults — adapt them when you have a real reason, but document the change here.

## Filenames

- Always kebab-case. Never spaces, never camelCase, never PascalCase.
- Notes: `<topic>-YYYY-MM-DD.md` if dated; `<topic>.md` if standing.
- Prototypes: `<descriptive-name>.html`.
- Reserved prefixes:
  - `_template.*` — canonical starting points (do not delete)
  - `_examples/` — reference content (delete when initialising a project)

## Diagrams

Default format: **Mermaid**.

- In notes: fenced ```mermaid``` blocks. Renders natively in GitHub, Obsidian, VSCode preview.
- In prototypes: include `prototypes/shared/mermaid.js` once per prototype that needs diagrams. Then use `<pre class="mermaid">…</pre>` blocks.

Why Mermaid: it's the lowest-token, most LLM-fluent, most universally rendered diagram format. Agents write it natively without prompting. It diffs cleanly in git.

When to use Excalidraw instead: if you genuinely need a hand-drawn / sketchy aesthetic that Mermaid can't produce. Save `.excalidraw` files alongside the note or prototype that references them.

When to *not* use draw.io: this template is optimised for AI-supported workflows. draw.io's XML format is bulky and not LLM-friendly. Avoid it unless you have an existing constraint that forces it.

## Stable identifiers

When something will be referenced from elsewhere (across notes, between prototypes, in synthesis output), give it a stable ID:

- Claims: `[claim:topic-NNN]` — see `notes/SCHEMA.md`
- Decisions: typically lifted into a decision note (`type: decision` in frontmatter)
- Prototypes: filename is the ID
- Components: CSS class name is the ID (defined in `prototypes/shared/styles.css`)

Once assigned, IDs are immutable. Renaming breaks references silently.

## Tagging

Frontmatter `tags:` are free-form and you maintain the vocabulary. Suggested principles:

- Kebab-case (`ui-patterns`, not `UI Patterns`).
- Short — 1–3 words.
- Pick one canonical form per concept (`research`, not `research / research-notes / researching`).
- When you introduce a new tag, scan existing notes to retrofit if appropriate.

Inline tags (`[#decision]`, `[#claim]`, etc.) are fixed. See `notes/SCHEMA.md`.

## British vs. American English

Use whatever your project uses. This template uses British English in defaults (`synthesise`, `colour`, `behaviour`) — change if your project standard is American. Consistency within a project matters more than the choice itself.

## Prose style

- Active voice over passive.
- Short paragraphs. Long lists become tables.
- Do not over-format with headers and bullets; prose carries more meaning per token.
- For agent-facing docs (AGENTS.md, SCHEMA.md, SYSTEM.md, PROCESSES.md): use tables and short rules. Agents extract structured fields more reliably than they extract prose.

## What goes where

| Type of content | Lives in |
|---|---|
| Project context, decisions, observations | `notes/` |
| Visual concepts, layouts, interactions | `prototypes/` |
| How agents should behave | `AGENTS.md` files |
| What classes / fields / sections exist | `SCHEMA.md`, `SYSTEM.md` |
| How to do common multi-step tasks | `PROCESSES.md` |
| Cross-cutting style rules (this file) | `CONVENTIONS.md` |
| Skills (Claude capability packages) | `.claude/skills/`, indexed in `SKILLS.md` |
