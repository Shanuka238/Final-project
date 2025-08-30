
import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';
import { fetchUserBookings } from 'api/dashboard';
import { fetchStaffServices } from 'api/staff';
import DeleteConfirmationModal from './DeleteConfirmationModal';
import PaymentModal from './PaymentModal';

const ReviewModal = ({ open, booking, onSubmit, onClose }) => {
  const [review, setReview] = React.useState('');
  const [rating, setRating] = React.useState(5);
  const [saving, setSaving] = React.useState(false);
  const [success, setSuccess] = React.useState(false);
  if (!open) return null;
  const handleSubmit = async () => {
    setSaving(true);
    await onSubmit({ review, rating, bookingId: booking._id });
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
        <h3 className="font-heading text-lg font-semibold mb-4">Add Review for {booking?.eventTitle}</h3>
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
import { payBooking, deleteBooking as apiDeleteBooking, saveBookingReview } from 'api/dashboard';
import CenterPopup from 'components/CenterPopup';

const formatCurrency = (estimatedCost) => `Rs ${estimatedCost.toLocaleString('en-LK') || 0}`;

const BookingManagement = ({ user }) => {
  const [activeFilter, setActiveFilter] = useState('all');
  const [popupMessage, setPopupMessage] = useState('');
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModal, setDeleteModal] = useState({ open: false, bookingId: null });
  const [paymentModal, setPaymentModal] = useState({ open: false, booking: null });
  const [reviewModal, setReviewModal] = useState({ open: false, booking: null });
  const [allServices, setAllServices] = useState([]);
  const handleReviewSubmit = async ({ review, rating, bookingId }) => {
    try {
      await saveBookingReview(bookingId, review, rating);
      setPopupMessage('Review submitted successfully!');
    } catch (err) {
      setPopupMessage('Failed to submit review.');
    }
    setReviewModal({ open: false, booking: null });
  };
  const handleOpenReview = (booking) => setReviewModal({ open: true, booking });
  const handleCloseReview = () => setReviewModal({ open: false, booking: null });

  useEffect(() => {
    let mounted = true;
    async function fetchData() {
      setLoading(true);
      try {
        const [bookingsData, servicesData] = await Promise.all([
          user && user.id ? fetchUserBookings(user.id) : [],
          fetchStaffServices()
        ]);
        if (mounted) {
          setBookings(bookingsData);
          setAllServices(servicesData);
        }
      } catch {
        if (mounted) {
          setBookings([]);
          setAllServices([]);
        }
      } finally {
        if (mounted) setLoading(false);
      }
    }
    fetchData();
    return () => { mounted = false; };
  }, [user]);

  const isPartial = (b) => Number(b.dueAmount) > 0;
  const filterOptions = [
    { id: 'all', label: 'All Bookings', count: bookings.length },
    { id: 'paid', label: 'Paid', count: bookings.filter(b => b.status === 'paid').length },
    { id: 'partial', label: 'Partial', count: bookings.filter(isPartial).length }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'active':
        return 'text-success bg-success-50 border-success-200';
      case 'payment':
        return 'text-warning bg-warning-50 border-warning-200';
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
      await apiDeleteBooking(bookingId);
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
      const updatedBooking = await payBooking(booking._id, payAmount, paymentIntent.id);
      setBookings(prev => prev.map(b => b._id === booking._id ? updatedBooking : b));
    } catch (err) {
      alert('Failed to update payment.');
    }
    handleClosePayment();
  };

  if (loading) {
    return <div className="text-center py-12">Loading bookings...</div>;
  }

  function isUpcomingOrToday(eventDate) {
    if (!eventDate) return false;
    const today = new Date();
    const event = new Date(eventDate.split('T')[0]);
    today.setHours(0,0,0,0);
    event.setHours(0,0,0,0);
    return event >= today;
  }

  const filteredBookings = (activeFilter === 'all'
    ? bookings
    : activeFilter === 'partial'
      ? bookings.filter(isPartial)
      : bookings.filter(booking => booking.status === activeFilter)
  ).filter(b => isUpcomingOrToday(b.eventDate));

  function formatTimeAMPM(time24) {
  if (!time24) return '';
  const [hourStr, minuteStr] = time24.split(":");
  let hour = parseInt(hourStr, 10);
  const minute = parseInt(minuteStr, 10);
  const ampm = hour >= 12 ? "PM" : "AM";
  hour = hour % 12;
  if (hour === 0) hour = 12;
  return `${hour}:${minute.toString().padStart(2, '0')} ${ampm}`;
}

  const EVENT_TYPE_COLORS = {
  wedding: 'from-pink-500 to-rose-500',
  birthday: 'from-blue-500 to-cyan-500',
  corporate: 'from-green-500 to-emerald-500',
  anniversary: 'from-purple-500 to-violet-500',
  graduation: 'from-yellow-500 to-orange-500',
  custom: 'from-indigo-500 to-purple-500',
};

  const EVENT_TYPE_ICONS = {
  wedding: 'Heart',
  birthday: 'Gift',
  corporate: 'Briefcase',
  anniversary: 'Star',
  graduation: 'Award',
  custom: 'Sparkles',
};

function formatLocalDate(dateStr) {
  if (!dateStr) return '';
  const [yyyy, mm, dd] = dateStr.split('T')[0].split('-');
  return `${yyyy}-${mm}-${dd}`;
}

  return (
  <div className="space-y-6">
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

      <div className="space-y-6">
        {filteredBookings.map((booking) => (
          <div key={booking._id} className="card">

            <div className="flex justify-between items-center mb-2">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className={`w-10 h-10 rounded-full bg-gradient-to-br ${EVENT_TYPE_COLORS[booking.eventType] || 'from-primary to-accent'} flex items-center justify-center`}>
                    <Icon name={EVENT_TYPE_ICONS[booking.eventType] || 'Calendar'} size={22} color="white" strokeWidth={2} />
                  </div>
                  <h4 className="font-heading text-lg font-semibold text-text-primary">
                    {booking.eventTitle}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor('active')}`}>ACTIVE</span>
                  {booking.status === 'paid' && (
                    <span className={`ml-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor('paid')}`}>PAID</span>
                  )}
                  {isPartial(booking) && (
                    <span className="ml-2 px-3 py-1 rounded-full text-xs font-medium border text-warning bg-warning-50 border-warning-200 animate-pulse">
                      PARTIAL
                    </span>
                  )}
                </div>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span>Booking ID: {booking._id}</span>
                  <span>Package: {booking.package}</span>
                  <span>Event Date: {formatLocalDate(booking.eventDate)}{booking.eventTime ? `, ${formatTimeAMPM(booking.eventTime)}` : ''}</span>
                </div>
              </div>
              
              <div className="flex items-center space-x-2 mt-4 lg:mt-0">
                <button
                  className="flex items-center space-x-1 px-3 py-2 text-sm text-primary hover:bg-primary-50 rounded-lg transition-colors duration-200"
                  onClick={() => handleOpenReview(booking)}
                >
                  <Icon name="Star" size={16} strokeWidth={2} />
                  <span>Add Reviews</span>
                </button>
                <button
                  onClick={() => handleDeleteBooking(booking._id)}
                  className={`btn-secondary text-error ml-2 ${Number(booking.paidAmount) > 0 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                  title="Delete Booking"
                  disabled={Number(booking.paidAmount) > 0}
                >
                  <Icon name="Trash" size={18} strokeWidth={2} />
                </button>
                <button
                  onClick={() => handleOpenPayment(booking)}
                  className={`btn-primary ml-2 flex items-center space-x-1 px-3 py-2 text-sm ${booking.dueAmount <= 0 ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''}`}
                  title="Pay Now"
                  disabled={booking.dueAmount <= 0}
                >
                  <Icon name="CreditCard" size={18} strokeWidth={2} />
                  <span>Pay</span>
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 xl:col-span-2 min-w-0 xl:min-w-[480px]">
                <h5 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="CreditCard" size={18} strokeWidth={2} />
                  <span>Payment Schedule</span>
                </h5>

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
                            Due: {formatLocalDate(payment.dueDate)}
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

              <div className="lg:col-span-1">
                <h5 className="font-semibold text-text-primary mb-4 flex items-center space-x-2">
                  <Icon name="Info" size={18} strokeWidth={2} />
                  <span>Booking Details</span>
                </h5>
                <div className="space-y-2 text-sm text-text-secondary">
                  <div><span className="font-medium">Title:</span> {booking.eventTitle}</div>
                  <div><span className="font-medium">Date:</span> {formatLocalDate(booking.eventDate)}{booking.eventTime ? `, ${formatTimeAMPM(booking.eventTime)}` : ''}</div>
                  <div><span className="font-medium">Guests:</span> {booking.guestCount}</div>
                  <div><span className="font-medium">Price:</span> {formatCurrency(booking.totalAmount)}</div>
                  <div><span className="font-medium">Status:</span> {booking.status || 'Booked'}</div>
                  <div>
                    <span className="font-medium">Services:</span>
                    {Array.isArray(booking.services) && booking.services.length > 0 ? (
                      <ul className="list-disc pl-5 mt-1">
                        {booking.services.map(serviceId => {
                          const service = allServices.find(s => s._id === serviceId);
                          return service ? (
                            <li key={serviceId} className="mb-1">
                              <span className="font-semibold text-primary">{service.name}</span>
                              {service.type && <span className="ml-2 text-xs text-text-secondary">({service.type})</span>}
                            </li>
                          ) : (
                            <li key={serviceId} className="mb-1 text-text-tertiary">Service not found</li>
                          );
                        })}
                      </ul>
                    ) : (
                      <span className="ml-2 text-text-tertiary">No services selected</span>
                    )}
                  </div>
                </div>
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
      <ReviewModal
        open={reviewModal.open}
        booking={reviewModal.booking}
        onSubmit={handleReviewSubmit}
        onClose={handleCloseReview}
      />
      <CenterPopup
        message={popupMessage}
        onClose={() => setPopupMessage('')}
      />
    </div>
  );
};

export default BookingManagement;