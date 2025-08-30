import React, { useState } from 'react';
import Icon from 'components/AppIcon';
import Image from 'components/AppImage';
import PaymentModal from './PaymentModal';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import { payUserPackage, deleteUserPackage, submitPackageReview } from 'api/dashboard';

const formatCurrency = (amount) => `Rs ${Number(amount || 0).toLocaleString('en-LK')}`;

const PackageManagement = ({ packages: initialPackages }) => {
  const [packages, setPackages] = useState(initialPackages);
  const [reviewModal, setReviewModal] = useState({ open: false, pkg: null });
  const handleReviewSubmit = async ({ review, rating, packageId }) => {
    if (!review || !rating || !review.trim()) return;
    try {
      await submitPackageReview(packageId, review, rating);
      setReviewModal({ open: false, pkg: null });
    } catch (err) {
      alert('Failed to submit review.');
    }
  };
  const [paymentModal, setPaymentModal] = useState({ open: false, pkg: null });
  const [deleteModal, setDeleteModal] = useState({ open: false, pkgId: null });

  const handleOpenPayment = (pkg) => setPaymentModal({ open: true, pkg });
  const handleClosePayment = () => setPaymentModal({ open: false, pkg: null });
  const handlePaymentSuccess = async (paymentIntent) => {
    const pkg = paymentModal.pkg;
    const payAmount = paymentIntent.amount;
    try {
      const updatedPkg = await payUserPackage(pkg._id || pkg.id, payAmount, paymentIntent.id);
      setPackages(prev => prev.map(p => (p._id === pkg._id ? updatedPkg : p)));
    } catch (err) {
      alert('Failed to update payment.');
    }
    handleClosePayment();
  };

  const handleDelete = (pkgId) => setDeleteModal({ open: true, pkgId });
  const handleCancelDelete = () => setDeleteModal({ open: false, pkgId: null });
  const handleConfirmDelete = async () => {
    const pkgId = deleteModal.pkgId;
    setDeleteModal({ open: false, pkgId: null });
    try {
      await deleteUserPackage(pkgId);
      setPackages(prev => prev.filter(p => (p._id || p.id) !== pkgId));
    } catch (err) {
      alert('Failed to delete package booking.');
    }
  };

  return (
    <div className="space-y-6">
      {packages.map((pkg) => {
        const paidAmount = Number(pkg.paidAmount || 0);
        const dueAmount = Math.max(Number(pkg.price) - paidAmount, 0);
        return (
          <div key={pkg._id || pkg.id} className="card">
            <div className="flex justify-between items-center mb-2">
              <div className="flex items-center space-x-3 mb-2">
                {pkg.image && (
                  <div className="h-20 w-20 rounded overflow-hidden mr-4">
                    <Image src={pkg.image} alt={pkg.packageTitle || pkg.title} className="w-full h-full object-cover" />
                  </div>
                )}
                <div>
                  <h4 className="font-heading text-lg font-semibold text-text-primary">
                    {pkg.packageTitle || pkg.title}
                  </h4>
                  <div className="flex items-center space-x-4 text-sm text-text-secondary">
                    <span>Package ID: {pkg.packageId}</span>
                    <span>Date: {pkg.eventDate}</span>
                    <span>Guests: {pkg.guestCount}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <span className={`px-3 py-1 rounded-full text-xs font-medium border ${pkg.status === 'paid' ? 'text-success bg-success-50 border-success-200' : pkg.status === 'partial' ? 'text-warning bg-warning-50 border-warning-200' : 'text-text-secondary bg-gray-50 border-gray-200'}`}>
                  {pkg.status === 'partial' ? 'PARTIAL' : (pkg.status?.replace('_', ' ').toUpperCase() || 'BOOKED')}
                </span>
                <button
                  className="ml-2 flex items-center gap-1 text-purple-500 hover:text-purple-600 focus:outline-none bg-transparent shadow-none px-0 py-0 text-sm"
                  style={{ background: 'none', boxShadow: 'none' }}
                  onClick={() => setReviewModal({ open: true, pkg })}
                >
                  <Icon name="Star" size={16} /> Add Review
                </button>
              </div>
            </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 xl:col-span-2 min-w-0 xl:min-w-[480px]">
              <h5 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="CreditCard" size={18} strokeWidth={2} />
                <span>Payment</span>
              </h5>
              <div className="bg-surface-secondary rounded-lg p-4 mb-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <p className="text-2xl font-bold text-text-primary">
                      {formatCurrency(pkg.price)}
                    </p>
                    <p className="text-xs text-text-secondary">Total Amount</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-success">
                      {formatCurrency(paidAmount)}
                    </p>
                    <p className="text-xs text-text-secondary">Paid</p>
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-danger">
                      {formatCurrency(dueAmount)}
                    </p>
                    <p className="text-xs text-text-secondary">Due</p>
                  </div>
                </div>
              </div>
              <div className="flex gap-2 mt-2">
                {dueAmount > 0 && (
                  <button
                    className="btn-primary flex items-center gap-1 px-4 py-2 rounded"
                    onClick={() => handleOpenPayment(pkg)}
                  >
                    <Icon name="CreditCard" size={16} /> Pay
                  </button>
                )}
                <button
                  className={`btn-danger flex items-center gap-1 px-4 py-2 rounded ${paidAmount > 0 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                  onClick={() => handleDelete(pkg._id || pkg.id)}
                  disabled={paidAmount > 0}
                >
                  <Icon name="Trash" size={16} /> Delete
                </button>
              </div>
            </div>
            <div className="lg:col-span-1">
              <h5 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
                <Icon name="Info" size={18} strokeWidth={2} />
                <span>Package Details</span>
              </h5>
              <div className="space-y-2 text-sm text-text-secondary">
                <div><span className="font-medium">Title:</span> {pkg.packageTitle || pkg.title}</div>
                <div><span className="font-medium">Date:</span> {pkg.eventDate}</div>
                <div><span className="font-medium">Time:</span> {pkg.eventTime}</div>
                <div><span className="font-medium">Guests:</span> {pkg.guestCount}</div>
                <div><span className="font-medium">Price:</span> {formatCurrency(pkg.price)}</div>
                <div><span className="font-medium">Status:</span> {pkg.status || 'Booked'}</div>
              </div>
            </div>
          </div>
        </div>
        );
      })}
      <PackageReviewModal
        open={reviewModal.open}
        pkg={reviewModal.pkg}
        onSubmit={handleReviewSubmit}
        onClose={() => setReviewModal({ open: false, pkg: null })}
      />
      <PaymentModal
        open={paymentModal.open}
        amount={paymentModal.pkg ? Math.max(Number(paymentModal.pkg.price) - Number(paymentModal.pkg.paidAmount || 0), 0) : 0}
        onSuccess={handlePaymentSuccess}
        onClose={handleClosePayment}
      />
      <DeleteConfirmationModal
        open={deleteModal.open}
        onConfirm={handleConfirmDelete}
        onCancel={handleCancelDelete}
      />
    </div>
  );
};

const PackageReviewModal = ({ open, pkg, onSubmit, onClose }) => {
  const [review, setReview] = React.useState('');
  const [rating, setRating] = React.useState(5);
  const [saving, setSaving] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  if (!open) return null;
  const handleSubmit = async () => {
    setSaving(true);
    await onSubmit({ review, rating, packageId: pkg._id || pkg.id });
    setSaving(false);
    setSuccess(true);
    setTimeout(() => {
      setSuccess(false);
      onClose();
    }, 1500);
  };
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-lg p-6 w-full max-w-md shadow-lg relative">
        {saving && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-80 z-10">
            <span className="text-lg font-semibold text-primary">Saving...</span>
          </div>
        )}
        {success && (
          <div className="absolute inset-0 flex items-center justify-center bg-white bg-opacity-90 z-20">
            <span className="text-lg font-semibold text-success">Review sent!</span>
          </div>
        )}
        <h3 className="font-heading text-lg font-semibold mb-4">Add Review for {pkg?.packageTitle || pkg?.title}</h3>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Rating:</label>
          <select value={rating} onChange={e => setRating(Number(e.target.value))} className="w-full border rounded px-2 py-1">
            {[5,4,3,2,1].map(r => <option key={r} value={r}>{r} Star{r > 1 ? 's' : ''}</option>)}
          </select>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-1">Review:</label>
          <textarea value={review} onChange={e => setReview(e.target.value)} rows={4} className="w-full border rounded px-2 py-1" placeholder="Write your review..." />
        </div>
        <div className="flex justify-end space-x-2">
          <button onClick={onClose} className="btn-secondary px-4 py-2" disabled={saving || success}>Cancel</button>
          <button onClick={handleSubmit} className="btn-primary px-4 py-2" disabled={saving || success}>Submit</button>
        </div>
      </div>
    </div>
  );
};

export default PackageManagement;
