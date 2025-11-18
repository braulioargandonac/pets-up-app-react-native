import axios from 'axios';
import { getToken } from './tokenService';

const YOUR_MAC_IP_ADDRESS = '192.168.1.181'; 

const api = axios.create({
  baseURL: `http://${YOUR_MAC_IP_ADDRESS}:3000/api/v1`,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  async (config) => {
    const token = await getToken();

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    
    return config;
  },
  (error) => {
    return Promise.reject(error);
  },
);

export default api;