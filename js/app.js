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

// --- Map modal / popup logic ---
// Uses the supplied Google Maps embed iframe markup. Creates a reusable modal when user clicks the "Localização" button.
const MAP_IFRAME_HTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d560591.7116941807!2d-42.678837012560614!3d-22.623603990963733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x978a8d5189a89f%3A0x995fe90e8a001e0d!2sSenac%20Nova%20Friburgo!5e0!3m2!1sen!2sbr!4v1774915580197!5m2!1sen!2sbr" title="Mapa — Localização exata" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;

function createMapModal(){
  // backdrop
  const backdrop = document.createElement('div');
  backdrop.className = 'map-modal__backdrop';
  backdrop.tabIndex = -1; // allow focus

  // dialog
  const dialog = document.createElement('div');
  dialog.className = 'map-modal__dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Mapa de localização');

  // header
  const header = document.createElement('div');
  header.className = 'map-modal__header';
  const title = document.createElement('h3');
  title.className = 'map-modal__title';
  title.textContent = 'Localização';
  const closeBtn = document.createElement('button');
  closeBtn.className = 'map-modal__close';
  closeBtn.type = 'button';
  closeBtn.innerHTML = 'Fechar';
  closeBtn.addEventListener('click', () => closeMapModal(backdrop));

  header.appendChild(title);
  header.appendChild(closeBtn);

  // body with iframe wrapper
  const body = document.createElement('div');
  body.className = 'map-modal__body';
  // insert the iframe HTML provided by the user
  body.innerHTML = MAP_IFRAME_HTML;
  const iframe = body.querySelector('iframe');
  if(iframe){
    iframe.className = 'map-modal__iframe';
    // ensure accessible title already set in the provided iframe markup
  }

  dialog.appendChild(header);
  dialog.appendChild(body);
  backdrop.appendChild(dialog);

  // click outside to close
  backdrop.addEventListener('click', (ev) => {
    if(ev.target === backdrop){
      closeMapModal(backdrop);
    }
  });

  // key listener for Esc while modal open
  function onKey(e){
    if(e.key === 'Escape') closeMapModal(backdrop);
  }

  // store listener on node for cleanup
  backdrop._onKey = onKey;

  return backdrop;
}

function openMapModal(triggerButton){
  // build modal
  const modal = createMapModal();
  document.body.appendChild(modal);

  // focus management
  const closeBtn = modal.querySelector('.map-modal__close');
  const previouslyFocused = document.activeElement;
  // small delay to ensure appended elements can receive focus
  setTimeout(()=> closeBtn.focus(), 30);

  // add global keydown listener
  window.addEventListener('keydown', modal._onKey);

  // store for return focus on close
  modal._previouslyFocused = previouslyFocused;

  // attach a small aria-hidden to main content so screen readers skip it
  const main = document.querySelector('main');
  if(main) main.setAttribute('aria-hidden', 'true');

  // store trigger to return focus later
  modal._trigger = triggerButton;
}

function closeMapModal(modal){
  if(!modal) return;
  // remove key listener
  if(modal._onKey) window.removeEventListener('keydown', modal._onKey);
  // restore aria-hidden
  const main = document.querySelector('main');
  if(main) main.removeAttribute('aria-hidden');
  // remove node
  modal.remove();
  // return focus
  const trigger = modal._trigger;
  if(trigger && typeof trigger.focus === 'function') trigger.focus();
}

// --- Hover popup for location (shows map when hovering/focusing the Location button) ---
function createMapPopup(){
  const wrapper = document.createElement('div');
  wrapper.className = 'map-popup';

  const panel = document.createElement('div');
  panel.className = 'map-popup__panel';

  const header = document.createElement('div');
  header.className = 'map-popup__header';
  const title = document.createElement('h4');
  title.className = 'map-popup__title';
  title.textContent = 'Localização';
  header.appendChild(title);

  const body = document.createElement('div');
  body.className = 'map-popup__body';
  // iframe will be inserted lazily into body when showing (to avoid unnecessary requests)

  panel.appendChild(header);
  panel.appendChild(body);
  wrapper.appendChild(panel);

  // keep popup interactive while hovered
  wrapper.addEventListener('mouseenter', () => {
    wrapper._isOver = true;
    if(wrapper._hideTimer){ clearTimeout(wrapper._hideTimer); wrapper._hideTimer = null; }
  });
  wrapper.addEventListener('mouseleave', () => {
    wrapper._isOver = false;
    // hide shortly after leaving
    wrapper._hideTimer = setTimeout(()=> hideMapPopup(wrapper), 220);
  });

  return wrapper;
}

function positionPopupNear(trigger, popup){
  const rect = trigger.getBoundingClientRect();
  const panel = popup.querySelector('.map-popup__panel');
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  // measure panel (may be not attached yet) — append offscreen to measure if needed
  if(!document.body.contains(popup)){
    popup.style.left = '-9999px';
    popup.style.top = '-9999px';
    document.body.appendChild(popup);
  }
  panel.style.maxWidth = `calc(100vw - 32px)`;
  const pw = panel.offsetWidth;
  const ph = panel.offsetHeight;

  // prefer above the trigger if there is space, otherwise below
  const spaceAbove = rect.top;
  const spaceBelow = vh - rect.bottom;
  let top;
  const margin = 8;
  if(spaceBelow >= ph + margin || spaceBelow >= spaceAbove){
    // place below
    top = rect.bottom + window.scrollY + margin;
  } else {
    // place above
    top = rect.top + window.scrollY - ph - margin;
  }

  // horizontal: center near trigger, clamp to viewport
  let left = rect.left + window.scrollX + (rect.width / 2) - (pw / 2);
  const minLeft = 8 + window.scrollX;
  const maxLeft = vw - pw - 8 + window.scrollX;
  left = Math.max(minLeft, Math.min(left, maxLeft));

  popup.style.left = `${Math.round(left)}px`;
  popup.style.top = `${Math.round(top)}px`;
}

function showMapPopup(trigger){
  if(!trigger) return;
  if(trigger._popup && document.body.contains(trigger._popup)){
    // already visible
    return;
  }

  const popup = trigger._popup || createMapPopup();
  trigger._popup = popup;

  // lazy-insert iframe on first show
  const body = popup.querySelector('.map-popup__body');
  if(!body.dataset.loaded){
    body.innerHTML = MAP_IFRAME_HTML;
    const iframe = body.querySelector('iframe');
    if(iframe) iframe.className = 'map-popup__iframe';
    body.dataset.loaded = '1';
  }

  document.body.appendChild(popup);
  positionPopupNear(trigger, popup);

  // ensure it hides when resizing/scrolling off-screen
  function onWindowChange(){
    if(!document.body.contains(popup)) return;
    positionPopupNear(trigger, popup);
  }
  popup._onWindow = onWindowChange;
  window.addEventListener('resize', onWindowChange);
  window.addEventListener('scroll', onWindowChange, { passive: true });

  // allow keyboard close (Escape)
  popup._onKey = (e) => { if(e.key === 'Escape') hideMapPopup(popup); };
  window.addEventListener('keydown', popup._onKey);
}

function hideMapPopup(popup){
  if(!popup) return;
  // clear timers
  if(popup._showTimer){ clearTimeout(popup._showTimer); popup._showTimer = null; }
  if(popup._hideTimer){ clearTimeout(popup._hideTimer); popup._hideTimer = null; }
  // remove listeners
  if(popup._onWindow) window.removeEventListener('resize', popup._onWindow);
  if(popup._onWindow) window.removeEventListener('scroll', popup._onWindow);
  if(popup._onKey) window.removeEventListener('keydown', popup._onKey);
  // remove DOM
  if(popup.parentNode) popup.parentNode.removeChild(popup);
}

function attachHoverTriggerToLocationButton(){
  const actionButtons = document.querySelectorAll('.actions .btn');
  let locButton = null;
  actionButtons.forEach(b => {
    if(b.textContent && b.textContent.trim().toLowerCase().includes('localiz')){
      locButton = b;
    }
  });
  if(!locButton) return;

  // show after a small delay to avoid flicker when moving mouse across
  locButton.addEventListener('mouseenter', () => {
    if(locButton._hideTimer){ clearTimeout(locButton._hideTimer); locButton._hideTimer = null; }
    locButton._showTimer = setTimeout(()=> showMapPopup(locButton), 180);
  });
  locButton.addEventListener('mouseleave', () => {
    if(locButton._showTimer){ clearTimeout(locButton._showTimer); locButton._showTimer = null; }
    // delay hide to allow entering the popup itself
    if(locButton._popup){ locButton._popup._hideTimer = setTimeout(()=> hideMapPopup(locButton._popup), 240); }
  });

  // keyboard accessibility: show on focus, hide on blur
  locButton.addEventListener('focus', () => {
    locButton._showTimer = setTimeout(()=> showMapPopup(locButton), 100);
  });
  locButton.addEventListener('blur', () => {
    if(locButton._showTimer){ clearTimeout(locButton._showTimer); locButton._showTimer = null; }
    if(locButton._popup){ hideMapPopup(locButton._popup); }
  });
}

// initialize hover trigger
attachHoverTriggerToLocationButton();
