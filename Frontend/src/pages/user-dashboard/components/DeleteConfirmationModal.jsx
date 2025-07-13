import React from 'react';

const DeleteConfirmationModal = ({ open, onConfirm, onCancel }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
      <div className="bg-white rounded-xl shadow-xl p-8 max-w-sm w-full text-center animate-fade-in">
        <h3 className="text-xl font-bold mb-4 text-error">Delete Booking?</h3>
        <p className="mb-6 text-text-secondary">Are you sure you want to delete this booking? This action cannot be undone.</p>
        <div className="flex justify-center gap-4">
          <button
            className="px-6 py-2 rounded-lg font-medium bg-error text-white hover:bg-error-700 transition-colors duration-200"
            onClick={onConfirm}
          >
            Yes, Delete
          </button>
          <button
            className="px-6 py-2 rounded-lg font-medium bg-gray-100 text-text-secondary hover:bg-gray-200 transition-colors duration-200"
            onClick={onCancel}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteConfirmationModal;
