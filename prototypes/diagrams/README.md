# prototypes/diagrams

Source files for diagrams referenced from prototypes in this folder.

## Convention

For each diagram, save two files here:

- `<name>.drawio` — the editable source (open in draw.io desktop or web app)
- `<name>.svg` (preferred) or `<name>.png` — the export, embedded in prototypes

Embed in a prototype like:

```html
<img src="diagrams/<name>.svg" alt="Diagram caption">
```

When you change the source, re-export to overwrite the embedded file.

## Mermaid alternative

For inline-rendered diagrams loaded at runtime (no separate image file), include `../shared/mermaid.js` in your prototype and use `<pre class="mermaid">…</pre>` blocks. See `../SYSTEM.md` → Diagrams.
