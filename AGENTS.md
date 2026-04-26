# AGENTS.md (root)

You are operating inside a Note + Prototype Template repository. This file is the entry point for agent rules. It routes you to the right scoped rules for the work you're about to do.

## Read first

- `MAP.md` — architecture map. Read on first entry to this template.
- `SKILLS.md` — bundled and recommended Claude skills.

## Then route by scope

| Working in… | Read… |
|---|---|
| `notes/` | `notes/AGENTS.md` and `notes/SCHEMA.md` |
| `prototypes/` | `prototypes/AGENTS.md` and `prototypes/SYSTEM.md` |
| Cross-cutting (root) | `PROCESSES.md` and `CONVENTIONS.md` |

## Repo-wide rules

These apply everywhere in the repo.

### Token efficiency

- Read indexes and frontmatter before reading bodies. The structure exists to make this possible.
- Do not duplicate content into individual files. Extend the shared sources (`notes/SCHEMA.md`, `prototypes/shared/styles.css`, `prototypes/SYSTEM.md`).
- Refer to `MAP.md` to find files; do not crawl the tree.

### Sync rules (do these in the same edit, or stop)

- Add a note → update `notes/INDEX.md`.
- Rename or archive a note → update `notes/INDEX.md` and any `related:` references that point to it.
- Add a prototype → update `prototypes/prototypes.md` and add a card to `prototypes/index.html`.
- Add a CSS class to `shared/styles.css` → add a row to `prototypes/SYSTEM.md`. If interactive, add a `data-action` entry and wire `shared/ui.js`.
- Add a skill in `.claude/skills/` → add an entry to `SKILLS.md`.
- Change a convention → update the relevant reference doc (`SCHEMA.md`, `SYSTEM.md`, `CONVENTIONS.md`).

### Don't do

- Don't introduce build tools, package managers, or frameworks unless the user explicitly asks. The vanilla constraint is load-bearing.
- Don't edit files in any `_examples/` folder. They're reference content.
- Don't bypass `_template.*` files. They're canonical starting points.
- Don't synthesise from `draft` notes unless explicitly asked.
- Don't restate claims without citing source notes by filename and claim ID.

### When the user changes something architectural

If a request would change the template's structure (rename a layer, restructure a folder, change a core convention), pause and confirm before doing it. Architectural changes ripple through every reference doc; cheap to confirm, expensive to undo.

## Drift detection

Run `./check.sh` from repo root to detect:

- CSS classes defined but not in SYSTEM.md (or vice versa)
- Notes not listed in INDEX.md
- HTML using undefined classes
- Note frontmatter that violates SCHEMA.md

Run before completing any non-trivial multi-file change.

## File map (one screen)

```
README.md MAP.md AGENTS.md PROCESSES.md CONVENTIONS.md SKILLS.md
check.sh .gitignore .agentignore
.claude/skills/note-synthesise/SKILL.md

notes/
  AGENTS.md SCHEMA.md INDEX.md README.md _template.md
  _examples/example-research-note.md

prototypes/
  AGENTS.md SYSTEM.md prototypes.md README.md
  index.html _template.html
  _examples/example-dashboard.html
  shared/
    styles.css ui.js chat.js mermaid.js
    patterns/chat.html patterns/sidebar-layout.html
```
