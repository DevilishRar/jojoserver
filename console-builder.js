
(async function jojoBuilder() {
  const LOG = [];
  function log(msg) { console.log('%c[JoJo Builder] ' + msg, 'color: #9B59B6;'); LOG.push(msg); }
  function err(msg) { console.error('%c[JoJo Builder] ' + msg, 'color: #E74C3C;'); }

  console.clear();
  console.log('%c╔══════════════════════════════════════╗', 'color: #9B59B6; font-weight: bold;');
  console.log('%c║   🌹 JOJO SERVER BUILDER             ║', 'color: #9B59B6; font-weight: bold;');
  console.log('%c╚══════════════════════════════════════╝', 'color: #9B59B6; font-weight: bold;');

  const guildId = prompt('Enter Server ID:', '1539404742055166045');
  if (!guildId) { err('No server ID entered. Aborting.'); return; }

  log('Building JoJo server... This may take 15-30 seconds.');

  try {
    const resp = await fetch('https://architect-henna-eta.vercel.app/api/jojo-builder', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ guild_id: guildId, secret: 'jojo-build-2026' })
    });

    const data = await resp.json();

    if (!resp.ok || data.error) {
      err('Build failed: ' + (data.error || resp.status));
      if (data.log) data.log.forEach(l => err('  ' + l));
      return;
    }

    if (data.log) data.log.forEach(l => log(l));

    log('');
    log('═══════════════════════════════════════');
    log('RESULTS:');
    log('═══════════════════════════════════════');

    if (data.roles) {
      log('Roles created: ' + Object.keys(data.roles).length);
      Object.entries(data.roles).forEach(([name, id]) => log('  ' + name + ': ' + id));
    }

    if (data.channels) {
      log('Channels created: ' + Object.keys(data.channels).length);
      Object.entries(data.channels).forEach(([name, id]) => log('  ' + name + ': ' + id));
    }

    if (data.env) {
      log('');
      log('═══════════════════════════════════════');
      log('.env output:');
      log('═══════════════════════════════════════');
      console.log(data.env);

      // Try clipboard API first
      let copied = false;
      try { await navigator.clipboard.writeText(data.env); copied = true; } catch {}
      // Fallback: execCommand copy via hidden textarea
      if (!copied) {
        try {
          const ta = document.createElement('textarea');
          ta.value = data.env;
          ta.style.cssText = 'position:fixed;top:50%;left:50%;transform:translate(-50%,-50%);width:80vw;height:60vh;z-index:999999;font-family:monospace;font-size:12px;background:#1a1a2e;color:#e0e0e0;border:2px solid #9b59b6;padding:16px;border-radius:8px;';
          ta.readOnly = false;
          document.body.appendChild(ta);
          ta.select();
          document.execCommand('copy');
          document.body.removeChild(ta);
          copied = true;
        } catch {}
      }
      if (copied) {
        log('✓ Copied to clipboard!');
      } else {
        log('⚠ Clipboard blocked — paste from console output above');
      }

      // Also show overlay with copy button
      try {
        const overlay = document.createElement('div');
        overlay.style.cssText = 'position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:999998;background:rgba(0,0,0,0.85);display:flex;align-items:center;justify-content:center;';
        const box = document.createElement('div');
        box.style.cssText = 'background:#1a1a2e;border:2px solid #9b59b6;border-radius:12px;padding:20px;max-width:90vw;max-height:90vh;display:flex;flex-direction:column;gap:12px;';
        const title = document.createElement('div');
        title.style.cssText = 'color:#9b59b6;font-family:monospace;font-size:14px;font-weight:bold;';
        title.textContent = '📋 .env — Click to select all, then Ctrl+C';
        const pre = document.createElement('pre');
        pre.style.cssText = 'color:#e0e0e0;font-family:monospace;font-size:11px;white-space:pre-wrap;max-height:60vh;overflow:auto;padding:12px;background:#0d0d1a;border-radius:6px;margin:0;cursor:pointer;';
        pre.textContent = data.env;
        pre.onclick = () => { const r = document.createRange(); r.selectNodeContents(pre); const s = window.getSelection(); s.removeAllRanges(); s.addRange(r); };
        const closeBtn = document.createElement('button');
        closeBtn.textContent = '✕ Close';
        closeBtn.style.cssText = 'background:#9b59b6;color:white;border:none;padding:8px 16px;border-radius:6px;cursor:pointer;font-family:monospace;font-size:13px;';
        closeBtn.onclick = () => overlay.remove();
        box.append(title, pre, closeBtn);
        overlay.appendChild(box);
        overlay.onclick = (e) => { if (e.target === overlay) overlay.remove(); };
        document.body.appendChild(overlay);
        log('📋 Opened overlay — click text to select, Ctrl+C to copy');
      } catch {}
    }

    log('');
    log('Next step: Run jojo-send.js to populate channels with embeds!');

  } catch (e) {
    err('Build failed: ' + e.message);
  }
})();
