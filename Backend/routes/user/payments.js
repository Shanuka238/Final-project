const express = require('express');
const router = express.Router();
const paymentsController = require('../../controllers/user/paymentsController');

router.post('/create-payment-intent', paymentsController.createPaymentIntent);

module.exports = router;
