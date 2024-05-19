import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3000',
  timeout: 10000,
  withCredentials: true,
});

api.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error.response?.status;
    const message = error.response?.data?.message || error.message;

    if (status === 401) {
      console.log('Unauthorized. Redirecting to home page...');
      window.location.href = 'http://localhost:8080'
    } else {
      console.log('Error:', status, message);
    }

    return Promise.reject(error)
  }
);

export default api;
