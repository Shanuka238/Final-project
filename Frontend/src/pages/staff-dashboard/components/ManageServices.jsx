
import React, { useState, useEffect } from 'react';
import CenterPopup from 'components/CenterPopup';
import AddServiceForm from './AddServiceForm';
import {
  fetchStaffServices,
  fetchStaffService,
  addStaffService,
  updateStaffService,
  deleteStaffService
} from '../../../api/staff';

export default function ManageServices() {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingService, setEditingService] = useState(null);

  useEffect(() => {
    fetchStaffServices()
      .then(data => {
        setServices(Array.isArray(data) ? data : []);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load services');
        setLoading(false);
      });
  }, []);

  const handleServiceAdded = (service) => {
    if (editingService) {
      setServices(services.map(s => s._id === service._id ? service : s));
      setEditingService(null);
    } else {
      setServices([service, ...services]);
    }
    setShowForm(false);
  };

  const [deleteId, setDeleteId] = useState(null);
  const [popupMessage, setPopupMessage] = useState('');
  const handleDelete = (id) => {
    setDeleteId(id);
    setPopupMessage('Are you sure you want to delete this service?');
  };
  const handleDeleteConfirm = async () => {
    try {
      await deleteStaffService(deleteId);
      setServices(services.filter(s => s._id !== deleteId));
      setPopupMessage('Service deleted successfully!');
    } catch {
      setPopupMessage('Failed to delete service');
    } finally {
      setDeleteId(null);
    }
  };
  const handlePopupClose = () => {

    if (!deleteId) setPopupMessage('');
  };

  return (
    <div>
      <CenterPopup
        message={popupMessage}
        confirm={!!deleteId}
        onConfirm={handleDeleteConfirm}
        onCancel={() => { setDeleteId(null); setPopupMessage(''); }}
        onClose={handlePopupClose}
      />
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-purple-800">Manage Services</h2>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
          onClick={() => { setShowForm(true); setEditingService(null); }}
        >
          Add New Service
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="bg-white rounded-2xl shadow-lg p-4 w-full max-w-lg relative mx-2 overflow-y-auto max-h-[90vh]">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-purple-600" onClick={() => setShowForm(false)}>
              <span className="text-2xl">&times;</span>
            </button>
            <AddServiceForm onServiceAdded={handleServiceAdded} service={editingService} />
          </div>
        </div>
      )}
      {loading ? (
        <div className="text-gray-400">Loading services...</div>
      ) : error ? (
        <div className="text-red-500">{error}</div>
      ) : services.length === 0 ? (
        <div className="text-gray-400">No services found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {services.map((service, idx) => (
            <div key={service._id || idx} className="p-4 rounded-lg border bg-purple-50 flex flex-col gap-1">
              <div className="font-semibold text-lg">{service.name}</div>
              <div className="text-sm text-gray-500">{service.type}</div>
              {service.imageUrl && <img src={service.imageUrl} alt={service.name} className="w-full h-32 object-cover rounded mt-2" />}
              {service.description && <div className="text-sm text-gray-600 mt-2">{service.description}</div>}
              {service.details && <div className="text-xs text-gray-500 mt-1">{service.details}</div>}
              {service.keyFeatures && service.keyFeatures.length > 0 && (
                <div className="text-xs text-purple-700 mt-1">Features: {service.keyFeatures.join(', ')}</div>
              )}
              {service.photographer && (
                <div className="text-xs text-blue-700 mt-1">Photographer: {service.photographer.name} (Rating: {service.photographer.rating})</div>
              )}
              <div className="flex gap-2 mt-2 self-end">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  onClick={async () => {
                    try {
                      const latest = await fetchStaffService(service._id);
                      setEditingService(latest);
                      setShowForm(true);
                    } catch (err) {
                      let msg = 'Failed to fetch service details.';
                      if (err && err.response && err.response.data && err.response.data.error) {
                        msg += ' ' + err.response.data.error;
                      } else if (err && err.message) {
                        msg += ' ' + err.message;
                      }
                      setPopupMessage(msg);
                    }
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  onClick={() => handleDelete(service._id)}
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
