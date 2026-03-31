// Animation and theme helper functions (separated from app logic)

// convert hex color to rgba string
export function hexToRgba(hex, alpha = 1){
  if(!hex) return `rgba(0,0,0,${alpha})`;
  let h = hex.replace('#','').trim();
  if(h.length === 3){ h = h.split('').map(ch => ch + ch).join(''); }
  const bigint = parseInt(h, 16);
  const r = (bigint >> 16) & 255;
  const g = (bigint >> 8) & 255;
  const b = bigint & 255;
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

// apply palette values as CSS variables (used by the app when switching deities)
export function applyPalette(deus){
  if(!deus || !deus.palette) return;
  const doc = document.documentElement;
  doc.style.setProperty('--gold', deus.palette.accent || '#c59a3d');
  doc.style.setProperty('--deep', deus.palette.primary || '#0b2545');

  const soft = (deus.palette && deus.palette.soft) || {};
  const weak = soft.weak || '#b8872f';
  const mid = soft.mid || '#b8872f';
  const light = soft.light || '#b8872f';

  doc.style.setProperty('--accent-soft', hexToRgba(weak, 0.10));
  doc.style.setProperty('--panel-border', hexToRgba(mid, 0.06));
  // slightly stronger tint so the change is more visible but still soft
  const highlight = hexToRgba(light, 0.30);
  doc.style.setProperty('--accent-highlight', highlight);

  // fallback: apply inline background to body so the tint updates even if CSS
  // custom properties aren't picked up for some reason (more reliable).
  try{
    const rootBg = getComputedStyle(document.documentElement).getPropertyValue('--bg') || '#f4f3f2';
    // Compose a visible gradient + base background and use multiply blend so tint is clear
    // We also create/ensure a dedicated fixed overlay element (#tint-overlay) so the tint
    // is applied behind content reliably and can be toggled independently of body styles.
    let overlay = document.getElementById('tint-overlay');
    if(!overlay){
      overlay = document.createElement('div');
      overlay.id = 'tint-overlay';
      document.body.insertBefore(overlay, document.body.firstChild);
    }
    overlay.style.background = `linear-gradient(135deg, ${highlight}, rgba(255,255,255,0) 40%), ${rootBg}`;
    overlay.style.backgroundRepeat = 'no-repeat';
    overlay.style.backgroundSize = 'cover';
  // keep overlay slightly transparent so content remains readable
  overlay.style.opacity = '0.9';
    overlay.style.transition = 'background 260ms ease, opacity 260ms ease';
  }catch(e){ /* ignore when document.body not available */ }

  // debug: log the applied palette so developer can confirm in console
  if(typeof console !== 'undefined' && console.debug){
    console.debug('applyPalette:', deus.id || '(unknown)', { weak, mid, light, highlight });
  }
}

// play a short, per-deity visual effect in the effects overlay
export function playEffectFor(id){
  const effectsEl = document.getElementById('effects');
  if(!effectsEl) return;
  const wrapper = document.createElement('div');
  wrapper.className = `effect effect--${id}`;
  if(id === 'zeus'){
    wrapper.innerHTML = `<div class="flash"></div><div class="bolt" style="position: absolute; left: 50%; transform: translateX(-50%);"></div>`;
  } else if(id === 'hades'){
    wrapper.innerHTML = `<div class="cloud" style="position: absolute; bottom: 10%; left: 50%; transform: translateX(-50%);"></div>`;
  } else if(id === 'athena'){
    wrapper.innerHTML = `<div class="glow" style="position: absolute; right: 10%; top: 12%;"></div>`;
  } else {
    wrapper.innerHTML = `<div class="glow" style="position: absolute; right: 10%; top: 12%;"></div>`;
  }

  effectsEl.appendChild(wrapper);
  setTimeout(()=> wrapper.remove(), 1100);
}

export default { hexToRgba, applyPalette, playEffectFor };
