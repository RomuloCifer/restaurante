export function renderStories(container, deuses){
  container.innerHTML = '';
  // create a vertical stack of story sections so user can scroll between them
  const wrapper = document.createElement('div');
  wrapper.className = 'story-wrap';

  deuses.forEach(deus => {
    const sec = document.createElement('section');
    sec.className = 'story-section';
    sec.dataset.id = deus.id;

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


    wrapper.appendChild(sec);
  });

  container.appendChild(wrapper);
}
