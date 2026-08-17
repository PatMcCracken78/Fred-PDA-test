// ==UserScript==
// @name Sentinel Mobile — FRED RC10F Blue Paint
// @namespace Sentinel
// @version 1.0.0-rc10f
// @description Paint-only override for RC10F exact clone; changes shield blue without touching mask plumbing.
// @match https://www.torn.com/*
// @grant none
// ==/UserScript==
(function(){'use strict';
const BLUE='#52a2ff';
const STYLE_ID='fred-rc10f-blue-paint';
function apply(){
  let s=document.getElementById(STYLE_ID);
  if(!s){s=document.createElement('style');s.id=STYLE_ID;document.head.appendChild(s);}
  s.textContent='#fred-rc10-launcher .mask{background:'+BLUE+' !important;filter:drop-shadow(0 0 4px '+BLUE+') !important;}';
  let b=document.getElementById('fred-rc10f-paint-status');
  if(!b){b=document.createElement('div');b.id='fred-rc10f-paint-status';b.style.cssText='position:fixed;right:12px;bottom:90px;z-index:2147483647;background:#171b22;color:#fff;border:1px solid #4d5968;border-radius:8px;padding:10px 14px;font:700 14px -apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif';document.body.appendChild(b);}
  b.textContent='FRED RC10F • PAINT '+BLUE+' APPLIED';
}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',apply,{once:true});}else{apply();}
})();
