// ==UserScript==
// @name         Sentinel Mobile — MAX FRED UI Lab
// @namespace    Sentinel
// @version      0.5.1-max-canned
// @description  MAX/QUIET canned UI lab with true viewport sizing and no-scroll contract
// @match        https://www.torn.com/*
// @grant        none
// ==/UserScript==
(function(){
'use strict';
const DRAWER_ID='fred-rc10j-drawer';
const STYLE_ID='fred-max-ui-lab-style';
const LAUNCHER_ID='fred-rc10-root';
const WORDMARK='https://raw.githubusercontent.com/PatMcCracken78/Fred-PDA-test/main/assets/sentinel_wordmark.png?v=5';
let mode='max';
function fmtLocal(d){return new Intl.DateTimeFormat(undefined,{hour:'numeric',minute:'2-digit',second:'2-digit'}).format(d)}
function fmtTCT(d){const h=String(d.getUTCHours()).padStart(2,'0'),m=String(d.getUTCMinutes()).padStart(2,'0'),s=String(d.getUTCSeconds()).padStart(2,'0');return `${h}:${m}:${s} TCT`}
function usableViewport(){
 const de=document.documentElement;
 const vv=window.visualViewport;
 const valsW=[de.clientWidth,window.innerWidth,vv&&vv.width].filter(v=>Number.isFinite(v)&&v>0);
 const valsH=[de.clientHeight,window.innerHeight,vv&&vv.height].filter(v=>Number.isFinite(v)&&v>0);
 return {w:Math.floor(Math.min(...valsW)),h:Math.floor(Math.min(...valsH))};
}
function applyViewport(drawer){const {w,h}=usableViewport();drawer.style.setProperty('--fred-vw',`${w}px`);drawer.style.setProperty('--fred-vh',`${h}px`)}
function install(){
 const drawer=document.getElementById(DRAWER_ID);
 if(!drawer){setTimeout(install,100);return}
 const launcher=document.getElementById(LAUNCHER_ID);
 document.getElementById(STYLE_ID)?.remove();
 const st=document.createElement('style');st.id=STYLE_ID;st.textContent=`
html,body{overscroll-behavior:none!important;}
#${DRAWER_ID}{position:fixed!important;top:0!important;left:0!important;right:auto!important;width:var(--fred-vw)!important;max-width:var(--fred-vw)!important;height:var(--fred-vh)!important;max-height:var(--fred-vh)!important;box-sizing:border-box!important;margin:0!important;padding:10px 10px 12px!important;overflow:hidden!important;overflow-x:hidden!important;overflow-y:hidden!important;background:linear-gradient(180deg,#101419 0%,#080b0e 100%)!important;border:0!important;border-bottom:1px solid #343c44!important;z-index:2147483647!important;display:grid!important;grid-template-rows:auto auto auto minmax(0,1fr) auto auto!important;gap:8px!important;}
#${DRAWER_ID}.fred-quiet{height:auto!important;min-height:0!important;max-height:var(--fred-vh)!important;grid-template-rows:auto auto auto auto auto!important;}
#${DRAWER_ID} .fred-close{position:fixed!important;top:45%;right:0!important;transform:translateY(-50%)!important;width:48px!important;height:58px!important;border-radius:10px 0 0 10px!important;border:1px solid #47535e!important;border-right:0!important;background:linear-gradient(180deg,#20272d,#10151a)!important;color:#dce3e8!important;font-size:30px!important;line-height:1!important;display:flex!important;align-items:center!important;justify-content:center!important;z-index:2147483648!important;box-shadow:-3px 3px 12px rgba(0,0,0,.45)!important;}
#${DRAWER_ID} .fred-brand{border:1px solid #37414a;background:linear-gradient(180deg,#171c21,#090c0f);padding:6px 8px;text-align:center;overflow:hidden;}
#${DRAWER_ID} .fred-brand img{display:block;width:min(82%,620px);height:auto;max-height:116px;object-fit:contain;margin:0 auto;}
#${DRAWER_ID} .fred-clocks{display:grid;grid-template-columns:1fr 1fr;gap:8px;}
#${DRAWER_ID} .fred-clock{border:1px solid #333d46;background:#0a0d10;padding:6px 10px;min-width:0;}
#${DRAWER_ID} .fred-label{font-size:10px;letter-spacing:1px;color:#8c969f;font-weight:800;text-transform:uppercase;white-space:nowrap;}
#${DRAWER_ID} .fred-time{font-size:15px;color:#eef1f3;font-weight:800;margin-top:2px;white-space:nowrap;}
#${DRAWER_ID} .fred-myoc{border:1px solid #34414a;background:#0a0e12;padding:6px 11px;display:grid;grid-template-columns:1fr auto;align-items:center;gap:10px;}
#${DRAWER_ID} .fred-myoc span{font-size:15px;color:#52a2ff;font-weight:900;white-space:nowrap;}
#${DRAWER_ID} .fred-middle{min-height:0;display:flex;flex-direction:column;gap:7px;overflow:hidden;}
#${DRAWER_ID} .fred-section{font-size:11px;letter-spacing:1.25px;color:#91a0ad;font-weight:900;padding:2px 3px;cursor:pointer;user-select:none;}
#${DRAWER_ID} .fred-alert{position:relative;border:1px solid #333b41;background:#0c1013;padding:9px 11px 9px 14px;display:grid;grid-template-columns:24px 1fr auto;column-gap:9px;align-items:center;min-height:46px;box-sizing:border-box;}
#${DRAWER_ID} .fred-alert:before{content:'';position:absolute;left:0;top:0;bottom:0;width:4px;background:var(--sev);}
#${DRAWER_ID} .green{--sev:#48df8b}.yellow{--sev:#ffe23b}.red{--sev:#ff3030}
#${DRAWER_ID} .fred-icon{font-size:18px;text-align:center;color:var(--sev);font-weight:900;}
#${DRAWER_ID} .fred-head{font-size:16px;font-weight:900;color:var(--sev);letter-spacing:.3px;line-height:1.05;}
#${DRAWER_ID} .fred-sub{font-size:13px;color:#d2d8dc;margin-top:3px;line-height:1.12;}
#${DRAWER_ID} .fred-side{font-size:12px;color:#9ba5ad;font-weight:800;text-align:right;white-space:nowrap;}
#${DRAWER_ID} .fred-next{border:1px solid #33404a;background:#0a0e12;padding:9px 11px;display:grid;grid-template-columns:1fr auto;gap:10px;align-items:end;}
#${DRAWER_ID} .fred-next-name{font-size:18px;font-weight:900;color:#edf1f4;margin-top:2px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis;}
#${DRAWER_ID} .fred-next-meta{font-size:11px;color:#aab3ba;margin-top:2px;}
#${DRAWER_ID} .fred-count{font-size:23px;font-weight:900;color:#52a2ff;white-space:nowrap;}
#${DRAWER_ID} .fred-today{border:1px solid #333c43;background:#090c0f;padding:8px 10px 9px;}
#${DRAWER_ID} .fred-score{display:grid;grid-template-columns:.8fr .8fr .9fr 1.35fr;gap:8px;margin-top:5px;}
#${DRAWER_ID} .fred-stat{min-width:0}.fred-stat-k{font-size:10px;color:#89939b;letter-spacing:.7px;font-weight:800;white-space:nowrap}.fred-stat-v{font-size:20px;font-weight:900;color:#e9edf0;margin-top:1px;white-space:nowrap;overflow:hidden;text-overflow:ellipsis}.fred-pass{color:#48df8b}.fred-fail{color:#ff3030}.fred-money{color:#48df8b}.fred-respect{color:#52a2ff}
#${DRAWER_ID}.fred-quiet .fred-middle .fred-alert:not(.fred-quiet-alert){display:none!important;}
#${DRAWER_ID}.fred-quiet .fred-next{display:none!important;}
#${DRAWER_ID}.fred-quiet .fred-middle{min-height:0!important;}
`;
 document.head.appendChild(st);
 drawer.innerHTML=`
 <button class="fred-close" aria-label="Close Sentinel">×</button>
 <div class="fred-brand"><img src="${WORDMARK}" alt="Sentinel"></div>
 <div class="fred-clocks"><div class="fred-clock"><div class="fred-label">LOCAL</div><div id="fred-local" class="fred-time"></div></div><div class="fred-clock"><div class="fred-label">TORN · TCT</div><div id="fred-tct" class="fred-time"></div></div></div>
 <div class="fred-myoc"><span>MY OC</span><span>1d 8h</span></div>
 <div class="fred-middle"><div id="fred-mode-toggle" class="fred-section">CURRENT CONDITIONS · TAP MAX / QUIET</div>
 <div class="fred-alert green fred-quiet-alert"><div class="fred-icon">●</div><div><div class="fred-head">WATCHING</div><div id="fred-watch-sub" class="fred-sub">Blast from the Past · ready window healthy</div></div><div id="fred-watch-side" class="fred-side">14h 45m</div></div>
 <div class="fred-alert yellow"><div class="fred-icon">▲</div><div><div class="fred-head">CAUTIONARY</div><div class="fred-sub">WRONG CONTINENT • UAE</div></div><div class="fred-side">DETAILS ›</div></div>
 <div class="fred-alert yellow"><div class="fred-icon">!</div><div><div class="fred-head">MISSING ITEM</div><div class="fred-sub">Required OC item unavailable</div></div><div class="fred-side">ACTION</div></div>
 <div class="fred-alert red"><div class="fred-icon">●</div><div><div class="fred-head">DELAYED</div><div class="fred-sub">CUTTING IT CLOSE ↘ SWITZERLAND</div></div><div class="fred-side">+18m</div></div></div>
 <div class="fred-next"><div><div class="fred-label">NEXT · RELEVANT OC</div><div class="fred-next-name">Blast from the Past</div><div class="fred-next-meta">Difficulty 7 · 6 participants</div></div><div><div class="fred-label" style="text-align:right">STARTS IN</div><div class="fred-count">14:45:28</div></div></div>
 <div class="fred-today"><div class="fred-section">TODAY · TCT</div><div class="fred-score"><div class="fred-stat"><div class="fred-stat-k">PASS</div><div class="fred-stat-v fred-pass">3</div></div><div class="fred-stat"><div class="fred-stat-k">FAILED</div><div class="fred-stat-v fred-fail">1</div></div><div class="fred-stat"><div class="fred-stat-k">RESPECT</div><div class="fred-stat-v fred-respect">596</div></div><div class="fred-stat"><div class="fred-stat-k">EARNINGS</div><div class="fred-stat-v fred-money">$220.3M</div></div></div></div>`;
 function syncLauncher(){if(launcher)launcher.style.zIndex=drawer.classList.contains('open')?'2147483645':'2147483647'}
 function setMode(next){mode=next;drawer.classList.toggle('fred-quiet',mode==='quiet');const s=document.getElementById('fred-watch-sub'),r=document.getElementById('fred-watch-side');if(mode==='quiet'){s.textContent='ALL CLEAR';r.textContent='';}else{s.textContent='Blast from the Past · ready window healthy';r.textContent='14h 45m';}applyViewport(drawer)}
 applyViewport(drawer);syncLauncher();
 new MutationObserver(syncLauncher).observe(drawer,{attributes:true,attributeFilter:['class']});
 window.addEventListener('resize',()=>applyViewport(drawer),{passive:true});
 window.visualViewport?.addEventListener('resize',()=>applyViewport(drawer),{passive:true});
 drawer.querySelector('.fred-close')?.addEventListener('click',e=>{e.preventDefault();e.stopPropagation();drawer.classList.remove('open');syncLauncher()});
 document.getElementById('fred-mode-toggle')?.addEventListener('click',()=>setMode(mode==='max'?'quiet':'max'));
 function tick(){const now=new Date();const l=document.getElementById('fred-local'),t=document.getElementById('fred-tct');if(l)l.textContent=fmtLocal(now);if(t)t.textContent=fmtTCT(now)}tick();setInterval(tick,1000);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();