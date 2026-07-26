const navToggle = document.getElementById('navToggle');
const navLinks = document.getElementById('navLinks');

navToggle.addEventListener('click', () => {
  const isOpen = navLinks.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', isOpen);
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    navToggle.setAttribute('aria-expanded', false);
  });
});

document.getElementById('footerYear').textContent = `© ${new Date().getFullYear()}`;

async function loadStripeLinks() {
  const res = await fetch('data.json');
  if (!res.ok) return;
  const data = await res.json();
  
  document.querySelectorAll('.card').forEach(card => {
    const title = card.querySelector('h3');
    if (title && data[title.textContent]) {
      const item = data[title.textContent];
      const slot = card.querySelector('.stripe-widget-slot');
      
      if (slot) {
        let content = '';
        if (item.image) {
          content += `<img src="${item.image}" alt="${title.textContent}" style="width: 140px; height: 140px; object-fit: cover; border-radius: 4px; margin: 0 auto 16px; display: block;">`;
        }
        content += `<a href="${item.url}" class="btn">Buy for ${item.price} ${item.currency.toUpperCase()}</a>`;
        slot.innerHTML = content;
      }
    }
  });
}

loadStripeLinks();