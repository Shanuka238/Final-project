import React, { useState } from 'react';
import StripeCheckout from 'components/StripeCheckout';

const PaymentModal = ({ open, amount, onSuccess, onClose }) => {
  const [success, setSuccess] = useState(false);
  if (!open) return null;
  const handleSuccess = (paymentIntent) => {
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onSuccess(paymentIntent);
    }, 1500);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center animate-fade-in">
        {success ? (
          <div className="flex flex-col items-center justify-center min-h-[200px]">
            <div className="text-success mb-4">
              <svg width="48" height="48" fill="none" viewBox="0 0 24 24">
                <circle
                  cx="12"
                  cy="12"
                  r="10"
                  fill="#22c55e"
                  opacity="0.15"
                />
                <path
                  d="M7 13l3 3 7-7"
                  stroke="#22c55e"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-success mb-2">
              Payment Successful
            </h3>
          </div>
        ) : (
          <>
            <h3 className="text-xl font-bold mb-4 text-primary">Pay Booking</h3>
            <p className="mb-6 text-text-secondary">
              Enter your card details to pay for your booking.
            </p>
            <StripeCheckout amount={amount} onSuccess={handleSuccess} />
            <button
              className="mt-6 px-6 py-2 rounded-lg font-medium bg-gray-100 text-text-secondary hover:bg-gray-200 transition-colors duration-200"
              onClick={onClose}
            >
              Cancel
            </button>
          </>
        )}
      </div>
    </div>
  );
};

export default PaymentModal;
