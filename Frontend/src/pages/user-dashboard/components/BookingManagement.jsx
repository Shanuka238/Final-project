import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import { useUser } from '@clerk/clerk-react';
import { fetchUserBookings } from 'api/dashboard';
import axios from 'axios';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import PaymentModal from './PaymentModal';

const formatCurrency = (estimatedCost) => `Rs ${estimatedCost.toLocaleString('en-LK') || 0}`;

const BookingManagement = () => {
  const [activeFilter, setActiveFilter] = useState('all');
  const { user } = useUser();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, bookingId: null });
  const [paymentModal, setPaymentModal] = useState({ open: false, booking: null });

  useEffect(() => {
    if (user) {
      fetchUserBookings(user.id)
        .then((data) => setBookings(data))
        .catch(() => setBookings([]))
        .finally(() => setLoading(false));
    }
  }, [user]);

  const filterOptions = [
    { id: 'all', label: 'All Bookings', count: bookings.length },
    { id: 'active', label: 'Active', count: bookings.filter(b => b.status === 'active').length },
    { id: 'requires_action', label: 'Requires Action', count: bookings.filter(b => b.status === 'requires_action').length },
    { id: 'completed', label: 'Completed', count: bookings.filter(b => b.status === 'completed').length }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success-50 border-success-200';
      case 'requires_action':
        return 'text-error bg-error-50 border-error-200';
      case 'completed':
        return 'text-text-secondary bg-gray-50 border-gray-200';
      case 'paid':
        return 'text-success bg-success-50';
      case 'pending':
        return 'text-warning bg-warning-50';
      case 'overdue':
        return 'text-error bg-error-50';
      case 'signed':
        return 'text-success bg-success-50';
      case 'uploaded':
        return 'text-primary bg-primary-50';
      default:
        return 'text-text-secondary bg-gray-50';
    }
  };

  const getPaymentStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return 'CheckCircle';
      case 'pending':
        return 'Clock';
      case 'overdue':
        return 'AlertCircle';
      default:
        return 'Circle';
    }
  };

  const handleDeleteBooking = async (bookingId) => {
    setDeleteModal({ open: true, bookingId });
  };

  const confirmDeleteBooking = async () => {
    const bookingId = deleteModal.bookingId;
    setDeleteModal({ open: false, bookingId: null });
    try {
      await axios.delete(`http://localhost:5000/api/booking/${bookingId}`);
      setBookings(prev => prev.filter(b => b._id !== bookingId));
    } catch (err) {
      alert('Failed to delete booking.');
    }
  };

  const cancelDeleteBooking = () => setDeleteModal({ open: false, bookingId: null });

  const handleOpenPayment = (booking) => setPaymentModal({ open: true, booking });
  const handleClosePayment = () => setPaymentModal({ open: false, booking: null });

  const handlePaymentSuccess = async (paymentIntent) => {
    const booking = paymentModal.booking;
    const payAmount = paymentIntent.amount;
    try {
      const res = await axios.patch(`http://localhost:5000/api/booking/${booking._id}/pay`, {
        amount: payAmount,
        paymentIntentId: paymentIntent.id
      });
      setBookings(prev => prev.map(b => b._id === booking._id ? res.data : b));
    } catch (err) {
      alert('Failed to update payment.');
    }
    handleClosePayment();
  };

  if (loading) {
    return <div className="text-center py-12">Loading bookings...</div>;
  }

  const filteredBookings = activeFilter === 'all'
    ? bookings
    : bookings.filter(booking => booking.status === activeFilter);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="card">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h3 className="font-heading text-xl font-semibold text-text-primary">
              Booking Management
            </h3>
            <p className="text-text-secondary text-sm mt-1">
              Track payments, contracts, and documentation
            </p>
          </div>
          <div className="flex items-center space-x-2 mt-4 sm:mt-0">
            <button className="btn-secondary flex items-center space-x-2">
              <Icon name="Download" size={18} strokeWidth={2} />
              <span>Export</span>
            </button>
          </div>
        </div>
      </div>
      {/* Filter Tabs */}
      <div className="card">
        <div className="flex flex-wrap gap-2">
          {filterOptions.map((option) => (
            <button
              key={option.id}
              onClick={() => setActiveFilter(option.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg font-medium text-sm transition-all duration-200 ${
                activeFilter === option.id
                  ? 'bg-primary text-white' :'bg-surface-secondary text-text-secondary hover:bg-primary-50 hover:text-primary'
              }`}
            >
              <span>{option.label}</span>
              <span className={`px-2 py-1 rounded-full text-xs ${
                activeFilter === option.id
                  ? 'bg-white/20 text-white' :'bg-text-tertiary/20 text-text-secondary'
              }`}>
                {option.count}
              </span>
            </button>
          ))}
        </div>
      </div>
      {/* Bookings List */}
      <div className="space-y-6">
        {filteredBookings.map((booking) => (
          <div key={booking._id} className="card">
            {/* Booking Header */}
            <div className="flex justify-between items-center mb-2">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-heading text-lg font-semibold text-text-primary">
                    {booking.eventTitle}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                    {booking.status?.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span>Booking ID: {booking._id}</span>
                  <span>Package: {booking.package}</span>
                  <span>Event Date: {new Date(booking.eventDate).toLocaleDateString()}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                <button className="flex items-center space-x-1 px-3 py-2 text-sm text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200">
                  <Icon name="Eye" size={16} strokeWidth={2} />
                  <span>View Contract</span>
                </button>
                <button className="flex items-center space-x-1 px-3 py-2 text-sm text-text-secondary hover:bg-surface-secondary rounded-lg transition-colors duration-200">
                  <Icon name="Edit" size={16} strokeWidth={2} />
                  <span>Modify</span>
                </button>
                <button
                  onClick={() => handleDeleteBooking(booking._id)}
                  className="btn-secondary text-error ml-2"
                  title="Delete Booking"
                >
                  <Icon name="Trash" size={18} strokeWidth={2} />
                </button>
                <button
                  onClick={() => handleOpenPayment(booking)}
                  className="btn-primary ml-2 flex items-center space-x-1 px-3 py-2 text-sm"
                  title="Pay Now"
                  disabled={booking.dueAmount <= 0}
                >
                  <Icon name="CreditCard" size={18} strokeWidth={2} />
                  <span>Pay</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Payment Schedule */}
              <div>
                <h5 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="CreditCard" size={18} strokeWidth={2} />
                  <span>Payment Schedule</span>
                </h5>
                
                {/* Payment Summary */}
                <div className="bg-surface-secondary rounded-lg p-4 mb-4">
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <p className="text-2xl font-bold text-text-primary">
                        {formatCurrency(booking.totalAmount)}
                      </p>
                      <p className="text-xs text-text-secondary">Total Amount</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-success">
                        {formatCurrency(booking.paidAmount)}
                      </p>
                      <p className="text-xs text-text-secondary">Paid</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-warning">
                        {formatCurrency(booking.dueAmount)}
                      </p>
                      <p className="text-xs text-text-secondary">Due</p>
                    </div>
                  </div>
                </div>

                {/* Payment Items */}
                <div className="space-y-3">
                  {booking.paymentSchedule?.map((payment, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <Icon
                          name={getPaymentStatusIcon(payment.status)}
                          size={20}
                          className={payment.status === 'paid' ? 'text-success' : payment.status === 'overdue' ? 'text-error' : 'text-warning'}
                          strokeWidth={2}
                        />
                        <div>
                          <p className="font-medium text-text-primary">{payment.description}</p>
                          <p className="text-sm text-text-secondary">
                            Due: {new Date(payment.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-text-primary">
                          {formatCurrency(payment.amount)}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status?.toUpperCase()}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Documents */}
              <div>
                <h5 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="FileText" size={18} strokeWidth={2} />
                  <span>Documents</span>
                </h5>
                
                <div className="space-y-3">
                  {booking.documents?.map((doc, idx) => (
                    <div key={idx} className="flex items-center justify-between p-3 border border-border rounded-lg">
                      <div className="flex items-center space-x-3">
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${getStatusColor(doc.status)}`}>
                          <Icon
                            name={doc.status === 'signed' ? 'CheckCircle' : doc.status === 'uploaded' ? 'Upload' : 'Clock'}
                            size={20}
                            strokeWidth={2}
                          />
                        </div>
                        <div>
                          <p className="font-medium text-text-primary">{doc.name}</p>
                          <p className="text-sm text-text-secondary">
                            {doc.uploadDate ? `Uploaded: ${new Date(doc.uploadDate).toLocaleDateString()}` : 'Not uploaded'}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {doc.status === 'pending' ? (
                          <button className="flex items-center space-x-1 px-3 py-2 text-sm bg-primary text-white rounded-lg hover:bg-primary-700 transition-colors duration-200">
                            <Icon name="Upload" size={16} strokeWidth={2} />
                            <span>Upload</span>
                          </button>
                        ) : (
                          <button className="flex items-center space-x-1 px-3 py-2 text-sm text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200">
                            <Icon name="Download" size={16} strokeWidth={2} />
                            <span>Download</span>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>

                <button className="w-full mt-4 flex items-center justify-center space-x-2 p-3 border-2 border-dashed border-border rounded-lg text-text-secondary hover:border-primary hover:text-primary transition-colors duration-200">
                  <Icon name="Plus" size={20} strokeWidth={2} />
                  <span>Upload Additional Document</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {filteredBookings.length === 0 && (
        <div className="card text-center py-12">
          <Icon name="FileText" size={64} className="text-text-tertiary mx-auto mb-4" />
          <h4 className="font-heading text-lg font-semibold text-text-primary mb-2">
            No Bookings Found
          </h4>
          <p className="text-text-secondary mb-6">
            {activeFilter === 'all' ? "You haven't made any bookings yet." : `No bookings match the "${filterOptions.find(f => f.id === activeFilter)?.label}" filter.`}
          </p>
        </div>
      )}

      <DeleteConfirmationModal
        open={deleteModal.open}
        onConfirm={confirmDeleteBooking}
        onCancel={cancelDeleteBooking}
      />
      <PaymentModal
        open={paymentModal.open}
        amount={paymentModal.booking?.dueAmount || 0}
        onSuccess={handlePaymentSuccess}
        onClose={handleClosePayment}
      />
    </div>
  );
};

export default BookingManagement;