import axios from 'axios';

const FRONTEND_BASE = '';
const BACKEND_BASE = process?.env?.NEXT_PUBLIC_API_URL
  ? process.env.NEXT_PUBLIC_API_URL.replace(/\/+$/, '')
  : 'https://inrext-backend.vercel.app';

export const api = axios.create({ baseURL: FRONTEND_BASE });
export const backendApi = axios.create({ baseURL: BACKEND_BASE });

// Attach token automatically if present
const attachToken = (config: any) => {
  try {
    const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
    if (token) {
      config.headers = config.headers || {};
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (e) {
    // ignore
  }
  return config;
};

api.interceptors.request.use(attachToken, (err) => Promise.reject(err));
backendApi.interceptors.request.use(attachToken, (err) => Promise.reject(err));

export const BACKEND_BASE_URL = BACKEND_BASE;

export default api;
