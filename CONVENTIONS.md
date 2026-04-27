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

Two supported tools, used for different workflows.

### draw.io — primary, for human-drawn diagrams

Use when *you* are drawing or editing the diagram in the draw.io desktop app or web editor. This is the default for visual artifacts that live as files in the repo.

**Workflow:**

1. Create the diagram in draw.io. Save as `.drawio` (the editable source).
2. Export the diagram as `.png` (raster) or `.svg` (vector, preferred where possible).
3. Save both files to the appropriate `diagrams/` folder:
   - `notes/diagrams/<name>.drawio` and `notes/diagrams/<name>.svg`
   - `prototypes/diagrams/<name>.drawio` and `prototypes/diagrams/<name>.svg`
4. Embed the exported image in the consuming note or prototype:
   - Notes: `![Diagram caption](diagrams/<name>.svg)`
   - Prototypes: `<img src="diagrams/<name>.svg" alt="Diagram caption">`
5. When you change the diagram, re-export to overwrite the embedded file.

**Why draw.io as primary:** it's already in your toolchain, has a polished visual editor, and supports complex diagrams Mermaid can't express well. The cost is the source `.drawio` XML is bulky for AI agents to read or modify — but agents rarely need to round-trip diagrams. They reference the export, not the source.

### Mermaid — secondary, for AI-generated inline diagrams

Use when an agent is producing the diagram from a textual description, or when you want a diagram to render inline in a note without exporting an image. Best for quick flowcharts, sequence diagrams, state diagrams, and simple architecture sketches.

- In notes: fenced ```mermaid``` blocks. Renders natively in GitHub, Obsidian, VSCode preview.
- In prototypes: include `prototypes/shared/mermaid.js` once per prototype that needs diagrams. Then use `<pre class="mermaid">…</pre>` blocks.

**Why keep Mermaid available:** it's the cheapest path when you ask Claude "diagram this" — the agent writes the Mermaid in the response and it renders inline without a draw.io round-trip. Effectively a no-cost fallback.

### Choosing between them

- You're drawing it yourself → draw.io
- You're asking an agent to draw it → Mermaid
- You want it to render inline in a markdown note without an image file → Mermaid
- You want polished aesthetic / complex layout / branding → draw.io
- You'll iterate on the diagram visually over time → draw.io

### Excalidraw

Optional third tool. Browser-based at excalidraw.com, sketchy aesthetic, JSON format. Use only if you specifically want hand-sketched aesthetic that draw.io's clean style can't produce. Save `.excalidraw` files in the same `diagrams/` folder.

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
