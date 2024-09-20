import axios, { type AxiosInstance } from 'axios';
import { env } from 'next-runtime-env';
import authConfig from 'src/configs/auth';

/**
 * Creates an Axios instance for interacting with the Node-RED REST API.
 *
 * @param {string} [baseURL] - Optional base URL for the Node-RED REST API.
 * @returns {AxiosInstance} - The Axios instance for interacting with the Node-RED REST API.
 */
const apiNodeRed = (baseURL?: string): AxiosInstance => {
  // Create a new Axios instance with the provided base URL or the default one from the environment variables.
  const instance = axios.create({
    baseURL: baseURL || env('NEXT_PUBLIC_REST_API_NODERED_URL'), // The base URL for the Node-RED REST API.
    timeout: 30000 // The timeout for the requests in milliseconds.
  });

  // Add a request interceptor to the Axios instance.
  // This interceptor will set the Authorization header with the access token obtained from the local storage.
  instance.interceptors.request.use(
    config => {
      // Get the access token from the local storage.
      const accessToken = localStorage.getItem(authConfig.accessTokenKeyName);

      // If an access token is present, add it to the Authorization header.
      if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
      }

      // Return the modified config object.
      return config;
    },
    // If an error occurs during the request, reject the promise with the error.
    error => Promise.reject(error)
  );

  // Return the Axios instance.
  return instance;
};

export default apiNodeRed
