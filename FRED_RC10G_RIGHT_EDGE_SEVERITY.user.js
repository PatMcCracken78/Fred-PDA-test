// ==UserScript==
// @name Sentinel Mobile — FRED RC10G Right Edge Severity Harness
// @namespace Sentinel
// @version 1.0.0-rc10g
// @description Single-script right-edge placement + blue/yellow/red severity hierarchy test
// @match https://www.torn.com/*
// @grant none
// ==/UserScript==
(function(){
'use strict';
const KEY='fred_rc10g_top';
const COLORS=[
 {name:'BLUE',hex:'#52a2ff'},
 {name:'YELLOW',hex:'#ffd84a'},
 {name:'RED',hex:'#ff4d4d'}
];
let idx=0;
function boot(msg){
 let e=document.getElementById('fred-boot-trace');
 if(!e){
  e=document.createElement('div');
  e.id='fred-boot-trace';
  e.style.cssText='position:fixed;right:12px;bottom:90px;z-index:2147483647;background:#171b22;color:#fff;border:1px solid #4d5968;border-radius:8px;padding:10px 14px;font:700 14px -apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif';
  document.body.appendChild(e);
 }
 e.textContent=msg;
}
function init(){
 document.getElementById('fred-rc10g-root')?.remove();
 document.getElementById('fred-rc10g-style')?.remove();
 const style=document.createElement('style');
 style.id='fred-rc10g-style';
 style.textContent=`
 #fred-rc10g-root{position:fixed;right:7px;top:48%;z-index:2147483647;touch-action:none;user-select:none;-webkit-user-select:none}
 #fred-rc10g-launcher{width:36px;height:36px;border:0;padding:0;background:rgba(8,10,13,.86);border-radius:9px;box-shadow:0 2px 12px rgba(0,0,0,.52);display:flex;align-items:center;justify-content:center;cursor:pointer;touch-action:none}
 #fred-rc10g-shield{position:relative;width:29px;height:31px;background:#52a2ff;clip-path:polygon(50% 0%,90% 13%,86% 62%,72% 82%,50% 100%,28% 82%,14% 62%,10% 13%);filter:drop-shadow(0 0 4px #52a2ff);display:flex;align-items:center;justify-content:center}
 #fred-rc10g-shield:after{content:'S';font:900 16px -apple-system,BlinkMacSystemFont,Segoe UI,Arial,sans-serif;color:#0b1017;text-shadow:0 1px 0 rgba(255,255,255,.12);transform:translateY(-1px)}
 `;
 document.head.appendChild(style);
 const root=document.createElement('div');
 root.id='fred-rc10g-root';
 const saved=parseFloat(localStorage.getItem(KEY));
 if(Number.isFinite(saved)) root.style.top=Math.min(90,Math.max(8,saved))+'%';
 root.innerHTML='<button id="fred-rc10g-launcher" aria-label="Sentinel severity test"><span id="fred-rc10g-shield"></span></button>';
 document.body.appendChild(root);
 const btn=root.querySelector('#fred-rc10g-launcher');
 const shield=root.querySelector('#fred-rc10g-shield');
 function paint(){
  const c=COLORS[idx];
  shield.style.background=c.hex;
  shield.style.filter=`drop-shadow(0 0 4px ${c.hex})`;
  boot(`FRED RC10G • ${c.name} ${c.hex} • drag vertically / tap to cycle`);
 }
 let startY=0,startTop=0,moved=false,active=false;
 const down=(e)=>{
  active=true;moved=false;startY=e.clientY;
  const r=root.getBoundingClientRect();startTop=r.top;
  try{btn.setPointerCapture(e.pointerId)}catch(_e){}
 };
 const move=(e)=>{
  if(!active)return;
  const dy=e.clientY-startY;
  if(Math.abs(dy)>4)moved=true;
  if(!moved)return;
  const max=window.innerHeight-root.offsetHeight-8;
  const top=Math.max(8,Math.min(max,startTop+dy));
  root.style.top=top+'px';
 };
 const up=(e)=>{
  if(!active)return;active=false;
  if(moved){
   const r=root.getBoundingClientRect();
   const pct=(r.top/window.innerHeight)*100;
   root.style.top=pct+'%';
   localStorage.setItem(KEY,String(pct));
   boot(`FRED RC10G • POSITION SAVED ${pct.toFixed(1)}%`);
  }else{
   idx=(idx+1)%COLORS.length;paint();
  }
  try{btn.releasePointerCapture(e.pointerId)}catch(_e){}
 };
 btn.addEventListener('pointerdown',down);
 btn.addEventListener('pointermove',move);
 btn.addEventListener('pointerup',up);
 btn.addEventListener('pointercancel',()=>{active=false});
 paint();
}
function start(){
 if(document.readyState==='loading') document.addEventListener('DOMContentLoaded',init,{once:true});
 else init();
}
if(document.body) start();
else document.addEventListener('DOMContentLoaded',start,{once:true});
})();