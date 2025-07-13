import React, { useEffect, useState } from 'react';

const ServiceList = () => {
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

  if (loading) return <div className="text-center py-8">Loading services...</div>;
  if (error) return <div className="text-center text-error py-8">{error}</div>;

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 grid gap-8 grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
      {services.map(service => (
        <div key={service._id} className="card p-4 flex flex-col gap-2">
          {service.imageUrl && (
            <img src={service.imageUrl} alt={service.name} className="rounded w-full h-40 object-cover mb-2" />
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
        </div>
      ))}
    </div>
  );
};

export default ServiceList;
