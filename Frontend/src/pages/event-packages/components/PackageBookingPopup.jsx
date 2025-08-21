import React, { useState } from 'react';
import CenterPopup from 'components/CenterPopup';

const PackageBookingPopup = ({ pkg, onClose, onBook }) => {
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  const minPrice = pkg && pkg.price ? pkg.price : 0;
  const maxPrice = minPrice;
  const [budget, setBudget] = useState(minPrice || '');
  const [error, setError] = useState('');

  if (!pkg) return null;

  const handleBook = () => {
    if (!eventDate || !eventTime || !guestCount || !budget) {
      setError('Please fill all fields.');
      return;
    }
    setError('');
    onBook({ eventDate, eventTime, guestCount, budget });
  };

  return (
    <CenterPopup
      message={
        <div>
          <h2 className="font-heading text-xl font-semibold mb-4">Book Package: {pkg.title}</h2>
          <div className="space-y-4">
            <div>
              <label className="block mb-1 font-medium">Select Date</label>
              <input type="date" className="input-field w-full" value={eventDate} onChange={e => setEventDate(e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Select Time</label>
              <input type="time" className="input-field w-full" value={eventTime} onChange={e => setEventTime(e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Guest Count</label>
              <input type="number" min="1" className="input-field w-full" value={guestCount} onChange={e => setGuestCount(e.target.value)} />
            </div>
            <div>
              <label className="block mb-1 font-medium">Price</label>
              <div className="font-bold text-primary text-lg">{minPrice ? `Rs ${minPrice.toLocaleString()}` : 'N/A'}</div>
            </div>
            {error && <div className="text-error text-sm">{error}</div>}
          </div>
        </div>
      }
      onClose={onClose}
      confirm={true}
      onConfirm={handleBook}
      onCancel={onClose}
    />
  );
};

export default PackageBookingPopup;
