export function renderMenu(container, deus){
  container.innerHTML = '';
  const title = document.createElement('h2');
  title.textContent = deus.name;
  container.appendChild(title);

  const about = document.createElement('p');
  about.className = 'meta';
  about.textContent = deus.description;
  container.appendChild(about);

  // Dishes
  const dishesTitle = document.createElement('div');
  dishesTitle.className = 'section-title';
  dishesTitle.textContent = 'Pratos';
  container.appendChild(dishesTitle);

  deus.dishes.forEach(d => {
    const el = document.createElement('div');
    el.className = 'dish';
    el.innerHTML = `<div><strong>${d.name}</strong><div class="meta">${d.description}</div></div><div class="price">${d.price}</div>`;
    container.appendChild(el);
  });

  // Drinks
  const drinksTitle = document.createElement('div');
  drinksTitle.className = 'section-title';
  drinksTitle.textContent = 'Bebidas';
  container.appendChild(drinksTitle);

  deus.drinks.forEach(d => {
    const el = document.createElement('div');
    el.className = 'drink';
    el.innerHTML = `<div><strong>${d.name}</strong><div class="meta">${d.description}</div></div><div class="price">${d.price}</div>`;
    container.appendChild(el);
  });
}
