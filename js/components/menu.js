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
    const info = document.createElement('div');
    const name = document.createElement('strong');
    name.textContent = d.name;
    const desc = document.createElement('div');
    desc.className = 'meta';
    desc.textContent = d.description;
    info.appendChild(name);
    info.appendChild(desc);
    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = d.price;
    el.appendChild(info);
    el.appendChild(price);
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
    const info = document.createElement('div');
    const name = document.createElement('strong');
    name.textContent = d.name;
    const desc = document.createElement('div');
    desc.className = 'meta';
    desc.textContent = d.description;
    info.appendChild(name);
    info.appendChild(desc);
    const price = document.createElement('div');
    price.className = 'price';
    price.textContent = d.price;
    el.appendChild(info);
    el.appendChild(price);
    container.appendChild(el);
  });
}
