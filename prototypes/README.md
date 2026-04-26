# Prototypes

Static HTML prototypes sharing one CSS design system. Optimised for low-token AI editing and zero build friction.

## Files

- `index.html` — Visual wayfinding UI. Open this in a browser.
- `prototypes.md` — Machine-readable manifest. Source of truth for AI agents.
- `_template.html` — Boilerplate for new prototypes.
- `shared/styles.css` — Design tokens + component classes. The only stylesheet.

## Workflow

1. Duplicate `_template.html` to a kebab-case filename (e.g. `kanban-board.html`).
2. Edit only the `<main>` content. Leave header, footer, and CSS link alone.
3. Use existing classes from `shared/styles.css`. If you genuinely need a new component, add it to the CSS file with a one-line comment and use the new class — do not inline styles.
4. Add a matching entry to `prototypes.md` and a card to `index.html`.

## Open the workspace

Open `index.html` in any browser. No server, no build, no dependencies.

## Asking agents to work on prototypes

Useful prompts:

- "Add a prototype called `pricing-table.html` that demonstrates a 3-tier pricing comparison using existing components."
- "List every prototype that uses the `.card` component and suggest where a `.card-compact` variant would help."
- "Audit `shared/styles.css` for unused classes."
- "Promote `example-prototype.html` from draft to active and update the manifest."
