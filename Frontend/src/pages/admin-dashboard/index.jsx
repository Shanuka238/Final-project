import React, { useEffect, useState } from 'react';
import { fetchClerkUsers, createClerkUser, deleteClerkUser } from 'api/admin';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');

  useEffect(() => {
    fetchClerkUsers()
      .then(setUsers)
      .catch(() => setUsers([]))
      .finally(() => setLoading(false));
  }, []);

  const handleAddUser = async (e) => {
    e.preventDefault();
    setError('');
    try {
      await createClerkUser(email, password, username, role);
      setEmail('');
      setPassword('');
      setUsername('');
      setRole('user');
      const updated = await fetchClerkUsers();
      setUsers(updated);
    } catch (err) {
      // Show detailed error from backend if available
      if (err.response && err.response.data && err.response.data.error) {
        let errorMsg = err.response.data.error;
        if (typeof errorMsg === 'object') {
          errorMsg = JSON.stringify(errorMsg);
        }
        setError('Failed to add user: ' + errorMsg);
      } else {
        setError('Failed to add user');
      }
    }
  };

  const handleDeleteUser = async (userId) => {
    try {
      await deleteClerkUser(userId);
      setUsers(users.filter(u => u.id !== userId));
    } catch {
      setError('Failed to delete user');
    }
  };

  // Helper to get email from Clerk user object
  const getEmail = (user) => {
    if (user.emailAddresses && user.emailAddresses.length > 0) {
      // Clerk API returns emailAddresses or email_addresses depending on version
      return user.emailAddresses[0].emailAddress || user.emailAddresses[0].email_address;
    }
    if (user.email_addresses && user.email_addresses.length > 0) {
      return user.email_addresses[0].email_address;
    }
    return '';
  };

  return (
    <div className="max-w-3xl mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Admin Dashboard</h1>
      <form onSubmit={handleAddUser} className="mb-6 flex gap-2 flex-wrap">
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} placeholder="Username" required className="border p-2 rounded" />
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email" required className="border p-2 rounded" />
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} placeholder="Password" required className="border p-2 rounded" />
        <select value={role} onChange={e => setRole(e.target.value)} className="border p-2 rounded" required>
          <option value="service_provider">Service Provider</option>
        </select>
        <button type="submit" className="btn-primary">Add Service Provider</button>
      </form>
      {error && <div className="text-red-500 mb-4">{error}</div>}
      {loading ? <div>Loading users...</div> : (
        <table className="w-full border text-left">
          <thead>
            <tr className="bg-gray-100">
              <th className="p-2 text-left">Username</th>
              <th className="p-2 text-left">Email</th>
              <th className="p-2 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.filter(user => user.publicMetadata?.role === 'service_provider' || user.public_metadata?.role === 'service_provider').map(user => (
              <tr key={user.id} className="border-t">
                <td className="p-2 align-middle">{user.username}</td>
                <td className="p-2 align-middle">{getEmail(user)}</td>
                <td className="p-2 align-middle">
                  <button onClick={() => handleDeleteUser(user.id)} className="btn-secondary">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default AdminDashboard;
