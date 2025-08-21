import React, { useEffect, useRef, useState } from 'react';

const CenterPopup = ({ message, onClose, confirm, onConfirm, onCancel }) => {
  const [visible, setVisible] = useState(false);
  const [shouldRender, setShouldRender] = useState(!!message);
  const timeoutRef = useRef();

  useEffect(() => {
    if (message) {
      setShouldRender(true);
      setTimeout(() => setVisible(true), 10); 
    } else if (shouldRender) {
      setVisible(false);
      timeoutRef.current = setTimeout(() => setShouldRender(false), 300); 
    }
    return () => clearTimeout(timeoutRef.current);
  }, [message]);

  if (!shouldRender) return null;

  return (
    <div className={`fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-40 transition-opacity duration-300 ${visible ? 'opacity-100' : 'opacity-0'}`}>
      <div className={`bg-white rounded-lg shadow-lg p-6 min-w-[300px] text-center transition-transform duration-300 ${visible ? 'scale-100' : 'scale-95'}`}>
        <div className="mb-4 text-lg">{message}</div>
        {confirm ? (
          <div className="flex justify-center gap-4">
            <button
              onClick={() => {
                setVisible(false);
                setTimeout(() => onCancel && onCancel(), 300);
              }}
              className="btn-secondary px-4 py-2"
            >
              No
            </button>
            <button
              onClick={() => {
                setVisible(false);
                setTimeout(() => onConfirm && onConfirm(), 300);
              }}
              className="btn-primary px-4 py-2"
            >
              Yes
            </button>
          </div>
        ) : (
          <button
            onClick={() => {
              setVisible(false);
              setTimeout(onClose, 300);
            }}
            className="btn-primary px-4 py-2"
          >
            OK
          </button>
        )}
      </div>
    </div>
  );
};

export default CenterPopup;
