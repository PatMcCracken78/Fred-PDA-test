// ==UserScript==
// @name         Sentinel Mobile — FRED Boot Trace
// @namespace    Sentinel
// @version      1.0.0-rc3
// @description  FRED PDA staged startup diagnostic
// @author       Sentinel
// @match        https://www.torn.com/*
// @grant        none
// ==/UserScript==
(function(){'use strict';function b(t){var e=document.getElementById('fred-boot-trace');if(!e){e=document.createElement('div');e.id='fred-boot-trace';e.style.cssText='position:fixed;right:12px;bottom:90px;z-index:2147483647;background:#171b22;color:#fff;border:1px solid #4d5968;border-radius:8px;padding:10px 14px;font:700 14px -apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif;box-shadow:0 2px 12px rgba(0,0,0,.55)';document.body.appendChild(e)}e.textContent=t}function init(){b('FRED BOOT 3 — INIT');try{var s=document.createElement('style');s.id='fred-rc3-style';s.textContent='#fred-rc3-root{position:fixed;left:7px;top:48%;z-index:2147483647}#fred-rc3-launcher{width:34px;height:34px;border:0;border-radius:9px;background:#171b22;color:#2f82ff;font-weight:900}';document.head.appendChild(s);b('FRED BOOT 4 — STYLE');var r=document.createElement('div');r.id='fred-rc3-root';r.innerHTML='<button id="fred-rc3-launcher">S</button>';document.body.appendChild(r);b('FRED BOOT 5 — LAUNCHER');document.getElementById('fred-rc3-launcher').addEventListener('click',function(){b('FRED TAP OK')})}catch(e){b('FRED ERROR — '+String(e&&e.message||e))}}function start(){b('FRED BOOT 2 — STATE');if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',init,{once:true})}else{init()}}if(document.body){b('FRED BOOT 1 — EXEC');start()}else{document.addEventListener('DOMContentLoaded',function(){b('FRED BOOT 1 — EXEC');start()},{once:true})}})();