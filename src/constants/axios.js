import axios from 'axios';

// Create an Axios instance with a base URL and default settings
const api = axios.create({
  baseURL: 'http://localhost:3000', // Base URL for all requests
  timeout: 10000, // Set a default timeout (optional)
});

// Optional: Add request interceptors to attach headers or tokens
api.interceptors.request.use(
  (config) => {
    // Modify the request config before sending (e.g., add authorization headers)
    // config.headers.Authorization = 'Bearer ' + yourAuthToken;
    return config;
  },
  (error) => Promise.reject(error) // Handle request errors
);

// Optional: Add response interceptors to handle responses or errors
api.interceptors.response.use(
  (response) => response, // Pass through successful responses
  (error) => {
    // Handle response errors (e.g., log out on unauthorized response)
    console.error('Axios error:', error);
    return Promise.reject(error); // Propagate the error to the component
  }
);

export default api;
