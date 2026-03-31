import { DEUSES } from './data/deuses.js';
import { renderMenu } from './components/menu.js';
import { renderStories } from './components/story.js';
import { applyPalette, playEffectFor } from './lib/effects.js';
import { attachHoverTriggerToLocationButton } from './lib/map.js';

const menuEl = document.getElementById('menu');
const storyEl = document.getElementById('story');

let current = DEUSES[0].id;

// note: left-side paw is purely decorative now; selection is driven by story scroll & keyboard

// effects and palette helpers are in ./lib/effects.js

// helper to set the story background based on deity id
function setStoryBackground(id){
  const wrap = storyEl.querySelector('.story-wrap');
  if(!wrap) return;
  const deus = DEUSES.find(d => d.id === id);
  const bg = (deus && deus.background) || {};
  const file = bg.image || '';
  const overlay = bg.overlay || 'linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.04))';

  if(file){
    const url = `assets/${file}`;
    wrap.style.backgroundImage = `${overlay}, url('${url}')`;
    const img = new Image();
    img.src = url;
    img.onerror = () => {
      console.warn(`Could not load story background: ${url} — verify the file exists at restaurante/${url}`);
    };
  } else {
    wrap.style.backgroundImage = '';
  }

  // set per-deity story text & title color for readability (sourced from deuses.js)
  const titleColor  = bg.titleColor  || 'var(--deep)';
  const textColor   = bg.textColor   || 'var(--deep)';
  const titleBg     = bg.titleBg     || 'rgba(255,255,255,0.02)';
  const titleShadow = bg.titleShadow || '0 4px 18px rgba(7,26,43,0.06)';
  const textShadow  = bg.textShadow  || 'none';
  wrap.style.setProperty('--story-title-color', titleColor);
  wrap.style.setProperty('--story-text-color', textColor);
  wrap.style.setProperty('--story-title-bg', titleBg);
  wrap.style.setProperty('--story-title-shadow', titleShadow);
  wrap.style.setProperty('--story-text-shadow', textShadow);
}

// playEffectFor moved to ./lib/effects.js

function selectDeus(id, opts = { scrollToStory: false, fromObserver: false }){
  current = id;
  const deus = DEUSES.find(d => d.id === id);
  // no interactive paw buttons — visual only. Selection highlights are reflected in the menu content.

  // play effect for deity transition
  playEffectFor(id);

  // animate menu: fade out, then render new content, then fade in
  menuEl.classList.add('animate-out');
  // small delay to allow animate-out to show
  setTimeout(()=>{
    // apply palette (sets --gold/--deep and subtle tint variables)
    applyPalette(deus);

    // render menu for selected deus
    renderMenu(menuEl, deus);

    // update story background to match the selected deity
    setStoryBackground(id);

    // animate in
    menuEl.classList.remove('animate-out');
    menuEl.classList.add('animate-in');
    // remove animate-in after transition completes
    setTimeout(()=> menuEl.classList.remove('animate-in'), 320);
  }, 220);

  // optionally scroll the story area to the associated section (triggered by clicking paw)
  if(opts.scrollToStory){
    const target = document.querySelector(`.story-section[data-id="${id}"]`);
    if(target){
      target.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}

// Ver cardápio button → scroll to panel
const heroBtnPrimary = document.querySelector('.hero-btn.primary');
if(heroBtnPrimary){
  heroBtnPrimary.addEventListener('click', () => {
    const panel = document.getElementById('panel');
    if(panel) panel.scrollIntoView({ behavior: 'smooth', block: 'center' });
  });
}

// init
// render all stories into the story area
renderStories(storyEl, DEUSES);
// render menu for initial selection
selectDeus(current, { scrollToStory: false });
// attach location button hover/click handlers
attachHoverTriggerToLocationButton();

// observe which story section is mostly visible and update selected deus accordingly
const observer = new IntersectionObserver((entries)=>{
  entries.forEach(entry => {
    if(entry.isIntersecting && entry.intersectionRatio > 0.45){
      const id = entry.target.dataset.id;
      if(id && id !== current){
        selectDeus(id, { fromObserver: true });
      }
    }
  });
},{ root: storyEl, threshold: [0.45, 0.6, 0.8] });

// observe all sections
document.querySelectorAll('.story-section').forEach(s => observer.observe(s));

// keyboard left/right to navigate quickly
window.addEventListener('keydown', (e)=>{
  const idx = DEUSES.findIndex(d=>d.id===current);
  if(e.key === 'ArrowRight'){
    const next = DEUSES[(idx+1)%DEUSES.length];
    selectDeus(next.id, { scrollToStory: true });
  } else if(e.key === 'ArrowLeft'){
    const prev = DEUSES[(idx-1+DEUSES.length)%DEUSES.length];
    selectDeus(prev.id, { scrollToStory: true });
  }
});

// Map modal & popup logic moved to ./lib/map.js

// initialize hover trigger (map) — implementation in js/lib/map.js
attachHoverTriggerToLocationButton();
