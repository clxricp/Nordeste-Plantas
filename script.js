const menuButton = document.getElementById("menuButton");
const siteNav = document.getElementById("siteNav");

menuButton.addEventListener("click", () => {
  const open = siteNav.classList.toggle("open");
  menuButton.setAttribute("aria-expanded", String(open));
});

const plantDialog = document.getElementById('plantDialog');
const dialogTitle = document.getElementById('plantDialogTitle');
const dialogCategory = document.getElementById('plantDialogCategory');
const dialogImage = document.getElementById('plantDialogImage');
const dialogQuote = document.getElementById('plantDialogQuote');

document.querySelectorAll('.product-details').forEach(button => {
  button.addEventListener('click', () => {
    const card = button.closest('.product-card');
    const name = card.querySelector('h3').textContent;
    dialogTitle.textContent = name;
    dialogCategory.textContent = card.dataset.categoryLabel;
    const image = card.querySelector('.product-photo img');
    dialogImage.src = image.getAttribute('src');
    dialogImage.alt = image.alt;
    dialogQuote.href = 'https://wa.me/5585981486355?text=' + encodeURIComponent(
      `Olá! Gostaria de um orçamento para ${name}. Podem me enviar fotos atuais e informar os portes disponíveis?`
    );
    plantDialog.showModal();
    document.body.classList.add('dialog-open');
  });
});

plantDialog.querySelector('.dialog-close').addEventListener('click', () => plantDialog.close());
plantDialog.addEventListener('click', event => {
  const bounds = plantDialog.getBoundingClientRect();
  if (event.target === plantDialog &&
      (event.clientX < bounds.left || event.clientX > bounds.right ||
       event.clientY < bounds.top || event.clientY > bounds.bottom)) {
    plantDialog.close();
  }
});
plantDialog.addEventListener('close', () => document.body.classList.remove('dialog-open'));

siteNav.querySelectorAll("a").forEach(link => {
  link.addEventListener("click", () => {
    siteNav.classList.remove("open");
    menuButton.setAttribute("aria-expanded", "false");
  });
});

// Atualização imediata evita conflitos ao trocar rapidamente de categoria.
const filterButtons = [...document.querySelectorAll('.filter-btn')];
const productCards = [...document.querySelectorAll('.product-card')];
function selectPlantCategory(filter) {
  filterButtons.forEach(button => {
    const selected = button.dataset.filter === filter;
    button.classList.toggle('active', selected);
    button.setAttribute('aria-pressed', String(selected));
  });
  productCards.forEach(card => {
    card.hidden = filter !== 'all' && !card.dataset.category.split(' ').includes(filter);
  });
}

filterButtons.forEach(button => {
  button.addEventListener('click', () => selectPlantCategory(button.dataset.filter));
});

document.getElementById('viewFruitPlants').addEventListener('click', event => {
  event.preventDefault();
  selectPlantCategory('frutiferas');
  requestAnimationFrame(() => {
    document.getElementById('plantFilters').scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
