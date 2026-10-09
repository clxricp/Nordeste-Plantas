const menuButton = document.getElementById('menuButton');
const siteNav = document.getElementById('siteNav');
menuButton.addEventListener('click',()=>{const open=siteNav.classList.toggle('open');menuButton.setAttribute('aria-expanded',String(open));});
siteNav.querySelectorAll('a').forEach(a=>a.addEventListener('click',()=>{siteNav.classList.remove('open');menuButton.setAttribute('aria-expanded','false');}));

const filterButtons=[...document.querySelectorAll('.filter-btn')];
const productCards=[...document.querySelectorAll('.product-card')];
filterButtons.forEach(btn=>btn.addEventListener('click',()=>{
  filterButtons.forEach(b=>b.classList.remove('active'));
  btn.classList.add('active');
  const filter=btn.dataset.filter;
  productCards.forEach(card=>{
    const categories=card.dataset.category.split(' ');
    const show=filter==='all'||categories.includes(filter);
    if(show){card.classList.remove('hidden');requestAnimationFrame(()=>{card.style.opacity='1';card.style.transform='translateY(0)';});}
    else{card.style.opacity='0';card.style.transform='translateY(8px)';setTimeout(()=>card.classList.add('hidden'),180);}
  });
}));
