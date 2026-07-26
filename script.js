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

function truncate(text, max) {
  return text.length > max ? text.slice(0, max).trim() + '…' : text;
}

async function loadStripeLinks() {
  const res = await fetch('data.json');
  if (!res.ok) return;
  const data = await res.json();
  
  const container = document.getElementById('stripe-products');
  if (!container) return;

  let html = '';

  for (const [name, item] of Object.entries(data)) {
    const imgHtml = item.image ? `<img src="${item.image}" alt="${name}">` : '';
    const desc = item.description ? truncate(item.description, 150) : 'One of one';

    html += `
      <article class="card card-live">
        <div class="card-section-top">
          <div class="card-section-title">
            <h3>${name}</h3>
          </div>
          <div class="card-section-image">
            ${imgHtml}
          </div>
          <div class="card-section-desc">
            <p class="card-meta">${desc}</p>
          </div>
        </div>
        <div class="card-section-buy">
          <a href="${item.url}" class="btn btn-gold btn-buy">Buy for ${item.price} ${item.currency.toUpperCase()}</a>
        </div>
      </article>
    `;
  }
  
  container.innerHTML = html;
}

loadStripeLinks();