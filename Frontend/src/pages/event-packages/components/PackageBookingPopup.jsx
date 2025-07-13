import React, { useState } from 'react';
import CenterPopup from 'components/CenterPopup';

const PackageBookingPopup = ({ pkg, onClose, onBook }) => {
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [guestCount, setGuestCount] = useState(1);
  // Parse price range from string like 'Rs 10,000 - Rs 20,000'
  let minPrice = 0, maxPrice = 0;
  if (pkg && pkg.priceRange) {
    const match = pkg.priceRange.match(/Rs\s*([\d,]+)\s*-\s*Rs\s*([\d,]+)/);
    if (match) {
      minPrice = parseInt(match[1].replace(/,/g, ''));
      maxPrice = parseInt(match[2].replace(/,/g, ''));
    }
  }
  const [budget, setBudget] = useState(minPrice || '');
  const [error, setError] = useState('');

  if (!pkg) return null;

  const handleBook = () => {
    if (!eventDate || !eventTime || !guestCount || !budget) {
      setError('Please fill all fields.');
      return;
    }
    if (budget < minPrice || budget > maxPrice) {
      setError(`Price must be between Rs ${minPrice.toLocaleString()} and Rs ${maxPrice.toLocaleString()}`);
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
              <label className="block mb-1 font-medium">Select Price</label>
              <input
                type="range"
                min={minPrice}
                max={maxPrice}
                step={100}
                value={budget}
                onChange={e => setBudget(Number(e.target.value))}
                className="w-full accent-primary"
              />
              <div className="flex justify-between text-xs text-text-secondary mt-1">
                <span>Rs {minPrice.toLocaleString()}</span>
                <span>Selected: <span className="font-bold text-primary">Rs {Number(budget).toLocaleString()}</span></span>
                <span>Rs {maxPrice.toLocaleString()}</span>
              </div>
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
