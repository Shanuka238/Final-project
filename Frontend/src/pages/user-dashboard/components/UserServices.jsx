import React, { useEffect, useState } from 'react';

const UserServices = ({ selectedServices, setSelectedServices }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetch('http://localhost:5000/api/admin/services')
      .then(res => res.json())
      .then(data => {
        setServices(data);
        setLoading(false);
      })
      .catch(() => {
        setError('Failed to load services');
        setLoading(false);
      });
  }, []);

  const toggleService = (serviceId) => {
    if (selectedServices.includes(serviceId)) {
      setSelectedServices(selectedServices.filter(id => id !== serviceId));
    } else {
      setSelectedServices([...selectedServices, serviceId]);
    }
  };

  if (loading) return <div className="text-center py-8">Loading services...</div>;
  if (error) return <div className="text-center text-error py-8">{error}</div>;

  return (
    <div className="bg-white rounded-xl shadow p-6 mb-6">
      <h2 className="text-xl font-bold mb-4 text-primary">Available Services</h2>
      <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
        {services.map(service => (
          <div key={service._id} className={`card p-4 flex flex-col gap-2 border ${selectedServices.includes(service._id) ? 'border-primary' : 'border-gray-200'}`}>
            {service.imageUrl && (
              <img src={service.imageUrl} alt={service.name} className="rounded w-full h-32 object-cover mb-2" />
            )}
            <h3 className="font-bold text-lg text-primary mb-1">{service.name}</h3>
            <div className="text-xs text-gray-500 mb-1">{service.type}</div>
            <div className="text-sm mb-1">{service.description}</div>
            {service.keyFeatures && service.keyFeatures.length > 0 && (
              <ul className="list-disc pl-5 text-sm mb-1">
                {service.keyFeatures.map((f, i) => <li key={i}>{f}</li>)}
              </ul>
            )}
            {service.details && <div className="text-xs text-gray-600 mb-1">{service.details}</div>}
            {service.type === 'Photographer' && service.photographer && (
              <div className="mt-2 p-2 bg-gray-50 rounded">
                <div className="font-medium">Photographer: {service.photographer.name}</div>
                <div>Rating: {service.photographer.rating} / 5</div>
              </div>
            )}
            <button
              type="button"
              className={`mt-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${selectedServices.includes(service._id) ? 'bg-primary text-white' : 'bg-gray-100 text-primary'}`}
              onClick={() => toggleService(service._id)}
            >
              {selectedServices.includes(service._id) ? 'Selected' : 'Select Service'}
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserServices;
