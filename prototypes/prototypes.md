# Prototypes manifest

Machine-readable index of every prototype. Agents read this to orient before touching any prototype file. One entry per prototype, most recent first.

Entries in `_examples/` are reference content and are **not** listed here — they're deletable as a unit when initialising a project.

## Schema

Each entry uses these fields:

- `file` — Filename relative to `prototypes/`.
- `title` — Short human label.
- `status` — `template` | `draft` | `active` | `archived`.
- `purpose` — One sentence on what this prototype is exploring.
- `components` — Comma-separated list of shared CSS classes / hooks used. Helps agents understand what's already in play.
- `notes` — Optional. Filenames in `notes/` that informed this prototype.

## Entries

### _template.html
- file: `_template.html`
- title: Prototype boilerplate
- status: template
- purpose: Canonical starting point for new prototypes. Header, main, footer, and shared CSS already wired.
- components: shell, container, stack, eyebrow, sketch, badge
- notes: —

_No prototypes yet. Copy `_template.html` to start._
