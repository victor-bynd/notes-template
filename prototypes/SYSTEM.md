# Design system reference

Authoritative vocabulary for the prototype design system. AI agents read this to know what's available before adding to `shared/styles.css` or building a prototype. If a class isn't listed here, it doesn't exist.

Edit this file in lockstep with `shared/styles.css`. `check.sh` will warn on drift.

## Tokens

Defined as CSS variables in `shared/styles.css` `:root`. Reference them; do not hardcode values.

| Token group | Variables |
|---|---|
| Colour (greyscale) | `--c-bg`, `--c-surface`, `--c-line`, `--c-line-2`, `--c-ink`, `--c-ink-2`, `--c-muted` |
| Colour (accent) | `--c-accent`, `--c-accent-2` (use sparingly — single accent is the rule) |
| Colour (status) | `--c-ok`, `--c-warn` |
| Type | `--f-sans`, `--f-mono`, `--t-xs`, `--t-sm`, `--t-md`, `--t-lg`, `--t-xl`, `--t-2xl` |
| Spacing | `--s-1` (4px) through `--s-8` (64px) — multiples of 4 |
| Radius | `--r-sm` (4px), `--r-md` (8px), `--r-lg` (12px) |
| Depth | `--shadow` |

## Layout primitives

| Class | Purpose |
|---|---|
| `.container` | Centred max-width 960px wrapper |
| `.container-wide` | Centred max-width 1200px wrapper |
| `.stack`, `.stack-sm`, `.stack-lg` | Vertical rhythm via top-margin on adjacent siblings |
| `.row`, `.row-between`, `.row-wrap` | Horizontal flex layouts |
| `.grid`, `.grid-2`, `.grid-3`, `.grid-auto` | CSS grid layouts |

**Composition rule:** wrap all page content in `.container`. Use `.stack` for vertical rhythm. Avoid bespoke margins.

## Shell components

Used by every prototype to provide the standard chrome.

| Class | Purpose |
|---|---|
| `.shell` | Outer wrapper, full-height flex column |
| `.shell-header` | Top bar with brand + nav |
| `.shell-main` | Page content area |
| `.shell-footer` | Footer strip |
| `.brand` | Logo / title in header. Renders with a coloured prefix glyph. |
| `.nav` | Horizontal nav links |

## Typography

| Class | Purpose |
|---|---|
| `h1`–`h4` | Standard headings (no class needed) |
| `.lead` | Larger intro paragraph |
| `.muted` | De-emphasised text |
| `.mono` | Monospace inline |
| `.eyebrow` | Small uppercase label (above h1, etc.) |

## Components

| Class | Purpose | Variants |
|---|---|---|
| `.card` | Bordered surface for content | `.card-link` (clickable), `.card-title` |
| `.btn` | Primary button | `.btn-secondary`, `.btn-accent` |
| `.badge` | Status/tag pill | `.badge-ok`, `.badge-warn`, `.badge-accent` |
| `.input`, `.textarea`, `.select`, `.label` | Form controls | — |
| `.list`, `.list-item` | Bordered list with dividers | — |
| `.table` | Data table | — |
| `.avatar` | 32px circular avatar | — |
| `.kbd` | Keyboard key chip | — |
| `.code` | Inline code | `.code-block` (block) |
| `.banner` | Inline notice with left border | `.banner-warn`, `.banner-ok`, `.banner-accent` |
| `.empty` | Empty state placeholder | — |
| `.switch`, `.switch-track` | Toggle switch | — |
| `.sketch`, `.sketch-label` | Dashed sketch panel (low-fi placeholder) | — |
| `.hr` | Visual divider (instead of `<hr>` styling) | — |

## Interactive components

These pair with `shared/ui.js`. Native HTML primitives are preferred where possible.

| Class / element | Use | Hook |
|---|---|---|
| `<dialog>` + `.dialog`, `.dialog-header`, `.dialog-body`, `.dialog-footer`, `.dialog-close` | Modal dialog | Native `.showModal()` or `data-action="open-dialog"` |
| `.sidebar`, `.sidebar-overlay` | Slide-in side panel | `data-action="open-sidebar"`, `"close-sidebar"`, `"toggle-sidebar"` |
| `.tabs`, `.tab`, `.tab-panel` (+ `data-tabs`, `data-target`) | Tabbed sections | `data-action="activate-tab"` |
| `.toast`, `.toast-container` | Transient notification | `UI.toast(msg)` or `data-action="toast"` |

## Chat pattern (composable)

Pieces used together to build a chat UI. See `shared/patterns/chat.html` for canonical assembly. Behaviour helpers in `shared/chat.js`.

| Class | Role |
|---|---|
| `.chat` | Outer container |
| `.chat-thread` | Scrollable message list |
| `.chat-message`, `.chat-message--user`, `.chat-message--ai` | Message bubble + role variants |
| `.chat-message-meta` | Timestamp / role label below bubble |
| `.chat-typing` | Three-dot typing indicator |
| `.chat-input` | Input row with textarea + send button |

## Sidebar layout (composable)

For dashboard-style prototypes with a persistent left nav.

| Class | Role |
|---|---|
| `.app-shell` | Grid: 240px nav + main |
| `.app-shell-nav` | Persistent left navigation |
| `.app-shell-main` | Main content area |

See `shared/patterns/sidebar-layout.html` for canonical assembly (persistent vs. slide-in variants).

## Data attribute hooks (ui.js)

| Attribute | Effect |
|---|---|
| `data-action="open-sidebar"` (+ `data-target=...`) | Open named sidebar |
| `data-action="close-sidebar"` | Close named sidebar |
| `data-action="toggle-sidebar"` | Toggle named sidebar |
| `data-action="open-dialog"` (+ `data-target=...`) | Open `<dialog>` element |
| `data-action="close-dialog"` (+ optional `data-target=...`) | Close dialog |
| `data-action="activate-tab"` (on `.tab`) | Switch tab in `[data-tabs]` group |
| `data-action="copy"` (+ `data-value=...`) | Copy text to clipboard, toast confirms |
| `data-action="toast"` (+ `data-message=...`) | Show a toast |

`Esc` closes any open sidebar. Click on `.sidebar-overlay` closes the sidebar.

## Programmatic API

Available as `window.UI`:

- `UI.toast(msg, opts?)`
- `UI.openSidebar(selector?)`, `UI.closeSidebar(selector?)`, `UI.toggleSidebar(selector?)`
- `UI.openDialog(selector)`, `UI.closeDialog(selector?)`
- `UI.copy(text)`

Available as `window.Chat` (load `shared/chat.js`):

- `Chat.append(thread, role, content, meta?)` — add a message
- `Chat.stream(messageEl, thread)` — returns a chunk-pusher for streaming text
- `Chat.showTyping(thread)` / `Chat.hideTyping(el)` — typing indicator
- `Chat.bindAutoGrow(textarea)` — auto-resize
- `Chat.bindEnterSubmit(textarea, onSubmit)` — Enter sends, Shift+Enter newline

## Diagrams

Two supported workflows. Full conventions in `../CONVENTIONS.md`.

### draw.io (primary, for human-drawn)

Save source as `prototypes/diagrams/<name>.drawio`. Export as `.svg` (preferred) or `.png`. Embed in the prototype:

```html
<img src="diagrams/<name>.svg" alt="Caption">
```

Re-export from draw.io after editing the source.

### Mermaid (secondary, for AI-generated inline)

Load `shared/mermaid.js` only in prototypes that need inline-rendered diagrams.

```html
<!-- include the loader once, near </body> -->
<script type="module" src="shared/mermaid.js"></script>

<!-- diagrams as: -->
<pre class="mermaid">
flowchart LR
  A --> B
</pre>
```

## Composition rules

1. **Single accent.** `--c-accent` appears once or twice per prototype, max. Overuse breaks the low-fi feel.
2. **Tokens over hardcoded values.** Never `#fafaf9` — always `var(--c-bg)`.
3. **Components over inline styles.** If you need a one-off, ask if a class would help — if yes, add it here and to `styles.css`.
4. **Native HTML over JS.** Use `<dialog>`, `<details>`, `<summary>`, semantic form elements before reaching for ui.js.
5. **Opt-in JS.** Only include `chat.js` in prototypes that use chat. `ui.js` is small enough to include everywhere.

## Adding a new component

1. Add the CSS to `shared/styles.css` with a one-line comment.
2. Add a row to the relevant table in this file.
3. Add a usage example to `shared/patterns/<name>.html` if the assembly is non-trivial.
4. If interactive, add an entry to the `data-action` table and wire it in `shared/ui.js`.
5. Run `check.sh`.
