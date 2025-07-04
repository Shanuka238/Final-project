// Stripe payment intent endpoint
const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);

// Create payment intent
app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'lkr', metadata = {} } = req.body;
    // Stripe expects amount in the smallest currency unit (cents)
    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), // amount should be in LKR cents
      currency,
      metadata,
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
