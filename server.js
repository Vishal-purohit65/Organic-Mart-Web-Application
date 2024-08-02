import express from 'express';
import dotenv from 'dotenv';
import stripe from 'stripe';

dotenv.config();

const app = express();
app.use(express.static("grocery"));
app.use(express.json());

// Index route
app.get("/", (req, res) => {
    res.sendFile("log-sign.html", { root: "grocery" });
});

// Success route
app.get("/success", (req, res) => {
    res.sendFile("sucess.html", { root: "grocery" });
});

// Cancel route
app.get("/cancel", (req, res) => {
    res.sendFile("cancel.html", { root: "grocery" });
});

// Stripe configuration
const stripeGateway = stripe(process.env.stripe_api);
const DOMAIN = process.env.DOMAIN;

// Handle the /stripe-checkout POST request
app.post('/stripe-checkout', async (req, res) => {
    const productsInCart = req.body.productsInCart; // Update property name

    if (!Array.isArray(productsInCart)) {
        return res.status(400).json({ error: 'Invalid data format' });
    }

    const lineItems = productsInCart.map((products) => {
        const unitAmount = parseInt(products.price.replace(/[^0-9.-]+/g, '') * 100);
        console.log('item-price:', products.price);
        console.log('unitAmount:', unitAmount);
        return {
            price_data: {
                currency: 'usd',
                product_data: {
                    name: products.name,
                    images: [`http://localhost:3000/images/${products.name}.png`]
                },
                unit_amount: unitAmount,
            },
            quantity: products.inCart,
        };
    });

    try {
        const session = await stripeGateway.checkout.sessions.create({
            payment_method_types: ['card'],
            mode: 'payment',
            success_url: `${DOMAIN}/success`,
            cancel_url: `${DOMAIN}/cancel`,
            line_items: lineItems,
            billing_address_collection: 'required'
        });
        res.json({ url: session.url });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'An error occurred during Stripe checkout.' });
    }
});

app.listen(3000, () => {
    console.log("Listening on port 3000...");
});
