
import React, { useState, useEffect } from 'react';
import CenterPopup from 'components/CenterPopup';
import { getToken } from '../../../utils/auth';

const AddServiceForm = ({ onServiceAdded, service }) => {
  const [name, setName] = useState('');
  const [type, setType] = useState('Catering');
  const [description, setDescription] = useState('');
  const [details, setDetails] = useState('');
  const [image, setImage] = useState(null);
  const [imageUrl, setImageUrl] = useState('');
  const [photographerName, setPhotographerName] = useState('');
  const [photographerRating, setPhotographerRating] = useState('');
  const [keyFeatures, setKeyFeatures] = useState(['']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [pendingService, setPendingService] = useState(null);

  useEffect(() => {
    if (service) {
      setName(service.name || '');
      setType(service.type || 'Catering');
      setDescription(service.description || '');
      setDetails(service.details || '');
      setImage(null);
      setImageUrl(service.imageUrl || '');
      setKeyFeatures(Array.isArray(service.keyFeatures) && service.keyFeatures.length > 0 ? service.keyFeatures : ['']);
      setPhotographerName(service.photographer?.name || '');
      setPhotographerRating(service.photographer?.rating?.toString() || '');
    } else {
      setName('');
      setType('Catering');
      setDescription('');
      setDetails('');
      setImage(null);
      setImageUrl('');
      setKeyFeatures(['']);
      setPhotographerName('');
      setPhotographerRating('');
    }
  }, [service]);

  const uploadImage = async (file) => {
    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(file);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    let uploadedImageUrl = imageUrl;
    try {
      if (image) {
        uploadedImageUrl = await uploadImage(image);
        setImageUrl(uploadedImageUrl);
      }
      const body = {
        name,
        type,
        description,
        details,
        imageUrl: uploadedImageUrl,
        keyFeatures: keyFeatures.filter(f => f.trim() !== ''),
      };
      if (type === 'Photographer') {
        body.photographer = {
          name: photographerName,
          rating: Number(photographerRating)
        };
      }
      let res;
      const token = getToken();
      const headers = { 'Content-Type': 'application/json' };
      if (token) headers['Authorization'] = `Bearer ${token}`;
      if (service && service._id) {
  res = await fetch(`https://party-nest.vercel.app/api/staff/services/${service._id}`, {
          method: 'PUT',
          headers,
          body: JSON.stringify(body)
        });
      } else {
  res = await fetch('https://party-nest.vercel.app/api/staff/services', {
          method: 'POST',
          headers,
          body: JSON.stringify(body)
        });
      }
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || 'Failed to save service');
  setSuccess(service && service._id ? 'Service updated!' : 'Service added!');
  if (!service || !service._id) {
    setPopupMessage('Service added successfully!');
    setPendingService(data);
  } else {
    setName('');
    setDescription('');
    setDetails('');
    setImage(null);
    setImageUrl('');
    setPhotographerName('');
    setPhotographerRating('');
    setKeyFeatures(['']);
    if (onServiceAdded) onServiceAdded(data);
  }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePopupClose = () => {
    setPopupMessage('');
    setName('');
    setDescription('');
    setDetails('');
    setImage(null);
    setImageUrl('');
    setPhotographerName('');
    setPhotographerRating('');
    setKeyFeatures(['']);
    if (onServiceAdded && pendingService) onServiceAdded(pendingService);
    setPendingService(null);
  };
  return (
    <>
      <CenterPopup message={popupMessage} onClose={handlePopupClose} />
      <form onSubmit={handleSubmit} className="card p-6 space-y-4 max-w-md mx-auto mt-8">
        <h2 className="font-heading text-xl font-semibold mb-2">{service && service._id ? 'Edit Service' : 'Add New Service'}</h2>
        <div>
          <label className="block text-sm font-medium mb-1">Service Type *</label>
          <select
            value={type}
            onChange={e => setType(e.target.value)}
            className="input-field w-full"
            required
          >
            <option value="Catering">Catering</option>
            <option value="Decoration">Decoration</option>
            <option value="Photography">Photographer</option>
            <option value="Music">Music</option>
            <option value="Lighting">Lighting</option>
            <option value="Venue Setup">Venue Setup</option>
          </select>
        </div>
      <div>
        <label className="block text-sm font-medium mb-1">Service Name *</label>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="input-field w-full"
          required
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Description</label>
        <textarea
          value={description}
          onChange={e => setDescription(e.target.value)}
          className="input-field w-full h-20"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Service Details</label>
        <textarea
          value={details}
          onChange={e => setDetails(e.target.value)}
          className="input-field w-full h-16"
        />
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Image</label>
        <input
          type="file"
          accept="image/*"
          onChange={e => setImage(e.target.files[0])}
          className="input-field w-full mb-2"
        />
        <div className="flex gap-2 items-center mb-2">
          <input
            type="text"
            value={imageUrl}
            onChange={e => setImageUrl(e.target.value)}
            className="input-field flex-1"
            placeholder="Or paste image URL here"
          />
        </div>
        {imageUrl && (
          <img src={imageUrl} alt="Service" className="mt-2 rounded shadow w-32 h-20 object-cover" />
        )}
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">Key Features</label>
        {keyFeatures.map((feature, idx) => (
          <div key={idx} className="flex gap-2 mb-2">
            <input
              type="text"
              value={feature}
              onChange={e => {
                const updated = [...keyFeatures];
                updated[idx] = e.target.value;
                setKeyFeatures(updated);
              }}
              className="input-field flex-1"
              placeholder={`Feature ${idx + 1}`}
            />
            <button
              type="button"
              className="px-2 text-red-500"
              onClick={() => setKeyFeatures(keyFeatures.filter((_, i) => i !== idx))}
              disabled={keyFeatures.length === 1}
            >
              &minus;
            </button>
          </div>
        ))}
        <button
          type="button"
          className="text-primary text-sm mt-1"
          onClick={() => setKeyFeatures([...keyFeatures, ''])}
        >
          + Add Feature
        </button>
      </div>
      {type === 'Photographer' && (
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Photographer Name</label>
            <input
              type="text"
              value={photographerName}
              onChange={e => setPhotographerName(e.target.value)}
              className="input-field w-full"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Rating (0-5)</label>
            <input
              type="number"
              min="0"
              max="5"
              step="0.1"
              value={photographerRating}
              onChange={e => setPhotographerRating(e.target.value)}
              className="input-field w-full"
            />
          </div>
        </div>
      )}
      {error && <p className="text-error text-sm">{error}</p>}
      {success && <p className="text-success text-sm">{success}</p>}
      <button type="submit" className="btn-primary w-full" disabled={loading}>
        {loading ? (service && service._id ? 'Saving...' : 'Adding...') : (service && service._id ? 'Save Details' : 'Add Service')}
      </button>
    </form>
    </>
  );
};

export default AddServiceForm;
