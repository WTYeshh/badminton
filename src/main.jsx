import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import './index.css'

// ─────────────────────────────────────────────────────────────────
// Website Security Layer
// Prevents: right-click, copy/cut, drag, keyboard inspect shortcuts,
// and DevTools detection. These protections apply globally on the
// public-facing site. Admin input fields remain fully functional.
// ─────────────────────────────────────────────────────────────────

;(function initSecurity() {
  // 1. Block right-click context menu
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault()
    e.stopPropagation()
    return false
  }, true)

  // 2. Block copy, cut, and paste on non-input elements
  document.addEventListener('copy', (e) => {
    const tag = (e.target?.tagName || '').toLowerCase()
    if (tag !== 'input' && tag !== 'textarea') {
      e.preventDefault()
      e.stopPropagation()
    }
  }, true)

  document.addEventListener('cut', (e) => {
    const tag = (e.target?.tagName || '').toLowerCase()
    if (tag !== 'input' && tag !== 'textarea') {
      e.preventDefault()
      e.stopPropagation()
    }
  }, true)

  // 3. Block drag-to-select
  document.addEventListener('dragstart', (e) => {
    const tag = (e.target?.tagName || '').toLowerCase()
    if (tag !== 'a' && tag !== 'input') {
      e.preventDefault()
    }
  }, true)

  // 4. Block keyboard shortcuts for DevTools & view source
  document.addEventListener('keydown', (e) => {
    const ctrl  = e.ctrlKey  || e.metaKey
    const shift = e.shiftKey
    const key   = e.key.toLowerCase()

    // Ctrl+Shift+I / Cmd+Opt+I — DevTools Elements
    if (ctrl && shift && key === 'i') { e.preventDefault(); return }
    // Ctrl+Shift+J / Cmd+Opt+J — DevTools Console
    if (ctrl && shift && key === 'j') { e.preventDefault(); return }
    // Ctrl+Shift+C — DevTools element picker
    if (ctrl && shift && key === 'c') { e.preventDefault(); return }
    // Ctrl+U — View Source
    if (ctrl && key === 'u') { e.preventDefault(); return }
    // Ctrl+S — Save page
    if (ctrl && key === 's') { e.preventDefault(); return }
    // Ctrl+A — Select all (on non-inputs)
    if (ctrl && key === 'a') {
      const tag = (document.activeElement?.tagName || '').toLowerCase()
      if (tag !== 'input' && tag !== 'textarea') {
        e.preventDefault(); return
      }
    }
    // F12
    if (e.key === 'F12') { e.preventDefault(); return }
  }, true)

  // 5. DevTools detection via size probe
  // When DevTools is opened, the window inner dimensions shrink noticeably.
  const THRESHOLD = 160
  let warningShown = false

  function checkDevTools() {
    const widthDiff  = window.outerWidth  - window.innerWidth
    const heightDiff = window.outerHeight - window.innerHeight
    const open = widthDiff > THRESHOLD || heightDiff > THRESHOLD

    const el = document.getElementById('devtools-warning')
    if (!el) return

    if (open && !warningShown) {
      warningShown = true
      el.classList.add('visible')
    } else if (!open && warningShown) {
      warningShown = false
      el.classList.remove('visible')
    }
  }

  // Poll for DevTools every 500ms
  setInterval(checkDevTools, 500)
  window.addEventListener('resize', checkDevTools)
})()

// ── DevTools warning overlay — injected before React mounts ──
const warningEl = document.createElement('div')
warningEl.id = 'devtools-warning'
warningEl.innerHTML = `
  <svg width="48" height="48" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="64" height="64" rx="14" fill="#111111"/>
    <circle cx="32" cy="40" r="9" fill="none" stroke="#72F27C" stroke-width="2.5"/>
    <line x1="32" y1="31" x2="32" y2="14" stroke="#72F27C" stroke-width="2.5" stroke-linecap="round"/>
    <ellipse cx="32" cy="13" rx="6" ry="3.5" fill="none" stroke="#72F27C" stroke-width="2" stroke-dasharray="3 2"/>
    <line x1="26.5" y1="16" x2="32" y2="31" stroke="#72F27C" stroke-width="1.5" stroke-linecap="round"/>
    <line x1="37.5" y1="16" x2="32" y2="31" stroke="#72F27C" stroke-width="1.5" stroke-linecap="round"/>
  </svg>
  <p style="font-size:18px;font-weight:700;color:#F5F5F5;margin-top:8px;">Access Restricted</p>
  <p style="font-size:13px;color:#888;max-width:300px;text-align:center;line-height:1.6;">
    Developer tools are not permitted on this website.<br>
    Please close DevTools to continue.
  </p>
`
document.body.appendChild(warningEl)

// ── React mount ──
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
)
