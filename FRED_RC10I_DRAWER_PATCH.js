;(function(){'use strict';
const ID='fred-rc10i-drawer';
function install(){
  const btn=document.getElementById('fred-rc10-launcher');
  if(!btn){setTimeout(install,80);return}
  const trace=document.getElementById('fred-boot-trace'); if(trace) trace.remove();
  const style=document.createElement('style');
  style.textContent=`
#${ID}{position:fixed;right:0;top:0;height:100dvh;width:min(78vw,390px);z-index:2147483646;background:linear-gradient(180deg,#11161b 0%,#080b0e 100%);border-left:1px solid #46515c;box-shadow:-12px 0 30px rgba(0,0,0,.55);transform:translateX(102%);transition:transform .22s ease;color:#e9edf1;font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Arial,sans-serif;box-sizing:border-box;padding:18px 14px 24px}
#${ID}.open{transform:translateX(0)}
#${ID} .close{position:absolute;right:10px;top:10px;width:34px;height:34px;border:1px solid #48525c;border-radius:7px;background:#161b20;color:#cbd2d8;font-size:24px;line-height:28px}
#${ID} .brand{margin:28px 2px 18px;padding:14px 8px 12px;text-align:center;border-top:2px solid #59636d;border-bottom:2px solid #303840;background:linear-gradient(180deg,#242a2f,#0c0f12);box-shadow:inset 0 0 0 1px #050607}
#${ID} .word{font-family:Impact,"Arial Black",sans-serif;font-size:clamp(32px,9vw,52px);letter-spacing:2px;line-height:1;color:#c8c8c5;text-shadow:0 2px 0 #050505,0 -1px 0 #fff,2px 0 0 #555,-2px 0 0 #333;white-space:nowrap}
#${ID} .motto{margin-top:4px;font-size:9px;letter-spacing:2px;color:#777f86;font-weight:800}
#${ID} .status{border:1px solid #28342e;border-left:4px solid #42d982;background:#0d1511;padding:14px 14px 13px;border-radius:4px}
#${ID} .watch{display:flex;align-items:center;gap:9px;color:#55e895;font-size:18px;font-weight:900;letter-spacing:.8px}
#${ID} .dot{width:12px;height:12px;border-radius:50%;background:#49df8c;box-shadow:0 0 8px rgba(73,223,140,.45);flex:none}
#${ID} .clear{margin:6px 0 0 21px;color:#d6ddd9;font-size:15px;font-weight:750;letter-spacing:.4px}`;
  document.head.appendChild(style);
  const drawer=document.createElement('aside');
  drawer.id=ID;
  drawer.innerHTML='<button class="close" aria-label="Close Sentinel">×</button><div class="brand"><div class="word">SENTINEL</div><div class="motto">OBSERVE • REPORT • INFORM</div></div><div class="status"><div class="watch"><span class="dot"></span><span>WATCHING</span></div><div class="clear">ALL CLEAR</div></div>';
  document.body.appendChild(drawer);
  drawer.querySelector('.close').addEventListener('click',e=>{e.stopPropagation();drawer.classList.remove('open')});
  let sx=0,sy=0;
  btn.addEventListener('pointerdown',e=>{sx=e.clientX;sy=e.clientY},true);
  btn.addEventListener('pointerup',e=>{
    if(Math.hypot(e.clientX-sx,e.clientY-sy)<5){
      e.preventDefault();e.stopImmediatePropagation();
      drawer.classList.toggle('open');
    }
  },true);
}
if(document.readyState==='loading')document.addEventListener('DOMContentLoaded',install,{once:true});else install();
})();
