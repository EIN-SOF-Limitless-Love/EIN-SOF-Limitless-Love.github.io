const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fs = require('fs');

async function update() {
    const links = await stripe.paymentLinks.list({ active: true, expand: ['data.line_items.data.price'] });
    const data = {};

    for (const link of links.data) {
        if (!link.line_items || !link.line_items.data.length) continue;
        const lineItem = link.line_items.data[0];
        const price = lineItem.price;
        const product = await stripe.products.retrieve(price.product);

        if (!product || !product.name) continue;

        data[product.name] = {
            url: link.url,
            image: product.images && product.images[0] ? product.images[0] : '',
            price: price.unit_amount / 100,
            currency: price.currency,
            description: product.description || ''
        };
    }

    fs.writeFileSync('data.json', JSON.stringify(data));
}

update();