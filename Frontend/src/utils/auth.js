// Utility functions for JWT auth

export function setToken(token) {
  localStorage.setItem('token', token);
}

export function getToken() {
  return localStorage.getItem('token');
}

export function removeToken() {
  localStorage.removeItem('token');
}


export function isLoggedIn() {
  const token = getToken();
  if (!token) return false;
  const payload = parseJwt(token);
  if (!payload) return false;
  // Check for expiration (exp is in seconds)
  if (payload.exp && Date.now() >= payload.exp * 1000) {
    removeToken();
    return false;
  }
  return true;
}

export function parseJwt(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    // Optionally, check for exp here and return null if expired
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
