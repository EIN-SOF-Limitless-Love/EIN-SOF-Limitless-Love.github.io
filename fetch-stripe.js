const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);
const fs = require('fs');

async function update() {
    const links = await stripe.paymentLinks.list({ active: true });
    const data = {};

    for (const link of links.data) {
        const lineItems = await stripe.paymentLinks.listLineItems(link.id);
        const price = await stripe.prices.retrieve(lineItems.data[0].price.id, { expand: ['product'] });
        const product = price.product;

        const description = product.description || price.nickname || link.metadata?.description || '';

        data[product.name] = {
            url: link.url,
            image: product.images[0] || '',
            price: price.unit_amount / 100,
            currency: price.currency,
            description: description
        };
    }

    fs.writeFileSync('data.json', JSON.stringify(data));
}
update();