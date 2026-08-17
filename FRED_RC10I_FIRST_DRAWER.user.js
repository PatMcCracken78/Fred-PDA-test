// ==UserScript==
// @name         Sentinel Mobile — FRED RC10I First Drawer
// @namespace    Sentinel
// @version      1.0.0-rc10i
// @description  RC10H real shield plus first branded Sentinel drawer soak test
// @match        https://www.torn.com/*
// @require      https://raw.githubusercontent.com/PatMcCracken78/Fred-PDA-test/main/FRED_RC10H_REAL_SHIELD_SEVERITY.user.js
// @grant        none
// ==/UserScript==

(function () {
  'use strict';
  const DRAWER_ID = 'fred-rc10i-drawer';

  function install() {
    const launcher = document.getElementById('fred-rc10-launcher');
    if (!launcher) {
      setTimeout(install, 100);
      return;
    }

    const trace = document.getElementById('fred-boot-trace');
    if (trace) trace.remove();
    if (document.getElementById(DRAWER_ID)) return;

    const style = document.createElement('style');
    style.textContent = `
      #${DRAWER_ID}{position:fixed;right:0;top:0;height:100dvh;width:min(78vw,390px);z-index:2147483646;box-sizing:border-box;padding:18px 14px 24px;color:#e8ecef;background:linear-gradient(180deg,#15191d 0%,#090b0d 100%);border-left:1px solid #46515c;box-shadow:-14px 0 32px rgba(0,0,0,.62);transform:translateX(102%);transition:transform .22s ease;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif}
      #${DRAWER_ID}.open{transform:translateX(0)}
      #${DRAWER_ID} .fred-close{position:absolute;right:10px;top:10px;width:34px;height:34px;border:1px solid #48525c;border-radius:7px;background:#171b1f;color:#d0d5da;font-size:24px;line-height:28px}
      #${DRAWER_ID} .fred-brand{margin:30px 1px 18px;padding:14px 5px 12px;text-align:center;background:linear-gradient(180deg,#292e32,#0c0f11);border-top:2px solid #626b72;border-bottom:2px solid #30373d;box-shadow:inset 0 0 0 1px #050607}
      #${DRAWER_ID} .fred-word{font-family:Impact,"Arial Black",sans-serif;font-size:clamp(31px,9vw,50px);line-height:1;letter-spacing:1px;white-space:nowrap;color:#c8c9c7;text-shadow:0 2px 0 #030405,0 -1px 0 #f3f3f0,2px 0 0 #555,-2px 0 0 #333}
      #${DRAWER_ID} .fred-motto{margin-top:5px;font-size:8px;font-weight:800;letter-spacing:1.7px;color:#7c858c}
      #${DRAWER_ID} .fred-status{padding:14px;border:1px solid #29362f;border-left:4px solid #43dc86;border-radius:4px;background:#0c1510}
      #${DRAWER_ID} .fred-watch{display:flex;align-items:center;gap:9px;color:#55e895;font-size:18px;font-weight:900;letter-spacing:.8px}
      #${DRAWER_ID} .fred-dot{width:12px;height:12px;flex:none;border-radius:50%;background:#49df8c;box-shadow:0 0 8px rgba(73,223,140,.45)}
      #${DRAWER_ID} .fred-clear{margin:6px 0 0 21px;color:#d6ddd9;font-size:15px;font-weight:750;letter-spacing:.4px}
    `;
    document.head.appendChild(style);

    const drawer = document.createElement('aside');
    drawer.id = DRAWER_ID;
    drawer.innerHTML = `
      <button class="fred-close" aria-label="Close Sentinel">×</button>
      <div class="fred-brand">
        <div class="fred-word">SENTINEL</div>
        <div class="fred-motto">OBSERVE • REPORT • INFORM</div>
      </div>
      <div class="fred-status">
        <div class="fred-watch"><span class="fred-dot"></span><span>WATCHING</span></div>
        <div class="fred-clear">ALL CLEAR</div>
      </div>`;
    document.body.appendChild(drawer);

    drawer.querySelector('.fred-close').addEventListener('click', (e) => {
      e.stopPropagation();
      drawer.classList.remove('open');
    });

    let downX = 0, downY = 0;
    launcher.addEventListener('pointerdown', (e) => {
      downX = e.clientX;
      downY = e.clientY;
    }, true);
    launcher.addEventListener('pointerup', (e) => {
      if (Math.hypot(e.clientX - downX, e.clientY - downY) < 5) {
        e.preventDefault();
        e.stopImmediatePropagation();
        drawer.classList.toggle('open');
      }
    }, true);
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', install, { once: true });
  } else {
    install();
  }
})();
