const PREVIEW_SELECTOR = '[data-dish-preview-src]';
const PREVIEW_MIN_MARGIN = 24;
const PREVIEW_OFFSET = 18;

function createPreviewElement(){
  const popup = document.createElement('div');
  popup.className = 'dish-preview';
  popup.setAttribute('aria-hidden', 'true');

  const panel = document.createElement('div');
  panel.className = 'dish-preview__panel';

  const img = document.createElement('img');
  img.className = 'dish-preview__image';
  img.alt = '';

  panel.appendChild(img);
  popup.appendChild(panel);
  document.body.appendChild(popup);

  return { popup, panel, img };
}

function positionPopup(popup, x, y){
  const margin = PREVIEW_MIN_MARGIN;
  const offset = PREVIEW_OFFSET;
  const maxLeft = window.innerWidth - popup.offsetWidth - margin;
  const maxTop = window.innerHeight - popup.offsetHeight - margin;

  let left = x + offset;
  let top = y + offset;

  if(left > maxLeft) left = Math.max(margin, x - popup.offsetWidth - offset);
  if(top > maxTop) top = Math.max(margin, y - popup.offsetHeight - offset);

  popup.style.left = `${left}px`;
  popup.style.top = `${top}px`;
}

function setPanelSizeFromImage(panel, img){
  const naturalWidth = img.naturalWidth || 1;
  const naturalHeight = img.naturalHeight || 1;

  const maxWidth = Math.max(180, Math.min(420, window.innerWidth - (PREVIEW_MIN_MARGIN * 2)));
  const maxHeight = Math.max(180, Math.min(540, window.innerHeight - (PREVIEW_MIN_MARGIN * 2)));
  const scale = Math.min(maxWidth / naturalWidth, maxHeight / naturalHeight);

  panel.style.width = `${Math.round(naturalWidth * scale)}px`;
  panel.style.height = `${Math.round(naturalHeight * scale)}px`;
}

export function initDishHoverPreview(container){
  if(!container) return;

  const { popup, panel, img } = createPreviewElement();
  let currentTarget = null;
  let pendingX = 0;
  let pendingY = 0;
  let loadId = 0;

  function hidePopup(){
    popup.classList.remove('is-visible');
    popup.setAttribute('aria-hidden', 'true');
    currentTarget = null;
    loadId += 1;
  }

  function showPopup(target, clientX, clientY){
    const src = target.dataset.dishPreviewSrc;
    if(!src) return;

    pendingX = clientX;
    pendingY = clientY;
    currentTarget = target;
    img.alt = target.textContent ? `Imagem de ${target.textContent}` : 'Imagem do prato';
    popup.classList.remove('is-visible');

    loadId += 1;
    const currentLoadId = loadId;

    img.onload = () => {
      if(currentLoadId !== loadId || currentTarget !== target) return;
      setPanelSizeFromImage(panel, img);
      popup.classList.add('is-visible');
      popup.setAttribute('aria-hidden', 'false');
      positionPopup(popup, pendingX, pendingY);
    };

    img.src = src;

    if(img.complete && img.naturalWidth > 0){
      img.onload();
    }
  }

  img.addEventListener('error', hidePopup);

  container.addEventListener('pointerenter', (event) => {
    const target = event.target.closest(PREVIEW_SELECTOR);
    if(!target || !container.contains(target)) return;
    showPopup(target, event.clientX, event.clientY);
  }, true);

  container.addEventListener('pointermove', (event) => {
    if(!currentTarget) return;
    pendingX = event.clientX;
    pendingY = event.clientY;
    positionPopup(popup, event.clientX, event.clientY);
  });

  container.addEventListener('pointerleave', (event) => {
    const target = event.target.closest(PREVIEW_SELECTOR);
    if(!target || target !== currentTarget) return;
    hidePopup();
  }, true);

  container.addEventListener('focusin', (event) => {
    const target = event.target.closest(PREVIEW_SELECTOR);
    if(!target || !container.contains(target)) return;

    const rect = target.getBoundingClientRect();
    showPopup(target, rect.right, rect.top + rect.height / 2);
  });

  container.addEventListener('focusout', (event) => {
    const target = event.target.closest(PREVIEW_SELECTOR);
    if(!target || target !== currentTarget) return;
    hidePopup();
  });
}
