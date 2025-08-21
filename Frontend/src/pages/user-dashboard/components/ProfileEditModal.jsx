import React, { useState, useEffect } from 'react';
import Icon from 'components/AppIcon';

const ProfileEditModal = ({ user, open, onClose, onSave }) => {
  const [form, setForm] = useState({
    email: user?.email || '',
    name: user?.name || user?.username || '',
    password: '',

  });

  useEffect(() => {
    if (open) {
      setForm({
        email: user?.email || '',
        name: user?.name || user?.username || '',
        password: '',
      });
    }
  }, [open, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave(form);
    setForm((prev) => ({ ...prev, password: '' })); 
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-40">
      <div className="bg-white rounded-xl shadow-xl p-8 w-full max-w-md relative animate-fade-in">
        <button onClick={onClose} className="absolute top-3 right-3 text-text-secondary hover:text-error">
          <Icon name="X" size={22} />
        </button>
        <h2 className="text-2xl font-bold mb-6 text-center">Edit Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col items-center mb-4">
            <span className="text-xs text-text-secondary mt-2">Click to change profile picture</span>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Username</label>
            <input type="text" name="name" value={form.name} onChange={handleChange} className="input w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} className="input w-full" required />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} className="input w-full" placeholder="New password" />
          </div>
          <button type="submit" className="btn-primary w-full mt-4">Save Changes</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileEditModal;
