import axios from 'axios';

const api = axios.create({
  baseURL: 'http://10.0.2.2:3000',
});

const STATUS_UNAUTHORIZED = 401;

export const setClientToken = async (token: string | undefined) =>
  api.interceptors.request.use(async config => {
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  });

export const interceptorUnauthorized = async (handle: Function) =>
  api.interceptors.response.use(
    _ => _,
    async error => {
      if (error.response?.status === STATUS_UNAUTHORIZED) {
        await handle();
      }
      return Promise.reject(error);
    },
  );

export default api;
