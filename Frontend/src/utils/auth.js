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
  
  if (payload.exp && Date.now() >= payload.exp * 1000) {
    removeToken();
    return false;
  }
  return true;
}

export function parseJwt(token) {
  try {
    const payload = JSON.parse(atob(token.split('.')[1]));
    if (payload.exp && Date.now() >= payload.exp * 1000) {
      return null;
    }
    return payload;
  } catch {
    return null;
  }
}
