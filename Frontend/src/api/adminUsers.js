import axios from 'axios';
import { getToken } from 'utils/auth';

export const fetchAllUsers = async (role) => {
  const token = getToken();
  const res = await axios.get('/api/admin/users' + (role ? `?role=${role}` : ''), {
    headers: { Authorization: `Bearer ${token}` }
  });
  return res.data;
};
