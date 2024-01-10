import axios from 'axios';

export const API_URL = import.meta.env.VITE_API_URL + 'api'

const instance = axios.create({
  withCredentials: true,
  baseURL: API_URL
});

instance.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${localStorage.getItem('token')}`
  return config
})

instance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401) {
      const response = await instance.get(`${API_URL}/user/refresh`);
      localStorage.setItem('token', response.data.accessToken);
      return instance(originalRequest);
    }
    return Promise.reject(error);
  }
);

export default instance;
