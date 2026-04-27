# notes/diagrams

Source files for diagrams referenced from notes in this folder.

## Convention

For each diagram, save two files here:

- `<name>.drawio` — the editable source (open in draw.io desktop or web app)
- `<name>.svg` (preferred) or `<name>.png` — the export, embedded in notes

Embed in a note like:

```markdown
![Diagram caption](diagrams/<name>.svg)
```

When you change the source, re-export to overwrite the embedded file.

## Why both files

The `.drawio` source is what you edit. The `.svg` / `.png` export is what renders in markdown viewers (which can't render `.drawio` directly). Keeping both in git means anyone can pull the repo, view the rendered diagram, and edit the source.

## Mermaid alternative

For diagrams an agent generates inline (no separate image file), use a fenced ` ```mermaid ` block directly in the note. See `../SCHEMA.md` → Diagrams.
