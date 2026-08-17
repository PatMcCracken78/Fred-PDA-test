// ==UserScript==
// @name Sentinel Mobile — FRED RC10E Blue Tuner
// @namespace Sentinel
// @version 1.0.0-rc10e
// @description Cosmetic probe: tune only the proven RC10 shield blue; RC10 must be enabled
// @match https://www.torn.com/*
// @grant none
// ==/UserScript==
(function(){'use strict';
const PICKS={A:{color:'#2f82ff',glow:'0 0 4px #2f82ff'},B:{color:'#3d91ff',glow:'0 0 5px #3d91ff'},C:{color:'#52a2ff',glow:'0 0 6px #52a2ff'},D:{color:'#6ab2ff',glow:'0 0 7px #6ab2ff'}};
function note(t){let e=document.getElementById('fred-boot-trace');if(!e){e=document.createElement('div');e.id='fred-boot-trace';e.style.cssText='position:fixed;right:12px;bottom:90px;max-width:92vw;z-index:2147483647;background:#171b22;color:#fff;border:1px solid #4d5968;border-radius:8px;padding:10px 14px;font:700 14px -apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif;box-shadow:0 2px 12px rgba(0,0,0,.55)';document.body.appendChild(e)}e.textContent=t}
function apply(k){const mask=document.querySelector('#fred-rc10-launcher .mask');if(!mask){note('FRED RC10E WAITING • enable RC10');return false}const p=PICKS[k];mask.style.setProperty('background',p.color,'important');mask.style.setProperty('filter','drop-shadow('+p.glow+')','important');note('FRED RC10E PICK • '+k+' • '+p.color);return true}
function build(){if(!document.querySelector('#fred-rc10-launcher .mask')){note('FRED RC10E WAITING • enable RC10');setTimeout(build,800);return}document.getElementById('fred-rc10e-root')?.remove();const r=document.createElement('div');r.id='fred-rc10e-root';r.style.cssText='position:fixed;left:48px;top:48%;z-index:2147483647;display:flex;gap:4px;background:rgba(8,10,13,.92);border-radius:8px;padding:4px;box-shadow:0 2px 12px rgba(0,0,0,.55)';r.innerHTML=Object.keys(PICKS).map(k=>'<button data-k="'+k+'" style="width:30px;height:30px;border:1px solid rgba(255,255,255,.15);border-radius:7px;background:#171b22;color:#fff;font-weight:800">'+k+'</button>').join('');document.body.appendChild(r);r.querySelectorAll('button').forEach(b=>b.addEventListener('click',()=>apply(b.dataset.k)));note('FRED RC10E — TAP A / B / C / D');}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',build,{once:true});else build();
})();