// ==UserScript==
// @name         Sentinel Mobile — MAX FRED UI Lab
// @namespace    Sentinel
// @version      0.1.0-max-canned
// @description  Temporary canned-data MAX FRED presentation lab layered over proven RC10J shell
// @match        https://www.torn.com/*
// @grant        none
// ==/UserScript==

(function () {
  'use strict';

  const DRAWER_ID = 'fred-rc10j-drawer';
  const STYLE_ID = 'fred-max-ui-lab-style';

  function fmtLocal(d) {
    return new Intl.DateTimeFormat(undefined, {
      hour: 'numeric', minute: '2-digit', second: '2-digit'
    }).format(d);
  }

  function fmtTCT(d) {
    const h = String(d.getUTCHours()).padStart(2, '0');
    const m = String(d.getUTCMinutes()).padStart(2, '0');
    const s = String(d.getUTCSeconds()).padStart(2, '0');
    return `${h}:${m}:${s} TCT`;
  }

  function fmtDate(d, utc) {
    const opt = { weekday: 'short', month: 'short', day: 'numeric', year: 'numeric' };
    if (utc) opt.timeZone = 'UTC';
    return new Intl.DateTimeFormat(undefined, opt).format(d);
  }

  function install() {
    const drawer = document.getElementById(DRAWER_ID);
    if (!drawer) {
      setTimeout(install, 100);
      return;
    }

    document.getElementById(STYLE_ID)?.remove();
    const style = document.createElement('style');
    style.id = STYLE_ID;
    style.textContent = `
#${DRAWER_ID}{
  width:min(96vw,430px)!important;
  height:100dvh!important;
  max-height:100dvh!important;
  padding:10px 10px 12px!important;
  overflow:hidden!important;
  display:grid!important;
  grid-template-rows:auto auto minmax(0,1fr) auto auto!important;
  gap:8px!important;
  background:linear-gradient(180deg,#101419 0%,#080b0e 100%)!important;
  border-left:1px solid #48525d!important;
  border-bottom:1px solid #343c44!important;
  box-sizing:border-box!important;
}
#${DRAWER_ID} .close{z-index:30!important;right:8px!important;top:8px!important;}
#${DRAWER_ID} .max-brand{position:relative;padding:13px 44px 10px 10px;border:1px solid #37414a;background:linear-gradient(180deg,#242a30,#0b0e11);box-shadow:inset 0 0 0 1px #050607;text-align:center;}
#${DRAWER_ID} .max-word{font-family:Impact,'Arial Black',sans-serif;font-size:clamp(34px,9.5vw,50px);line-height:.96;letter-spacing:1px;color:#d1d1ce;text-shadow:0 2px 0 #050505,0 -1px 0 #fff;white-space:nowrap;}
#${DRAWER_ID} .max-motto{margin-top:5px;font-size:8px;letter-spacing:2px;font-weight:800;color:#7c848b;}
#${DRAWER_ID} .max-clocks{display:grid;grid-template-columns:1fr 1fr;gap:7px;}
#${DRAWER_ID} .max-clock{border:1px solid #333d46;background:#0a0d10;padding:7px 9px;min-width:0;}
#${DRAWER_ID} .max-label{font-size:9px;letter-spacing:.9px;color:#8c969f;font-weight:800;text-transform:uppercase;}
#${DRAWER_ID} .max-time{font-size:15px;color:#eef1f3;font-weight:800;margin-top:2px;white-space:nowrap;}
#${DRAWER_ID} .max-date{font-size:9px;color:#89929a;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
#${DRAWER_ID} .max-middle{min-height:0;display:flex;flex-direction:column;gap:6px;overflow:hidden;}
#${DRAWER_ID} .max-section-title{font-size:10px;letter-spacing:1.2px;color:#91a0ad;font-weight:900;padding:1px 2px;}
#${DRAWER_ID} .max-alert{position:relative;border:1px solid #333b41;background:#0c1013;padding:8px 9px 8px 12px;display:grid;grid-template-columns:20px 1fr auto;column-gap:7px;align-items:center;min-height:42px;box-sizing:border-box;}
#${DRAWER_ID} .max-alert::before{content:'';position:absolute;left:0;top:0;bottom:0;width:3px;background:var(--sev);}
#${DRAWER_ID} .max-icon{font-size:16px;text-align:center;color:var(--sev);font-weight:900;}
#${DRAWER_ID} .max-head{font-size:14px;font-weight:900;color:var(--sev);letter-spacing:.35px;line-height:1.05;}
#${DRAWER_ID} .max-sub{font-size:11px;color:#d2d8dc;margin-top:3px;line-height:1.12;}
#${DRAWER_ID} .max-side{font-size:11px;color:#9ba5ad;font-weight:800;text-align:right;white-space:nowrap;}
#${DRAWER_ID} .green{--sev:#48df8b}.yellow{--sev:#ffe23b}.red{--sev:#ff3030}.blue{--sev:#52a2ff}
#${DRAWER_ID} .max-next{border:1px solid #33404a;background:#0a0e12;padding:8px 10px;display:grid;grid-template-columns:1fr auto;gap:8px;align-items:end;}
#${DRAWER_ID} .max-next-name{font-size:16px;font-weight:900;color:#edf1f4;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
#${DRAWER_ID} .max-next-meta{font-size:10px;color:#aab3ba;margin-top:2px;}
#${DRAWER_ID} .max-count{font-size:20px;font-weight:900;color:#52a2ff;white-space:nowrap;}
#${DRAWER_ID} .max-today{border:1px solid #333c43;background:#090c0f;padding:7px 8px 8px;}
#${DRAWER_ID} .max-score{display:grid;grid-template-columns:.8fr .8fr .9fr 1.35fr;gap:5px;margin-top:5px;}
#${DRAWER_ID} .max-stat{min-width:0;}
#${DRAWER_ID} .max-stat-k{font-size:9px;color:#89939b;letter-spacing:.6px;font-weight:800;white-space:nowrap;}
#${DRAWER_ID} .max-stat-v{font-size:18px;font-weight:900;color:#e9edf0;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
#${DRAWER_ID} .pass{color:#48df8b}.fail{color:#ff3030}.money{color:#48df8b}.respect{color:#52a2ff}
#${DRAWER_ID} .max-detail{position:absolute;left:10px;right:10px;top:164px;bottom:10px;z-index:20;background:linear-gradient(180deg,#11161b,#080b0e);border:1px solid #48525d;box-shadow:0 8px 30px rgba(0,0,0,.72);padding:12px;display:none;overflow:hidden;box-sizing:border-box;}
#${DRAWER_ID} .max-detail.open{display:block;}
#${DRAWER_ID} .max-detail-h{font-size:11px;color:#ffe23b;font-weight:900;letter-spacing:1px;margin-bottom:8px;}
#${DRAWER_ID} .max-detail-title{font-size:20px;color:#ffe23b;font-weight:900;line-height:1.08;margin-bottom:12px;}
#${DRAWER_ID} .max-detail-grid{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
#${DRAWER_ID} .max-detail-cell{border:1px solid #303942;background:#090d10;padding:9px;}
#${DRAWER_ID} .max-detail-k{font-size:9px;color:#87919a;font-weight:900;letter-spacing:.7px;}
#${DRAWER_ID} .max-detail-v{font-size:14px;color:#eef1f3;font-weight:800;margin-top:3px;}
#${DRAWER_ID} .max-back{margin-top:12px;width:100%;height:38px;border:1px solid #47535e;background:#151b20;color:#d9e0e5;font-weight:900;font-size:13px;border-radius:4px;}
`;
    document.head.appendChild(style);

    drawer.innerHTML = `
      <button class="close" aria-label="Close Sentinel">×</button>
      <div class="max-brand">
        <div class="max-word">SENTINEL</div>
        <div class="max-motto">OBSERVE • REPORT • INFORM</div>
      </div>
      <div class="max-clocks">
        <div class="max-clock"><div class="max-label">Local time</div><div id="fred-max-local" class="max-time"></div><div id="fred-max-local-date" class="max-date"></div></div>
        <div class="max-clock"><div class="max-label">Torn time · TCT</div><div id="fred-max-tct" class="max-time"></div><div id="fred-max-tct-date" class="max-date"></div></div>
      </div>
      <div class="max-middle">
        <div class="max-section-title">CURRENT CONDITIONS · MAX CANNED LOAD</div>
        <div class="max-alert green"><div class="max-icon">●</div><div><div class="max-head">WATCHING</div><div class="max-sub">Blast from the Past · ready window healthy</div></div><div class="max-side">14h 45m</div></div>
        <div id="fred-max-caution" class="max-alert yellow"><div class="max-icon">▲</div><div><div class="max-head">CAUTIONARY</div><div class="max-sub">WRONG CONTINENT • UAE</div></div><div class="max-side">DETAILS ›</div></div>
        <div class="max-alert yellow"><div class="max-icon">!</div><div><div class="max-head">MISSING ITEM</div><div class="max-sub">Required OC item unavailable</div></div><div class="max-side">ACTION</div></div>
        <div class="max-alert red"><div class="max-icon">●</div><div><div class="max-head">DELAYED</div><div class="max-sub">CUTTING IT CLOSE ↘ SWITZERLAND</div></div><div class="max-side">+18m</div></div>
      </div>
      <div class="max-next">
        <div><div class="max-label">NEXT · RELEVANT OC</div><div class="max-next-name">Blast from the Past</div><div class="max-next-meta">Difficulty 7 · 6 participants</div></div>
        <div><div class="max-label" style="text-align:right">STARTS IN</div><div class="max-count">14:45:28</div></div>
      </div>
      <div class="max-today">
        <div class="max-section-title">TODAY · TCT</div>
        <div class="max-score">
          <div class="max-stat"><div class="max-stat-k">PASS</div><div class="max-stat-v pass">3</div></div>
          <div class="max-stat"><div class="max-stat-k">FAILED</div><div class="max-stat-v fail">1</div></div>
          <div class="max-stat"><div class="max-stat-k">RESPECT</div><div class="max-stat-v respect">596</div></div>
          <div class="max-stat"><div class="max-stat-k">EARNINGS</div><div class="max-stat-v money">$220.3M</div></div>
        </div>
      </div>
      <div id="fred-max-detail" class="max-detail">
        <div class="max-detail-h">CURRENT CONDITIONS · CAUTIONARY</div>
        <div class="max-detail-title">WRONG CONTINENT • UAE</div>
        <div class="max-detail-grid">
          <div class="max-detail-cell"><div class="max-detail-k">AFFECTS OC</div><div class="max-detail-v">Ace in the Hole</div></div>
          <div class="max-detail-cell"><div class="max-detail-k">READY IN</div><div class="max-detail-v">08:17:42</div></div>
          <div class="max-detail-cell"><div class="max-detail-k">STATUS</div><div class="max-detail-v">Abroad · UAE</div></div>
          <div class="max-detail-cell"><div class="max-detail-k">RETURN WINDOW</div><div class="max-detail-v">Unsafe</div></div>
        </div>
        <button id="fred-max-back" class="max-back">BACK TO SENTINEL</button>
      </div>
    `;

    const close = drawer.querySelector('.close');
    close?.addEventListener('click', (e) => {
      e.preventDefault();
      e.stopPropagation();
      drawer.classList.remove('open');
    });

    const detail = document.getElementById('fred-max-detail');
    document.getElementById('fred-max-caution')?.addEventListener('click', () => detail?.classList.add('open'));
    document.getElementById('fred-max-back')?.addEventListener('click', () => detail?.classList.remove('open'));

    function tick() {
      const now = new Date();
      const local = document.getElementById('fred-max-local');
      const tct = document.getElementById('fred-max-tct');
      const ld = document.getElementById('fred-max-local-date');
      const td = document.getElementById('fred-max-tct-date');
      if (local) local.textContent = fmtLocal(now);
      if (tct) tct.textContent = fmtTCT(now);
      if (ld) ld.textContent = fmtDate(now, false);
      if (td) td.textContent = fmtDate(now, true);
    }
    tick();
    setInterval(tick, 1000);
  }

  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', install, { once: true });
  else install();
})();
