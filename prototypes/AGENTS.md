# prototypes/ agent rules

Scoped instructions for AI agents working inside the `prototypes/` folder. Read this *and* `SYSTEM.md` before performing any prototype operation.

## Read order (progressive disclosure)

1. `SYSTEM.md` — full design system vocabulary (tokens, components, hooks, patterns).
2. `prototypes.md` — manifest of existing prototypes with status, purpose, and components used.
3. Individual prototype `.html` files — only when you need to read or edit a specific one.

You should rarely need to scan `shared/styles.css` directly — `SYSTEM.md` is its index.

## Hard rules

- Every prototype is a single `.html` file at the top level of `prototypes/`. No nested folders for prototypes.
- Every prototype links to `shared/styles.css` and nothing else as a stylesheet. No inline styles, no per-prototype CSS files.
- Filename convention: kebab-case, descriptive. Examples: `pricing-table.html`, `chat-with-tools.html`. Never spaces, never camelCase.
- When you create or rename a prototype: update `prototypes.md`, add a card to `index.html`, **and** add an entry to the `window.PROTOTYPES` array at the top of `shared/proto-switcher.js`. All in the same edit. `check.sh` validates the switcher list matches `prototypes.md`.
- When you add a new component class: add it to `shared/styles.css`, add a row to `SYSTEM.md`, and add a usage example to `shared/patterns/` if non-trivial. All in the same edit.
- Do not edit files inside `_examples/`. They're reference content, deletable as a unit.

## Boilerplate discipline

`_template.html` is the canonical starting point. When creating a new prototype:

1. Copy `_template.html`.
2. Edit only the `<main>` content. Leave header, footer, and shared CSS link alone.
3. If the prototype needs interactivity, add `<script src="shared/ui.js" defer></script>` before `</body>`.
4. If the prototype needs chat, also add `<script src="shared/chat.js" defer></script>`.
5. If the prototype needs diagrams, see SYSTEM.md → Diagrams section.

## Prefer native HTML

Before reaching for JS:

- Use `<dialog>` for modals (paired with `.dialog` styling).
- Use `<details>` and `<summary>` for collapsibles.
- Use semantic form elements (`<input type="...">`).
- Use `<form>` with native `submit` events.

ui.js is the layer for interactions native HTML doesn't cover. Don't reinvent what HTML already gives you.

## When extending the design system

The `extend, don't duplicate` rule is load-bearing. Concretely:

- If a prototype needs a one-off variant of an existing component (e.g. `.card-compact`), add the class to `shared/styles.css` rather than inlining the override.
- If a prototype needs a genuinely new component, add it. Update SYSTEM.md.
- If you find yourself copying chunks of CSS into a prototype, stop — promote the pattern to `styles.css`.

## When auditing

Common audit prompts:

- "List unused CSS classes." Compare class definitions in `shared/styles.css` to usages across all `.html` files.
- "List drift between SYSTEM.md and styles.css." Both files declare the vocabulary; they must match.
- "List prototypes whose entries in `prototypes.md` are out of sync with the file."

`check.sh` (at repo root) automates these.

## Diagrams

When generating a diagram inline at runtime, use Mermaid via `shared/mermaid.js`. When the user wants an editable diagram they'll maintain in draw.io, embed the exported `.svg` from `prototypes/diagrams/`: `<img src="diagrams/<name>.svg" alt="Caption">`. Do not write `.drawio` XML by hand.

`*.drawio` files are listed in `.agentignore` — read the exported `.svg` or `.png` instead.

## Related references

- `SYSTEM.md` — design system vocabulary
- `prototypes.md` — prototype manifest
- `shared/patterns/` — copy-paste reference markup for non-trivial assemblies
- `diagrams/README.md` — diagram folder convention
- `../AGENTS.md` — repo-wide agent rules
- `../PROCESSES.md` — named recipes for common tasks
- `../CONVENTIONS.md` — full diagram conventions
