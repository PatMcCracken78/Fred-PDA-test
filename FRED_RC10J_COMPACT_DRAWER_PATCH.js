;(function(){'use strict';
const DRAWER_ID='fred-rc10j-drawer';
function install(){
 const btn=document.getElementById('fred-rc10-launcher');
 if(!btn){setTimeout(install,80);return}
 const trace=document.getElementById('fred-boot-trace'); if(trace) trace.remove();
 const old=document.getElementById(DRAWER_ID); if(old) old.remove();
 const style=document.createElement('style');
 style.textContent=`
#${DRAWER_ID}{position:fixed;right:0;top:0;width:min(78vw,390px);height:50dvh;z-index:2147483646;background:linear-gradient(180deg,#11161b 0%,#090d10 100%);border-left:1px solid #46515c;border-bottom:1px solid #353d45;box-shadow:-12px 8px 30px rgba(0,0,0,.55);transform:translateX(102%);transition:transform .22s ease;color:#e9edf1;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;box-sizing:border-box;padding:14px 14px 18px;overflow:hidden}
#${DRAWER_ID}.open{transform:translateX(0)}
#${DRAWER_ID} .close{position:absolute;right:10px;top:10px;width:34px;height:34px;border:1px solid #48525c;border-radius:7px;background:#161b20;color:#cbd2d8;font-size:24px;line-height:28px;z-index:2}
#${DRAWER_ID} .brand{margin:24px 2px 18px;padding:14px 6px 12px;text-align:center;border-top:2px solid #59636d;border-bottom:2px solid #303840;background:linear-gradient(180deg,#242a2f,#0c0f12);box-shadow:inset 0 0 0 1px #050607}
#${DRAWER_ID} .word{font-family:Impact,"Arial Black",sans-serif;font-size:clamp(31px,9vw,50px);letter-spacing:1px;line-height:1;color:#c8c8c5;text-shadow:0 2px 0 #050505,0 -1px 0 #fff;white-space:nowrap}
#${DRAWER_ID} .motto{margin-top:4px;font-size:8px;letter-spacing:1.7px;color:#777f86;font-weight:800}
#${DRAWER_ID} .status{border:1px solid #28342e;border-left:4px solid #42d982;background:#0d1511;padding:14px;border-radius:4px}
#${DRAWER_ID} .watch{display:flex;align-items:center;gap:9px;color:#55e895;font-size:18px;font-weight:900;letter-spacing:.8px}
#${DRAWER_ID} .dot{width:12px;height:12px;border-radius:50%;background:#49df8c;box-shadow:0 0 8px rgba(73,223,140,.45);flex:none}
#${DRAWER_ID} .clear{margin:6px 0 0 21px;color:#d6ddd9;font-size:15px;font-weight:750;letter-spacing:.4px}`;
 document.head.appendChild(style);
 const d=document.createElement('aside');
 d.id=DRAWER_ID;
 d.innerHTML='<button class="close" aria-label="Close Sentinel">×</button><div class="brand"><div class="word">SENTINEL</div><div class="motto">OBSERVE • REPORT • INFORM</div></div><div class="status"><div class="watch"><span class="dot"></span><span>WATCHING</span></div><div class="clear">ALL CLEAR</div></div>';
 document.body.appendChild(d);
 d.querySelector('.close').addEventListener('click',e=>{e.stopPropagation();d.classList.remove('open')});
 let x=0,y=0;
 btn.addEventListener('pointerdown',e=>{x=e.clientX;y=e.clientY},true);
 btn.addEventListener('pointerup',e=>{if(Math.hypot(e.clientX-x,e.clientY-y)<5){e.preventDefault();e.stopImmediatePropagation();d.classList.toggle('open')}},true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
