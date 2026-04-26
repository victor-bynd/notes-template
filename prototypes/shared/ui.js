/* ============================================================
   ui.js — shared interactive primitives for prototypes.
   Vanilla JS, no dependencies. Hook everything via data-action.
   ============================================================ */

(function () {
  'use strict';

  // ---------- Toast queue ----------
  function ensureToastContainer() {
    let c = document.querySelector('.toast-container');
    if (!c) {
      c = document.createElement('div');
      c.className = 'toast-container';
      document.body.appendChild(c);
    }
    return c;
  }
  function toast(msg, opts) {
    opts = opts || {};
    const c = ensureToastContainer();
    const t = document.createElement('div');
    t.className = 'toast';
    t.textContent = msg;
    c.appendChild(t);
    setTimeout(() => t.remove(), opts.duration || 3000);
  }

  // ---------- Sidebar ----------
  function openSidebar(selector) {
    const s = document.querySelector(selector || '.sidebar');
    if (!s) return;
    s.dataset.state = 'open';
    document.body.dataset.sidebar = 'open';
  }
  function closeSidebar(selector) {
    const s = document.querySelector(selector || '.sidebar');
    if (!s) return;
    s.dataset.state = 'closed';
    delete document.body.dataset.sidebar;
  }
  function toggleSidebar(selector) {
    const s = document.querySelector(selector || '.sidebar');
    if (!s) return;
    (s.dataset.state === 'open' ? closeSidebar : openSidebar)(selector);
  }

  // ---------- Dialog ----------
  function openDialog(selector) {
    const d = document.querySelector(selector);
    if (d && d.showModal) d.showModal();
  }
  function closeDialog(selector) {
    const d = selector ? document.querySelector(selector) : document.querySelector('dialog[open]');
    if (d && d.close) d.close();
  }

  // ---------- Tabs ----------
  function activateTab(tab) {
    const group = tab.closest('[data-tabs]');
    if (!group) return;
    const target = tab.dataset.target;
    group.querySelectorAll('.tab').forEach(t => t.setAttribute('aria-selected', t === tab ? 'true' : 'false'));
    group.querySelectorAll('.tab-panel').forEach(p => {
      p.hidden = p.id !== target;
    });
  }

  // ---------- Copy to clipboard ----------
  function copy(text) {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(text).then(() => toast('Copied'));
    } else {
      const ta = document.createElement('textarea');
      ta.value = text;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      ta.remove();
      toast('Copied');
    }
  }

  // ---------- Global event delegation ----------
  document.addEventListener('click', (e) => {
    const el = e.target.closest('[data-action]');
    if (!el) return;
    const action = el.dataset.action;
    const target = el.dataset.target;

    switch (action) {
      case 'open-sidebar':   openSidebar(target);   break;
      case 'close-sidebar':  closeSidebar(target);  break;
      case 'toggle-sidebar': toggleSidebar(target); break;
      case 'open-dialog':    openDialog(target);    break;
      case 'close-dialog':   closeDialog(target);   break;
      case 'activate-tab':   activateTab(el);       break;
      case 'copy':           copy(el.dataset.value || el.textContent); break;
      case 'toast':          toast(el.dataset.message || 'Hello'); break;
    }
  });

  // Esc closes sidebar + open dialog
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (document.body.dataset.sidebar === 'open') closeSidebar();
    }
  });

  // Click outside sidebar closes it
  document.addEventListener('click', (e) => {
    if (e.target.classList.contains('sidebar-overlay')) closeSidebar();
  });

  // ---------- Public API (window.UI) ----------
  window.UI = { toast, openSidebar, closeSidebar, toggleSidebar, openDialog, closeDialog, copy };
})();
