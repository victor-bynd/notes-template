/* ============================================================
   mermaid.js — opt-in Mermaid loader for prototypes that need diagrams.
   Include via: <script type="module" src="shared/mermaid.js"></script>
   Then write diagrams as: <pre class="mermaid">…</pre>
   ============================================================ */

import mermaid from 'https://cdn.jsdelivr.net/npm/mermaid@10/dist/mermaid.esm.min.mjs';

mermaid.initialize({
  startOnLoad: true,
  theme: 'base',
  themeVariables: {
    fontFamily: 'ui-sans-serif, system-ui, sans-serif',
    fontSize: '14px',
    primaryColor: '#fafaf9',
    primaryTextColor: '#1a1a19',
    primaryBorderColor: '#cfcfcc',
    lineColor: '#8a8a86',
    secondaryColor: '#f5e8e4',
    tertiaryColor: '#ffffff',
  },
  flowchart: { curve: 'basis' },
});
