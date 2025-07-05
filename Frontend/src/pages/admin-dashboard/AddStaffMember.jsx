import React, { useState } from "react";
import Icon from "../../components/AppIcon";
import { createClerkUser } from "../../api/admin";

const AddStaffMember = ({ onClose, onAdd }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [role, setRole] = useState("");
  const [password, setPassword] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    try {
      // Only set role to 'staff', do not send staffRole in metadata
      await createClerkUser(email, password, name, 'staff');
      setSuccess("Staff member added!");
      setTimeout(() => {
        setSuccess("");
        setName("");
        setEmail("");
        setRole("");
        setPassword("");
        if (onClose) onClose();
        if (onAdd) onAdd();
      }, 1200);
    } catch (err) {
      setError(
        err?.response?.data?.error || err.message || "Failed to add staff member."
      );
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-30">
      <div className="bg-white rounded-2xl shadow-lg p-8 w-full max-w-md relative">
        <button className="absolute top-3 right-3 text-gray-400 hover:text-purple-600" onClick={onClose}>
          <Icon name="X" size={22} />
        </button>
        <h3 className="text-xl font-bold text-purple-800 mb-4 flex items-center gap-2">
          <Icon name="UserPlus" size={20} /> Add Staff Member
        </h3>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input type="text" className="border rounded-lg px-4 py-2" placeholder="Full Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="email" className="border rounded-lg px-4 py-2" placeholder="Email" value={email} onChange={e => setEmail(e.target.value)} required />
          <input type="password" className="border rounded-lg px-4 py-2" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} required />
          <select
            className="border rounded-lg px-4 py-2"
            value={role}
            onChange={e => setRole(e.target.value)}
            required
          >
            <option value="" disabled>Select Role</option>
            <option value="staff">Staff</option>
          </select>
          <button type="submit" className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-2 rounded-lg mt-2">Add Staff Member</button>
        </form>
        {success && <div className="text-center text-green-600 mt-3">{success}</div>}
        {error && <div className="text-center text-red-600 mt-3">{error}</div>}
      </div>
    </div>
  );
};

export default AddStaffMember;
