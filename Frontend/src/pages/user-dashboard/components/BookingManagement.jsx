import React, { useState } from 'react';
import Icon from 'components/AppIcon';

const BookingManagement = () => {
  const [activeFilter, setActiveFilter] = useState('all');

  const mockBookings = [
    {
      id: "BK001",
      eventTitle: "Sarah & Michael\'s Wedding",
      package: "Premium Wedding Package",
      totalAmount: 15000,
      paidAmount: 7500,
      dueAmount: 7500,
      status: "active",
      bookingDate: "2024-02-15",
      eventDate: "2024-06-15",
      paymentSchedule: [
        { id: 1, description: "Booking Deposit", amount: 3000, dueDate: "2024-02-15", status: "paid" },
        { id: 2, description: "Second Payment", amount: 4500, dueDate: "2024-04-15", status: "paid" },
        { id: 3, description: "Final Payment", amount: 7500, dueDate: "2024-06-01", status: "pending" }
      ],
      documents: [
        { id: 1, name: "Contract Agreement", status: "signed", uploadDate: "2024-02-15" },
        { id: 2, name: "Venue Requirements", status: "pending", uploadDate: null },
        { id: 3, name: "Guest List", status: "uploaded", uploadDate: "2024-03-10" }
      ]
    },
    {
      id: "BK002",
      eventTitle: "Corporate Annual Gala",
      package: "Corporate Elite Package",
      totalAmount: 25000,
      paidAmount: 10000,
      dueAmount: 15000,
      status: "active",
      bookingDate: "2024-03-01",
      eventDate: "2024-05-20",
      paymentSchedule: [
        { id: 1, description: "Booking Deposit", amount: 5000, dueDate: "2024-03-01", status: "paid" },
        { id: 2, description: "Second Payment", amount: 5000, dueDate: "2024-04-01", status: "paid" },
        { id: 3, description: "Final Payment", amount: 15000, dueDate: "2024-05-10", status: "pending" }
      ],
      documents: [
        { id: 1, name: "Corporate Contract", status: "signed", uploadDate: "2024-03-01" },
        { id: 2, name: "Catering Requirements", status: "uploaded", uploadDate: "2024-03-15" }
      ]
    },
    {
      id: "BK003",
      eventTitle: "Emma\'s 25th Birthday",
      package: "Birthday Celebration Package",
      totalAmount: 3500,
      paidAmount: 1000,
      dueAmount: 2500,
      status: "requires_action",
      bookingDate: "2024-03-20",
      eventDate: "2024-04-28",
      paymentSchedule: [
        { id: 1, description: "Booking Deposit", amount: 1000, dueDate: "2024-03-20", status: "paid" },
        { id: 2, description: "Final Payment", amount: 2500, dueDate: "2024-04-20", status: "overdue" }
      ],
      documents: [
        { id: 1, name: "Event Contract", status: "signed", uploadDate: "2024-03-20" },
        { id: 2, name: "Guest List", status: "pending", uploadDate: null }
      ]
    }
  ];

  const filterOptions = [
    { id: 'all', label: 'All Bookings', count: mockBookings.length },
    { id: 'active', label: 'Active', count: mockBookings.filter(b => b.status === 'active').length },
    { id: 'requires_action', label: 'Requires Action', count: mockBookings.filter(b => b.status === 'requires_action').length },
    { id: 'completed', label: 'Completed', count: 0 }
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

  const filteredBookings = activeFilter === 'all' 
    ? mockBookings 
    : mockBookings.filter(booking => booking.status === activeFilter);

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
          <div key={booking.id} className="card">
            {/* Booking Header */}
            <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between mb-6">
              <div>
                <div className="flex items-center space-x-3 mb-2">
                  <h4 className="font-heading text-lg font-semibold text-text-primary">
                    {booking.eventTitle}
                  </h4>
                  <span className={`px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                    {booking.status.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div className="flex items-center space-x-4 text-sm text-text-secondary">
                  <span>Booking ID: {booking.id}</span>
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
                        ${booking.totalAmount.toLocaleString()}
                      </p>
                      <p className="text-xs text-text-secondary">Total Amount</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-success">
                        ${booking.paidAmount.toLocaleString()}
                      </p>
                      <p className="text-xs text-text-secondary">Paid</p>
                    </div>
                    <div>
                      <p className="text-2xl font-bold text-warning">
                        ${booking.dueAmount.toLocaleString()}
                      </p>
                      <p className="text-xs text-text-secondary">Due</p>
                    </div>
                  </div>
                </div>

                {/* Payment Items */}
                <div className="space-y-3">
                  {booking.paymentSchedule.map((payment) => (
                    <div key={payment.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
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
                          ${payment.amount.toLocaleString()}
                        </p>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(payment.status)}`}>
                          {payment.status.toUpperCase()}
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
                  {booking.documents.map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between p-3 border border-border rounded-lg">
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
            {activeFilter === 'all' ? "You haven't made any bookings yet." : `No bookings match the"${filterOptions.find(f => f.id === activeFilter)?.label}" filter.`}
          </p>
        </div>
      )}
    </div>
  );
};

export default BookingManagement;