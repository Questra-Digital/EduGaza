import Cookies from 'js-cookie';

export interface User {
  email: string;
  isAuthenticated: boolean;
}

export const AUTH_COOKIE = 'auth_token';
export const USER_COOKIE = 'user_data';

export const setAuthToken = (token: string, userData: User) => {
  Cookies.set(AUTH_COOKIE, token, { expires: 7, secure: true, sameSite: 'strict' });
  Cookies.set(USER_COOKIE, JSON.stringify(userData), { expires: 7, secure: true, sameSite: 'strict' });
};

export const getAuthToken = (): string | null => {
  return Cookies.get(AUTH_COOKIE) || null;
};

export const getUserData = (): User | null => {
  const userData = Cookies.get(USER_COOKIE);
  return userData ? JSON.parse(userData) : null;
};

export const clearAuth = () => {
  Cookies.remove(AUTH_COOKIE);
  Cookies.remove(USER_COOKIE);
};

export const isAuthenticated = (): boolean => {
  const token = getAuthToken();
  const userData = getUserData();
  return !!(token && userData?.isAuthenticated);
};