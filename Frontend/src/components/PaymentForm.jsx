import React, { useState } from 'react';
import { useStripe, useElements } from '@stripe/react-stripe-js';
import axios from 'axios';

const PaymentForm = ({ amount, onSuccess }) => {
  const stripe = useStripe();
  const elements = useElements();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [payAmount, setPayAmount] = useState(amount);
  const [duePreview, setDuePreview] = useState(amount);
  const [cardNumber, setCardNumber] = useState('');
  const [expMonth, setExpMonth] = useState('');
  const [expYear, setExpYear] = useState('');
  const [cvc, setCvc] = useState('');

  const handlePayAmountChange = (val) => {
    const value = Number(val);
    setPayAmount(value);
    setDuePreview(amount - value >= 0 ? amount - value : amount);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    if (payAmount < 1 || payAmount > amount) {
      setError('Please enter a valid amount to pay.');
      setLoading(false);
      return;
    }

    setTimeout(() => {
      onSuccess && onSuccess({ id: 'fake_payment_intent', status: 'succeeded', amount: payAmount });
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium mb-2">Amount to Pay (Rs)</label>
        <input
          type="number"
          min={1}
          max={amount}
          value={payAmount}
          onChange={e => handlePayAmountChange(e.target.value)}
          className="input-field w-full"
          required
        />
        <div className="mt-2 text-sm text-text-secondary">
          {payAmount < amount
            ? <>After payment, <span className="font-semibold text-warning">Due: Rs {(duePreview).toLocaleString('en-LK')}</span></>
            : <>After payment, <span className="font-semibold text-success">No due. Booking fully paid.</span></>}
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4">
        <div>
          <label className="block text-sm font-medium mb-2">Card Number</label>
          <input
            type="text"
            value={cardNumber}
            onChange={e => setCardNumber(e.target.value)}
            className="input-field w-full"
            placeholder="1234 5678 9012 3456"
            maxLength={19}
            required
          />
        </div>
        <div className="flex gap-4">
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Exp. Month</label>
            <input
              type="text"
              value={expMonth}
              onChange={e => setExpMonth(e.target.value)}
              className="input-field w-full"
              placeholder="MM"
              maxLength={2}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">Exp. Year</label>
            <input
              type="text"
              value={expYear}
              onChange={e => setExpYear(e.target.value)}
              className="input-field w-full"
              placeholder="YY"
              maxLength={2}
              required
            />
          </div>
          <div className="flex-1">
            <label className="block text-sm font-medium mb-2">CVC</label>
            <input
              type="text"
              value={cvc}
              onChange={e => setCvc(e.target.value)}
              className="input-field w-full"
              placeholder="CVC"
              maxLength={4}
              required
            />
          </div>
        </div>
      </div>
      {error && <div className="text-error text-sm">{error}</div>}
      <button
        type="submit"
        className="btn-primary w-full py-3 rounded-lg font-medium"
        disabled={loading || payAmount < 1 || payAmount > amount}
      >
        {loading ? 'Processing...' : `Pay Rs ${payAmount?.toLocaleString('en-LK')}`}
      </button>
    </form>
  );
};

export default PaymentForm;
