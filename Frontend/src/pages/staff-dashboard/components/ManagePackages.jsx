import React, { useState } from "react";
import { addNewPackage, deletePackage, updatePackage } from 'api/dashboard';

export default function ManagePackages({ packages, setPackages }) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState({
    title: '',
    type: '',
    priceRange: '',
    price: '',
    image: '',
    rating: '',
    reviewCount: '',
    availability: '',
    features: '',
    description: '',
    timeline: ''
  });
  const [error, setError] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [featureInputs, setFeatureInputs] = useState(['', '', '', '']);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleFeatureChange = (idx, value) => {
    const updated = [...featureInputs];
    updated[idx] = value;
    setFeatureInputs(updated);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.title || !form.type || !form.price || !form.availability) {
      setError('Please fill all required fields.');
      return;
    }
    setError('');
    try {
      const features = featureInputs.filter(f => f.trim() !== '');
      const payload = {
        ...form,
        features
      };
      let pkgResult;
      if (editingId) {
        pkgResult = await updatePackage(editingId, payload);
        setPackages(packages.map(p => (p._id === editingId ? pkgResult : p)));
      } else {
        pkgResult = await addNewPackage(payload);
        setPackages([pkgResult, ...packages]);
      }
      setForm({ title: '', type: '', priceRange: '', price: '', image: '', rating: '', reviewCount: '', availability: '', features: '', description: '', timeline: '' });
      setFeatureInputs(['', '', '', '']);
      setShowForm(false);
      setEditingId(null);
    } catch (err) {
      setError('Failed to add package.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-purple-800">Manage Packages</h2>
        <button
          className="bg-purple-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-purple-700 transition"
          onClick={() => setShowForm(true)}
        >
          Add New Package
        </button>
      </div>
      {showForm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
          <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-8 w-full max-w-lg relative mx-2 sm:mx-0 overflow-y-auto max-h-[90vh]">
            <button className="absolute top-3 right-3 text-gray-400 hover:text-purple-600" onClick={() => setShowForm(false)}>
              <span className="text-2xl">&times;</span>
            </button>
            <h3 className="text-xl font-bold text-purple-800 mb-4">Add New Package</h3>
            <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
              <input name="title" value={form.title} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Title*" required />
              <input name="type" value={form.type} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Type*" required />
              <input name="priceRange" value={form.priceRange} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Price Range (e.g. 1000-2000)" />
              <input name="price" value={form.price} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Price*" type="number" required />
              <input name="image" value={form.image} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Image URL" />
              <input name="rating" value={form.rating} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Rating (e.g. 4.5)" />
              <input name="reviewCount" value={form.reviewCount} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Review Count" />
              <input name="availability" value={form.availability} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Availability*" required />
              <label className="font-medium">Key Features (4):</label>
              <div className="grid grid-cols-2 gap-2">
                {featureInputs.map((val, idx) => (
                  <input
                    key={idx}
                    type="text"
                    className="border rounded-lg px-4 py-2"
                    placeholder={`Feature ${idx + 1}`}
                    value={val}
                    onChange={e => handleFeatureChange(idx, e.target.value)}
                    maxLength={40}
                  />
                ))}
              </div>
              <textarea name="description" value={form.description} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Description" rows={2} />
              <textarea name="timeline" value={form.timeline} onChange={handleChange} className="border rounded-lg px-4 py-2" placeholder="Timeline" rows={2} />
              {error && <div className="text-red-500">{error}</div>}
              <button type="submit" className="bg-green-600 text-white px-4 py-2 rounded-lg font-medium hover:bg-green-700 transition">Add Package</button>
            </form>
          </div>
        </div>
      )}
      {packages.length === 0 ? (
        <div className="text-gray-400">No packages found.</div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {packages.map((pkg, idx) => (
            <div key={pkg._id || idx} className="p-4 rounded-lg border bg-purple-50 flex flex-col gap-1">
              <div className="font-semibold text-lg">{pkg.title}</div>
              <div className="text-sm text-gray-500">{pkg.type} • Rs {pkg.price}</div>
              {pkg.priceRange && <div className="text-xs text-gray-700">Price Range: {pkg.priceRange}</div>}
              {pkg.rating && <div className="text-xs text-yellow-600">Rating: {pkg.rating} ⭐</div>}
              {pkg.reviewCount && <div className="text-xs text-gray-500">Reviews: {pkg.reviewCount}</div>}
              <div className="text-xs text-gray-700">Availability: {pkg.availability}</div>
              {pkg.features && <div className="text-xs text-purple-700 mt-1">Features: {pkg.features}</div>}
              {pkg.image && <img src={pkg.image} alt={pkg.title} className="w-full h-32 object-cover rounded mt-2" />}
              {pkg.description && <div className="text-sm text-gray-600 mt-2">{pkg.description}</div>}
              {pkg.timeline && <div className="text-xs text-gray-500 mt-1">Timeline: {pkg.timeline}</div>}
              <div className="flex gap-2 mt-2 self-end">
                <button
                  className="bg-blue-600 text-white px-3 py-1 rounded hover:bg-blue-700 transition"
                  onClick={() => {
                    setShowForm(true);
                    setEditingId(pkg._id);
                    setForm({ ...pkg, features: Array.isArray(pkg.features) ? pkg.features.join(', ') : pkg.features });
                  }}
                >
                  Edit
                </button>
                <button
                  className="bg-red-600 text-white px-3 py-1 rounded hover:bg-red-700 transition"
                  onClick={async () => {
                    if(window.confirm('Are you sure you want to delete this package?')) {
                      try {
                        await deletePackage(pkg._id);
                        setPackages(packages.filter((p) => p._id !== pkg._id));
                      } catch (err) {
                        alert('Failed to delete package.');
                      }
                    }
                  }}
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
