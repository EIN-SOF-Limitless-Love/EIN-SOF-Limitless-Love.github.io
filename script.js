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
      imgHtml = `<div style="height: 250px; display: flex; align-items: center; justify-content: center; background: #000; border-radius: 4px; margin-bottom: 16px; overflow: hidden;"><img src="${item.image}" alt="${name}" style="max-width: 100%; max-height: 100%; width: auto; height: auto; object-fit: contain; display: block;"></div>`;
    }
    
    const desc = item.description ? item.description : 'One of one';
    
    html += `
      <article class="card card-live" style="display: flex; flex-direction: column; justify-content: space-between;">
        <div class="card-section-top">
          <div class="card-section-title">
            <h3>${name}</h3>
          </div>
          <div class="card-section-image">
            ${imgHtml}
          </div>
          <div class="card-section-desc" style="height: 56px; overflow: hidden; margin-bottom: 20px; display: flex; align-items: center; justify-content: center; text-align: center;">
            <p class="card-meta" style="margin: 0; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden;">${desc}</p>
          </div>
        </div>
        <div class="card-section-buy stripe-widget-slot" style="margin-top: auto;">
          <a href="${item.url}" class="btn btn-gold" style="width: 100%; margin-top: 0;">Buy for ${item.price} ${item.currency.toUpperCase()}</a>
        </div>
      </article>
    `;
  }
  
  container.innerHTML = html;
}

loadStripeLinks();