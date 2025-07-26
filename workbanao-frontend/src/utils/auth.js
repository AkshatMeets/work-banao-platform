import { jwtDecode } from 'jwt-decode';

export const decodeToken = (token) => {
  try {
    if (!token) {
      console.log('No token found in localStorage');
      return null;
    }
    return jwtDecode(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

export const getUserId = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) {
    console.log('No token found in localStorage');
    return null;
  }

  const decoded = decodeToken(token);
  if (!decoded) {
    console.log('Failed to decode token');
    return null;
  }

  console.log('Decoded token payload:', decoded); // Debug entire payload

  const userId = decoded.userId || decoded.sub || decoded.id || decoded.username;
  console.log('Extracted user ID:', userId);

  if (!userId) {
    console.warn('No valid userId found in token payload');
    return null;
  }

  // Convert to string and validate
  const userIdStr = String(userId);
  if (userIdStr.includes(':')) {
    console.warn('Invalid userId format (contains colon):', userIdStr);
    return null;
  }

  return userIdStr;
};

export const getUserRole = () => {
  return localStorage.getItem('role') || null;
};

export const isAuthenticated = () => {
  const token = localStorage.getItem('accessToken');
  if (!token) return false;

  const decoded = decodeToken(token);
  if (!decoded) return false;

  const currentTime = Date.now() / 1000;
  return decoded.exp > currentTime;
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
  localStorage.removeItem('role');
  localStorage.removeItem('userId');
  window.location.href = '/login';
};