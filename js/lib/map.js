// Map modal & popup logic separated from app.js

export const MAP_IFRAME_HTML = `<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d560591.7116941807!2d-42.678837012560614!3d-22.623603990963733!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x978a8d5189a89f%3A0x995fe90e8a001e0d!2sSenac%20Nova%20Friburgo!5e0!3m2!1sen!2sbr!4v1774915580197!5m2!1sen!2sbr" title="Mapa — Localização exata" loading="lazy" referrerpolicy="no-referrer-when-downgrade" allowfullscreen></iframe>`;

export function createMapModal(){
  const backdrop = document.createElement('div');
  backdrop.className = 'map-modal__backdrop';
  backdrop.tabIndex = -1;

  const dialog = document.createElement('div');
  dialog.className = 'map-modal__dialog';
  dialog.setAttribute('role', 'dialog');
  dialog.setAttribute('aria-modal', 'true');
  dialog.setAttribute('aria-label', 'Mapa de localização');

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

  const body = document.createElement('div');
  body.className = 'map-modal__body';
  body.innerHTML = MAP_IFRAME_HTML;
  const iframe = body.querySelector('iframe');
  if(iframe) iframe.className = 'map-modal__iframe';

  dialog.appendChild(header);
  dialog.appendChild(body);
  backdrop.appendChild(dialog);

  backdrop.addEventListener('click', (ev) => {
    if(ev.target === backdrop){ closeMapModal(backdrop); }
  });

  function onKey(e){ if(e.key === 'Escape') closeMapModal(backdrop); }
  backdrop._onKey = onKey;

  return backdrop;
}

export function openMapModal(triggerButton){
  const modal = createMapModal();
  document.body.appendChild(modal);
  const closeBtn = modal.querySelector('.map-modal__close');
  const previouslyFocused = document.activeElement;
  setTimeout(()=> closeBtn.focus(), 30);
  window.addEventListener('keydown', modal._onKey);
  modal._previouslyFocused = previouslyFocused;
  const main = document.querySelector('main');
  if(main) main.setAttribute('aria-hidden', 'true');
  modal._trigger = triggerButton;
}

export function closeMapModal(modal){
  if(!modal) return;
  if(modal._onKey) window.removeEventListener('keydown', modal._onKey);
  const main = document.querySelector('main');
  if(main) main.removeAttribute('aria-hidden');
  modal.remove();
  const trigger = modal._trigger;
  if(trigger && typeof trigger.focus === 'function') trigger.focus();
}

export function createMapPopup(){
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
  panel.appendChild(header);
  panel.appendChild(body);
  wrapper.appendChild(panel);

  wrapper.addEventListener('mouseenter', () => {
    wrapper._isOver = true;
    if(wrapper._hideTimer){ clearTimeout(wrapper._hideTimer); wrapper._hideTimer = null; }
  });
  wrapper.addEventListener('mouseleave', () => {
    wrapper._isOver = false;
    wrapper._hideTimer = setTimeout(()=> hideMapPopup(wrapper), 220);
  });

  return wrapper;
}

export function positionPopupNear(trigger, popup){
  const rect = trigger.getBoundingClientRect();
  const panel = popup.querySelector('.map-popup__panel');
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0);
  if(!document.body.contains(popup)){
    popup.style.left = '-9999px'; popup.style.top = '-9999px'; document.body.appendChild(popup);
  }
  panel.style.maxWidth = `calc(100vw - 32px)`;
  const pw = panel.offsetWidth;
  const ph = panel.offsetHeight;
  const spaceAbove = rect.top;
  const spaceBelow = vh - rect.bottom;
  let top;
  const margin = 8;
  if(spaceBelow >= ph + margin || spaceBelow >= spaceAbove){ top = rect.bottom + window.scrollY + margin; } else { top = rect.top + window.scrollY - ph - margin; }
  let left = rect.left + window.scrollX + (rect.width / 2) - (pw / 2);
  const minLeft = 8 + window.scrollX;
  const maxLeft = vw - pw - 8 + window.scrollX;
  left = Math.max(minLeft, Math.min(left, maxLeft));
  popup.style.left = `${Math.round(left)}px`;
  popup.style.top = `${Math.round(top)}px`;
}

export function showMapPopup(trigger){
  if(!trigger) return;
  if(trigger._popup && document.body.contains(trigger._popup)) return;
  const popup = trigger._popup || createMapPopup();
  trigger._popup = popup;
  const body = popup.querySelector('.map-popup__body');
  if(!body.dataset.loaded){ body.innerHTML = MAP_IFRAME_HTML; const iframe = body.querySelector('iframe'); if(iframe) iframe.className = 'map-popup__iframe'; body.dataset.loaded = '1'; }
  document.body.appendChild(popup);
  positionPopupNear(trigger, popup);
  function onWindowChange(){ if(!document.body.contains(popup)) return; positionPopupNear(trigger, popup); }
  popup._onWindow = onWindowChange;
  window.addEventListener('resize', onWindowChange);
  window.addEventListener('scroll', onWindowChange, { passive: true });
  popup._onKey = (e) => { if(e.key === 'Escape') hideMapPopup(popup); };
  window.addEventListener('keydown', popup._onKey);
}

export function hideMapPopup(popup){
  if(!popup) return;
  if(popup._showTimer){ clearTimeout(popup._showTimer); popup._showTimer = null; }
  if(popup._hideTimer){ clearTimeout(popup._hideTimer); popup._hideTimer = null; }
  if(popup._onWindow) window.removeEventListener('resize', popup._onWindow);
  if(popup._onWindow) window.removeEventListener('scroll', popup._onWindow);
  if(popup._onKey) window.removeEventListener('keydown', popup._onKey);
  if(popup.parentNode) popup.parentNode.removeChild(popup);
}

export function attachHoverTriggerToLocationButton(){
  const locButton = document.querySelector('[data-action="location"]');
  if(!locButton) return;
  locButton.addEventListener('click', () => {
    if(locButton._showTimer){ clearTimeout(locButton._showTimer); locButton._showTimer = null; }
    if(locButton._hideTimer){ clearTimeout(locButton._hideTimer); locButton._hideTimer = null; }
    if(locButton._popup){ hideMapPopup(locButton._popup); }
    openMapModal(locButton);
  });
  locButton.addEventListener('mouseenter', () => { if(locButton._hideTimer){ clearTimeout(locButton._hideTimer); locButton._hideTimer = null; } locButton._showTimer = setTimeout(()=> showMapPopup(locButton), 180); });
  locButton.addEventListener('mouseleave', () => { if(locButton._showTimer){ clearTimeout(locButton._showTimer); locButton._showTimer = null; } if(locButton._popup){ locButton._popup._hideTimer = setTimeout(()=> hideMapPopup(locButton._popup), 240); } });
  locButton.addEventListener('focus', () => { locButton._showTimer = setTimeout(()=> showMapPopup(locButton), 100); });
  locButton.addEventListener('blur', () => { if(locButton._showTimer){ clearTimeout(locButton._showTimer); locButton._showTimer = null; } if(locButton._popup){ hideMapPopup(locButton._popup); } });
}

export default { MAP_IFRAME_HTML, createMapModal, openMapModal, closeMapModal, createMapPopup, showMapPopup, hideMapPopup, attachHoverTriggerToLocationButton };
