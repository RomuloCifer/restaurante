import { DEUSES } from './data/deuses.js';
import { renderMenu } from './components/menu.js';
import { renderStories } from './components/story.js';

const menuEl = document.getElementById('menu');
const storyEl = document.getElementById('story');

let current = DEUSES[0].id;

// note: left-side paw is purely decorative now; selection is driven by story scroll & keyboard

const effectsEl = document.getElementById('effects');

// helper to set the story background based on deity id
function setStoryBackground(id){
  const wrap = storyEl.querySelector('.story-wrap');
  if(!wrap) return;
  // mapping id -> filename (expects files in /assets)
  const mapping = {
    zeus: 'gato_zeus.png',
    athena: 'gato_athena.png',
    hades: 'gato_hades.png'
  };
  const file = mapping[id] || '';
  // choose an overlay to keep text readable; adjust per deity
  const overlays = {
    // use a darker overlay for light backgrounds so white text reads well
    zeus: 'linear-gradient(rgba(6,10,14,0.56), rgba(6,10,14,0.28))',
    athena: 'linear-gradient(rgba(8,12,18,0.52), rgba(8,12,18,0.22))',
    hades: 'linear-gradient(rgba(12,6,24,0.36), rgba(12,6,24,0.24))'
  };
  const overlay = overlays[id] || 'linear-gradient(rgba(0,0,0,0.08), rgba(0,0,0,0.04))';
  if(file){
    // set as layered background: overlay then image
    // paths for inline style are relative to the document (index.html), so use 'assets/...'
    const url = `assets/${file}`;
    wrap.style.backgroundImage = `${overlay}, url('${url}')`;

    // preload image and log error if missing (helps debug local file issues)
    const img = new Image();
    img.src = url;
    img.onload = () => {
      // image loaded successfully
      // console.debug(`Story background loaded: ${url}`);
    };
    img.onerror = () => {
      console.warn(`Could not load story background: ${url} — please verify the file exists at restaurante/${url}`);
    };
  } else {
    wrap.style.backgroundImage = '';
  }

  // set per-deity story text & title color for readability
  const titleColors = {
    zeus: { title: '#fffdf9', text: '#fbf9f6', bg: 'linear-gradient(rgba(10,14,20,0.48), rgba(10,14,20,0.18))', shadow: '0 10px 30px rgba(4,8,12,0.5)', textShadow: '0 2px 10px rgba(0,0,0,0.45)' },
    athena: { title: '#fffdf6', text: '#faf8f5', bg: 'linear-gradient(rgba(12,16,22,0.46), rgba(12,16,22,0.18))', shadow: '0 10px 30px rgba(6,10,14,0.45)', textShadow: '0 2px 10px rgba(0,0,0,0.42)' },
    hades: { title: '#fbf9f8', text: '#f7f5f4', bg: 'linear-gradient(rgba(0,0,0,0.12), rgba(0,0,0,0.06))', shadow: '0 8px 26px rgba(0,0,0,0.6)', textShadow: '0 1px 6px rgba(0,0,0,0.4)' }
  };

  const c = titleColors[id] || { title: 'var(--deep)', text: 'var(--deep)', bg: 'rgba(255,255,255,0.02)', shadow: '0 4px 18px rgba(7,26,43,0.06)', textShadow: 'none' };
  wrap.style.setProperty('--story-title-color', c.title);
  wrap.style.setProperty('--story-text-color', c.text);
  wrap.style.setProperty('--story-title-bg', c.bg);
  wrap.style.setProperty('--story-title-shadow', c.shadow);
  wrap.style.setProperty('--story-text-shadow', c.textShadow);
}

function playEffectFor(id){
  if(!effectsEl) return;
  // create effect container
  const wrapper = document.createElement('div');
  wrapper.className = `effect effect--${id}`;
  // add type-specific inner markup
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
  // remove after animation ends (give some buffer)
  setTimeout(()=>{
    wrapper.remove();
  }, 1100);
}

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
    // update palette
    document.documentElement.style.setProperty('--gold', deus.palette.accent || '#c59a3d');
    document.documentElement.style.setProperty('--deep', deus.palette.primary || '#0b2545');

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

// init
// render all stories into the story area
renderStories(storyEl, DEUSES);
// render menu for initial selection
selectDeus(current, { scrollToStory: false });

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
