import React from 'react';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import PaymentForm from './PaymentForm';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLISHABLE_KEY);

const StripeCheckout = ({ amount, onSuccess }) => {
  return (
    <Elements stripe={stripePromise}>
      <PaymentForm amount={amount} onSuccess={onSuccess} />
    </Elements>
  );
};

export default StripeCheckout;
