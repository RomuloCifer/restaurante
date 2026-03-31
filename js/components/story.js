export function renderStories(container, deuses){
  container.innerHTML = '';
  // create a vertical stack of story sections so user can scroll between them
  const wrapper = document.createElement('div');
  wrapper.className = 'story-wrap';

  deuses.forEach(deus => {
    const sec = document.createElement('section');
    sec.className = 'story-section';
    sec.dataset.id = deus.id;
    sec.style.padding = '12px 6px';
    sec.style.borderBottom = '1px solid rgba(11,37,69,0.03)';

    const title = document.createElement('h3');
    title.textContent = deus.name;
    sec.appendChild(title);

    // short description
    const short = document.createElement('p');
    short.className = 'meta';
    short.textContent = deus.description || '';
    sec.appendChild(short);

    // full story paragraphs
    if(Array.isArray(deus.story)){
      deus.story.forEach(p => {
        const pEl = document.createElement('p');
        pEl.textContent = p;
        sec.appendChild(pEl);
      });
    } else if(deus.story){
      const pEl = document.createElement('p');
      pEl.textContent = deus.story;
      sec.appendChild(pEl);
    }

    // placeholder gallery note
    const gallery = document.createElement('div');
    gallery.style.marginTop = '10px';
    gallery.innerHTML = `<em style="color:var(--muted)">Galeria e imagens de ${deus.name} podem ser adicionadas em /assets</em>`;
    sec.appendChild(gallery);

    wrapper.appendChild(sec);
  });

  container.appendChild(wrapper);
}
