const stripe = require('stripe')(process.env.STRIPE_SECRET_KEY);


app.post('/api/create-payment-intent', async (req, res) => {
  try {
    const { amount, currency = 'lkr', metadata = {} } = req.body;

    const paymentIntent = await stripe.paymentIntents.create({
      amount: Math.round(amount), 
      currency,
      metadata,
      automatic_payment_methods: { enabled: true },
    });
    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
