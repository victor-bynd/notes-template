# Skills

Index of Claude skills relevant to this template. Skills are loadable capability packages that Claude activates automatically when the user's request matches their description.

Two kinds of skills are referenced here:

1. **Bundled** — shipped inside this template under `.claude/skills/`. Travels with `git clone`.
2. **Recommended** — existing Claude skills that pair well with this template. Install or enable in your Claude environment.

## Bundled

### `note-synthesise`

Located at `.claude/skills/note-synthesise/SKILL.md`.

Encodes the progressive-disclosure synthesis workflow defined in `notes/AGENTS.md` and `PROCESSES.md`. Triggers automatically when the user asks to synthesise, summarise across, or find patterns in the `notes/` folder.

Sample triggering phrases:
- "Synthesise my notes about X."
- "What's the state of my research on Y?"
- "Find tensions across notes tagged Z."
- "Pull together what we've learned about A."

The skill reads INDEX → frontmatter → bodies in that order, cites sources by filename, references claims by ID, and produces output as a new synthesised note.

To remove this skill from a cloned project, delete the directory: `rm -rf .claude/skills/note-synthesise`.

## Recommended

These skills are not bundled but pair well with this template. If they're available in your Claude environment, prefer them over manual workflows.

### `web-artifacts-builder`

Use when a prototype genuinely needs reactive state, routing, or shadcn/ui components — i.e. when vanilla HTML hits its limit. Treat as the escape hatch from the vanilla-only convention. Output goes in `prototypes/<name>/` rather than a single .html file (sub-folder is the signal that a prototype has graduated past vanilla).

### `canvas-design`

Use when you need real visual concept work — posters, hero illustrations, design panels for slides. Outputs `.png` or `.pdf` static visuals. Pairs with prototypes when a prototype calls for a hero image or placeholder visual.

### `pdf`

Use when exporting a synthesised note or set of notes to PDF for sharing.

### `docx`

Use when a synthesised note needs to become a formal Word document. The path is: notes → synthesise → docx export.

### `pptx`

Use when notes or prototypes need to feed a slide deck.

### `mcp-builder`

Use when this template's content suggests a custom MCP integration (e.g. you're prototyping an internal tool and want Claude to talk to it directly).

### Brand-specific (if applicable)

If you have access to brand-specific skills (`beyond-whitepaper`, `beyond-pptx-style`, etc.), prefer them when the deliverable is a formal company document. They layer brand identity on top of the core `docx` / `pptx` skills.

## When to write a custom skill vs. a process

A workflow deserves to be a skill when:

- It's invoked frequently (weekly or more).
- It has a consistent multi-step structure that benefits from automatic activation.
- The user phrasing is recognisable and reasonably narrow.
- Drift across sessions is costly.

If any of those don't hold, document it as a recipe in `PROCESSES.md` instead. Skills are not free — each one is more surface to maintain and risks false-trigger or false-non-trigger failures.

Use the bundled `note-synthesise` skill as a working example when authoring your own.
