# Note + Prototype Template

A clonable git template for AI-supported note-taking and low-fi design prototyping. Optimised for low token usage and fast agent iteration.

## What this is

Two folders, one shared design system, and a layered docs layer that makes both folders cheap for AI agents to read, edit, and synthesise across.

- **`notes/`** — Markdown notes with structured frontmatter. Designed for progressive-disclosure agent reads (index → frontmatter → body) so synthesis is cheap.
- **`prototypes/`** — Vanilla HTML prototypes sharing one CSS file. No build step, no dependencies. Each prototype is a single file you can double-click open.
- **`.claude/skills/`** — A bundled `note-synthesise` skill that triggers automatically when you ask to synthesise notes.
- **Reference docs** at root and in each folder so agents orient cheaply: `MAP.md`, `AGENTS.md`, `SCHEMA.md`, `SYSTEM.md`, `PROCESSES.md`, `CONVENTIONS.md`, `SKILLS.md`.

## Cloning for a new project

```bash
git clone <this-template-url> my-project
cd my-project
rm -rf notes/_examples prototypes/_examples
# Edit README.md, replace this section with your project's name + purpose
git remote remove origin
git remote add origin <your-new-repo-url>
git push -u origin main
```

After cloning, read `MAP.md` for the architecture, then `notes/AGENTS.md` and `prototypes/AGENTS.md` for folder-specific rules.

## Daily use

- **Write a note:** copy `notes/_template.md` to `notes/<topic>-YYYY-MM-DD.md`, fill the frontmatter, write.
- **Add a prototype:** copy `prototypes/_template.html` to `prototypes/<descriptive-name>.html`, build inside `<main>` using classes from `prototypes/SYSTEM.md`. Add a row to `prototypes/prototypes.md` and a card to `prototypes/index.html`.
- **Synthesise notes:** ask Claude "synthesise my notes about X." The bundled skill handles the rest.
- **Check for drift:** `./check.sh` from repo root.

## Keeping the template up to date

If you improve the template upstream, you can pull changes back into projects that were cloned from it:

```bash
git remote add template <template-repo-url>
git fetch template
git merge template/main --allow-unrelated-histories
# resolve conflicts; project content takes precedence over scaffolding
```

## File layout

See `MAP.md` for the full architecture map and read order conventions. At a glance:

```
.
├── README.md MAP.md AGENTS.md PROCESSES.md CONVENTIONS.md SKILLS.md
├── check.sh .gitignore .agentignore
├── .claude/skills/note-synthesise/    # bundled skill
├── notes/         AGENTS.md SCHEMA.md INDEX.md _template.md _examples/
└── prototypes/    AGENTS.md SYSTEM.md prototypes.md _template.html
                   index.html _examples/
                   shared/ styles.css ui.js chat.js mermaid.js
                          patterns/chat.html patterns/sidebar-layout.html
```

## Design principles

- **Vanilla, no build step.** Every prototype is a single .html file. Every note is markdown. No package managers, no compilers, no servers.
- **One source of truth per concern.** Design system in one CSS file. Notes vocabulary in one schema. Don't fragment.
- **Progressive disclosure.** Indexes and frontmatter exist so agents can filter before reading bodies. The structure is what makes synthesis cheap.
- **Conventions over configuration.** Stable section headers, kebab-case filenames, fixed inline tag set. Small surface, less to remember.
- **Document for agents.** AGENTS.md, SCHEMA.md, SYSTEM.md exist to bank decisions about how the template works so each session doesn't re-derive them.

## Customising

These conventions are defaults, not laws. When you change a convention, update the relevant reference doc (`SCHEMA.md`, `SYSTEM.md`, `CONVENTIONS.md`) so agents stay in sync. Run `./check.sh` to detect drift.

The most likely customisations:

- Edit colour and spacing tokens in `prototypes/shared/styles.css` `:root`.
- Add or rename inline tags in `notes/SCHEMA.md` (and the inline-tags table).
- Add custom skills in `.claude/skills/<name>/SKILL.md`.
- Add domain-specific frontmatter fields in `SCHEMA.md` and the `_template.md` defaults.

## License

Add your own. This template ships without one.
