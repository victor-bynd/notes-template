# Template architecture map

One-page orientation. Read this first when entering the template fresh.

## Four layers

This template is organised into four distinct layers. Each file belongs to exactly one.

### 1. Rules — what agents must / must not do

- `AGENTS.md` (root) — repo-wide rules + router to scoped rules
- `notes/AGENTS.md` — notes-specific rules
- `prototypes/AGENTS.md` — prototypes-specific rules

### 2. References — lookup tables for vocabulary and structure

- `notes/SCHEMA.md` — frontmatter spec, sections, tags, glossary
- `notes/INDEX.md` — manifest of every note (auto-maintained)
- `prototypes/SYSTEM.md` — design system vocabulary (tokens, components, hooks, patterns)
- `prototypes/prototypes.md` — manifest of every prototype

### 3. Processes — named recipes for common tasks

- `PROCESSES.md` (root) — synthesis, prototype-add, audits, etc.
- `CONVENTIONS.md` (root) — cross-cutting conventions (diagrams, naming, IDs)
- `SKILLS.md` (root) — bundled and recommended Claude skills

### 4. Records — generated/derived content

- `notes/*.md` — your notes
- `prototypes/*.html` — your prototypes
- `prototypes/shared/styles.css` — design system source
- `prototypes/shared/ui.js`, `prototypes/shared/chat.js` — interactive helpers
- `prototypes/shared/patterns/*` — canonical pattern markup
- `_examples/` (in both folders) — reference content, deletable

## File map

```
.
├── README.md                       # template usage (clone, customise, start)
├── MAP.md                          # this file
├── AGENTS.md                       # repo-wide rules + router
├── PROCESSES.md                    # named recipes
├── CONVENTIONS.md                  # cross-cutting conventions
├── SKILLS.md                       # Claude skills index
├── check.sh                        # drift detection
├── .gitignore
├── .agentignore                    # paths agents skip by default
│
├── .claude/
│   └── skills/
│       └── note-synthesise/
│           └── SKILL.md            # bundled skill
│
├── notes/
│   ├── AGENTS.md                   # notes-specific rules
│   ├── SCHEMA.md                   # frontmatter + conventions
│   ├── INDEX.md                    # notes manifest
│   ├── README.md                   # human-facing pointer
│   ├── _template.md                # canonical starting point
│   ├── diagrams/                   # .drawio sources + svg/png exports
│   │   └── README.md
│   └── _examples/
│       └── example-research-note.md
│
└── prototypes/
    ├── AGENTS.md                   # prototypes-specific rules
    ├── SYSTEM.md                   # design system vocabulary
    ├── prototypes.md               # prototypes manifest
    ├── README.md                   # human-facing pointer
    ├── index.html                  # wayfinding UI
    ├── _template.html              # canonical starting point
    ├── diagrams/                   # .drawio sources + svg/png exports
    │   └── README.md
    ├── _examples/
    │   └── example-dashboard.html
    └── shared/
        ├── styles.css              # design system source
        ├── ui.js                   # interactive primitives
        ├── chat.js                 # chat helpers
        ├── proto-switcher.js       # persistent Cmd+K switcher (auto-injected)
        ├── mermaid.js              # opt-in inline diagram loader (secondary)
        └── patterns/
            ├── chat.html
            └── sidebar-layout.html
```

## Read order for common tasks

| Task | Read in order |
|---|---|
| Synthesise notes | `notes/AGENTS.md` → `notes/SCHEMA.md` → `notes/INDEX.md` → frontmatter of candidates → bodies |
| Add a prototype | `prototypes/AGENTS.md` → `prototypes/SYSTEM.md` → `prototypes/_template.html` → relevant `shared/patterns/*` |
| Audit design system | `prototypes/SYSTEM.md` → `shared/styles.css` → run `check.sh` |
| Make a decision note | `notes/SCHEMA.md` (Decision notes section) → `_template.md` |
| Diagram something | `CONVENTIONS.md` (Diagrams section). Default: draw.io with source + svg export in `diagrams/`. Mermaid for AI-generated inline. |

## Conventions at a glance

- Vanilla HTML/CSS/JS, no build step.
- Single shared CSS file (`prototypes/shared/styles.css`). No inline styles.
- One `.html` file per prototype.
- Markdown notes with YAML frontmatter.
- Stable section headers across all notes.
- Inline tag conventions: `[#decision]`, `[#claim]`, `[#question]`, `[#blocker]`, `[#todo]`.
- Stable claim IDs: `[claim:topic-NNN]`.
- Diagrams: draw.io as primary (source + svg export in `diagrams/`); Mermaid for inline AI-generated.
- Filenames: kebab-case.

For full conventions, see `CONVENTIONS.md`.
