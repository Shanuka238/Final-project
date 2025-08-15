import React, { useEffect, useState } from 'react';
import { getToken } from 'utils/auth';

const ServiceTypeSelector = ({ selectedTypes, setSelectedTypes, onTypeSelect }) => {
  const types = ['Catering', 'Decoration', 'Photography', 'Music', 'Lighting', 'Venue Setup'];
  return (
    <div className="flex flex-wrap gap-4 justify-center mb-4">
      {types.map(type => (
        <button
          key={type}
          type="button"
          className={`px-4 py-2 rounded-lg border transition-all duration-200 font-medium ${selectedTypes.includes(type) ? 'bg-primary text-white border-primary' : 'bg-gray-100 text-text-secondary border-gray-300'}`}
          onClick={() => {
            let updated;
            if (selectedTypes.includes(type)) {
              updated = selectedTypes.filter(t => t !== type);
            } else {
              updated = [...selectedTypes, type];
            }
            setSelectedTypes(updated);
            onTypeSelect(type, !selectedTypes.includes(type));
          }}
        >
          {type}
        </button>
      ))}
    </div>
  );
};

const ServiceOptions = ({ type, selected, setSelected }) => {
  const [services, setServices] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  useEffect(() => {
    const fetchServices = async () => {
      setLoading(true);
      setError(null);
      try {
        const token = getToken();
        const res = await fetch('http://localhost:5000/api/staff/services', {
          headers: {
            'Authorization': token ? `Bearer ${token}` : ''
          }
        });
        const data = await res.json();
        if (Array.isArray(data)) {
          setServices(data.filter(s => s.type === type));
        } else {
          setError(data?.message || data?.error || 'Failed to load services');
          setServices([]);
        }
      } catch (err) {
        setError('Failed to load services');
        setServices([]);
      }
      setLoading(false);
    };
    fetchServices();
  }, [type]);
  if (loading) return <div>Loading {type} options...</div>;
  if (error) return <div className="text-sm text-red-500 mb-2">{error}</div>;
  if (!services.length) return <div className="text-sm text-gray-400 mb-2">No {type} services available.</div>;
  return (
    <div className="flex flex-wrap gap-3 mb-4">
      {services.map(service => (
        <div key={service._id} className={`border rounded p-2 w-48 ${selected.includes(service._id) ? 'border-primary bg-primary-50' : 'border-gray-200'}`}>
          {service.imageUrl && <img src={service.imageUrl} alt={service.name} className="w-full h-20 object-cover rounded mb-1" />}
          <div className="font-medium text-sm mb-1">{service.name}</div>
          <div className="text-xs text-gray-500 mb-1">{service.description}</div>
          {service.keyFeatures && service.keyFeatures.length > 0 && (
            <ul className="list-disc pl-4 text-xs mb-1">
              {service.keyFeatures.map((f, i) => <li key={i}>{f}</li>)}
            </ul>
          )}
          <button
            type="button"
            className={`mt-1 px-2 py-1 rounded text-xs font-medium ${selected.includes(service._id) ? 'bg-primary text-white' : 'bg-gray-100 text-primary'}`}
            onClick={() => {
              if (selected.includes(service._id)) {
                setSelected(selected.filter(id => id !== service._id));
              } else {
                setSelected([...selected, service._id]);
              }
            }}
          >
            {selected.includes(service._id) ? 'Selected' : 'Select'}
          </button>
        </div>
      ))}
    </div>
  );
};

export { ServiceTypeSelector, ServiceOptions };
