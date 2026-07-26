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
  
  const container = document.getElementById('stripe-products');
  if (!container) return;

  let html = '';
  
  for (const [name, item] of Object.entries(data)) {
    let imgHtml = '';
    if (item.image) {
      imgHtml = `<img src="${item.image}" alt="${name}" style="width: 100%; height: 230px; object-fit: cover; border-radius: 4px; margin: 12px 0; display: block;">`;
    }
    
    const desc = item.description ? item.description : 'One of one';
    
    html += `
      <article class="card card-live" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div>
          <h3>${name}</h3>
          <p class="card-meta" style="margin-bottom: 0; min-height: 40px; display: flex; align-items: center; justify-content: center;">${desc}</p>
          ${imgHtml}
        </div>
        <div class="stripe-widget-slot" style="margin-top: auto;">
          <a href="${item.url}" class="btn btn-gold" style="width: 100%; margin-top: 0;">Buy for ${item.price} ${item.currency.toUpperCase()}</a>
        </div>
      </article>
    `;
  }
  
  container.innerHTML = html;
}

loadStripeLinks();