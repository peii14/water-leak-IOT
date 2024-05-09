import Cookies from 'universal-cookie';

const cookies = new Cookies();

export const getToken = (): string => {
  return cookies.get('@mythesis/token');
};

export const setToken = (token: string) => {
  cookies.set('@mythesis/token', token, {
    path: '/',
  });
};

export const removeToken = () => {
  cookies.remove('@mythesis/token', {
    path: '/',
  });
};
