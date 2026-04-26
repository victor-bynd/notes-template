/* ============================================================
   chat.js — chat-pattern helpers (auto-scroll, streaming, input grow).
   Opt-in per prototype: load only when needed.
   ============================================================ */

(function () {
  'use strict';

  function autoScroll(thread) {
    if (!thread) return;
    thread.scrollTop = thread.scrollHeight;
  }

  // Append a message to a chat thread.
  // role: 'user' | 'ai'. content: string. meta: optional string.
  function append(thread, role, content, meta) {
    if (!thread) return null;
    const m = document.createElement('div');
    m.className = 'chat-message chat-message--' + role;
    m.textContent = content;
    thread.appendChild(m);
    if (meta) {
      const mt = document.createElement('div');
      mt.className = 'chat-message-meta';
      mt.textContent = meta;
      thread.appendChild(mt);
    }
    autoScroll(thread);
    return m;
  }

  // Stream chunks into an existing message bubble.
  // Returns a function(chunk) you call repeatedly; pass null/undefined to finalise.
  function stream(messageEl, thread) {
    return function (chunk) {
      if (chunk == null) { autoScroll(thread); return; }
      messageEl.textContent += chunk;
      autoScroll(thread);
    };
  }

  // Show / hide typing indicator.
  function showTyping(thread) {
    if (!thread) return null;
    const t = document.createElement('div');
    t.className = 'chat-typing';
    t.innerHTML = '<span></span><span></span><span></span>';
    thread.appendChild(t);
    autoScroll(thread);
    return t;
  }
  function hideTyping(typingEl) {
    if (typingEl && typingEl.remove) typingEl.remove();
  }

  // Auto-grow textarea to fit content (max-height set in CSS).
  function bindAutoGrow(textarea) {
    if (!textarea) return;
    const grow = () => {
      textarea.style.height = 'auto';
      textarea.style.height = textarea.scrollHeight + 'px';
    };
    textarea.addEventListener('input', grow);
    grow();
  }

  // Bind Enter to submit (Shift+Enter for newline).
  function bindEnterSubmit(textarea, onSubmit) {
    if (!textarea) return;
    textarea.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && !e.shiftKey) {
        e.preventDefault();
        const value = textarea.value.trim();
        if (value) {
          onSubmit(value);
          textarea.value = '';
          textarea.style.height = 'auto';
        }
      }
    });
  }

  window.Chat = { autoScroll, append, stream, showTyping, hideTyping, bindAutoGrow, bindEnterSubmit };
})();
