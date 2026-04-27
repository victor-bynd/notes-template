/* ============================================================
   proto-switcher.js — persistent command-palette switcher.
   Include in every prototype: <script src="shared/proto-switcher.js" defer></script>
   Activate with: ⌘K / Ctrl+K, or click the corner button.
   Maintain the PROTOTYPES list below alongside prototypes.md (check.sh validates).
   ============================================================ */

// ---- Prototype list (source of truth for the switcher) ----
// Keep in sync with prototypes/prototypes.md.
// Path is relative to the prototypes/ folder (e.g. "chat-with-tools.html",
// "_examples/example-dashboard.html").
window.PROTOTYPES = [
  {
    file: '_examples/example-dashboard.html',
    title: 'Example dashboard',
    status: 'example',
    purpose: 'Worked example using tabs, cards, lists, banner, dialog, toast, table, mermaid.',
  },
  // Add new prototypes here. Order: most recent first.
];

(function () {
  'use strict';

  // Detect path depth so links work from prototypes/ root and prototypes/_examples/
  function pathPrefix() {
    const p = window.location.pathname;
    // If we're inside _examples/, links to other prototypes need to go up one level
    return p.includes('/_examples/') ? '../' : '';
  }

  // ---------- DOM injection ----------
  function buildUI() {
    if (document.getElementById('proto-switcher-button')) return;

    const button = document.createElement('button');
    button.id = 'proto-switcher-button';
    button.className = 'proto-switcher-button';
    button.setAttribute('aria-label', 'Switch prototype (Cmd+K)');
    button.title = 'Switch prototype (⌘K)';
    button.innerHTML = '<span>⌘K</span>';

    const modal = document.createElement('div');
    modal.id = 'proto-switcher-modal';
    modal.className = 'proto-switcher-modal';
    modal.hidden = true;
    modal.innerHTML = `
      <div class="proto-switcher-card" role="dialog" aria-label="Switch prototype">
        <input
          id="proto-switcher-search"
          class="proto-switcher-search"
          type="text"
          placeholder="Switch prototype…  (↑↓ to navigate, Enter to open, Esc to close)"
          autocomplete="off"
          spellcheck="false">
        <ul id="proto-switcher-list" class="proto-switcher-list" role="listbox"></ul>
        <div class="proto-switcher-footer">
          <span><kbd class="kbd">⌘K</kbd> open · <kbd class="kbd">↑↓</kbd> navigate · <kbd class="kbd">Enter</kbd> load · <kbd class="kbd">Esc</kbd> close</span>
        </div>
      </div>
    `;

    document.body.appendChild(button);
    document.body.appendChild(modal);
  }

  // ---------- State ----------
  let isOpen = false;
  let filtered = [];
  let activeIndex = 0;

  function open() {
    if (isOpen) return;
    isOpen = true;
    const m = document.getElementById('proto-switcher-modal');
    const s = document.getElementById('proto-switcher-search');
    m.hidden = false;
    s.value = '';
    activeIndex = 0;
    renderList('');
    setTimeout(() => s.focus(), 0);
  }

  function close() {
    isOpen = false;
    const m = document.getElementById('proto-switcher-modal');
    if (m) m.hidden = true;
  }

  // ---------- Rendering ----------
  function renderList(query) {
    const list = document.getElementById('proto-switcher-list');
    const q = query.toLowerCase().trim();
    filtered = (window.PROTOTYPES || []).filter(p => {
      if (!q) return true;
      return [p.file, p.title, p.status, p.purpose]
        .filter(Boolean)
        .some(s => s.toLowerCase().includes(q));
    });

    if (activeIndex >= filtered.length) activeIndex = 0;

    list.innerHTML = filtered.map((p, i) => `
      <li class="proto-switcher-item ${i === activeIndex ? 'is-active' : ''}"
          data-index="${i}"
          role="option"
          aria-selected="${i === activeIndex}">
        <div class="proto-switcher-item-main">
          <span class="proto-switcher-item-title">${escapeHTML(p.title || p.file)}</span>
          <span class="proto-switcher-item-purpose">${escapeHTML(p.purpose || '')}</span>
        </div>
        <div class="proto-switcher-item-meta">
          <span class="badge ${badgeClass(p.status)}">${escapeHTML(p.status || '')}</span>
          <span class="mono muted">${escapeHTML(p.file)}</span>
        </div>
      </li>
    `).join('') || `<li class="proto-switcher-empty">No prototypes match.</li>`;
  }

  function badgeClass(status) {
    return ({
      active: 'badge-ok',
      draft: 'badge-warn',
      example: 'badge-accent',
    })[status] || '';
  }

  function escapeHTML(s) {
    return String(s ?? '').replace(/[&<>"']/g, c => ({
      '&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'
    }[c]));
  }

  function loadActive() {
    const p = filtered[activeIndex];
    if (!p) return;
    window.location.href = pathPrefix() + p.file;
  }

  // ---------- Events ----------
  document.addEventListener('keydown', (e) => {
    // Cmd+K / Ctrl+K opens the switcher anywhere
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      isOpen ? close() : open();
      return;
    }
    if (!isOpen) return;
    if (e.key === 'Escape') { close(); return; }
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      activeIndex = Math.min(activeIndex + 1, filtered.length - 1);
      renderList(document.getElementById('proto-switcher-search').value);
      return;
    }
    if (e.key === 'ArrowUp') {
      e.preventDefault();
      activeIndex = Math.max(activeIndex - 1, 0);
      renderList(document.getElementById('proto-switcher-search').value);
      return;
    }
    if (e.key === 'Enter') {
      e.preventDefault();
      loadActive();
      return;
    }
  });

  // Build UI as soon as the body exists
  if (document.body) {
    buildUI();
  } else {
    document.addEventListener('DOMContentLoaded', buildUI);
  }

  // Delegated event handlers (work after async UI build)
  document.addEventListener('click', (e) => {
    if (e.target.closest('#proto-switcher-button')) {
      isOpen ? close() : open();
      return;
    }
    const item = e.target.closest('.proto-switcher-item');
    if (item) {
      activeIndex = parseInt(item.dataset.index, 10);
      loadActive();
      return;
    }
    // Click outside the card closes
    if (e.target.id === 'proto-switcher-modal') close();
  });

  document.addEventListener('input', (e) => {
    if (e.target.id === 'proto-switcher-search') {
      activeIndex = 0;
      renderList(e.target.value);
    }
  });

  // Hover updates active index
  document.addEventListener('mouseover', (e) => {
    const item = e.target.closest('.proto-switcher-item');
    if (item && isOpen) {
      activeIndex = parseInt(item.dataset.index, 10);
      const list = document.getElementById('proto-switcher-list');
      list.querySelectorAll('.proto-switcher-item').forEach((el, i) => {
        el.classList.toggle('is-active', i === activeIndex);
      });
    }
  });
})();
