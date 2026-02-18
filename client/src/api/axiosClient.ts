import axios, { AxiosError } from 'axios';
import type { InternalAxiosRequestConfig } from 'axios';

interface BackendError {
  success: boolean;
  status: number;
  message: string;
  error?: string;
  timestamp?: string;
  stack?: string;
}

const axiosClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000,
});

/**
 * REQUEST INTERCEPTOR
 */
axiosClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    // const token = localStorage.getItem('token');
    // if (token && config.headers) {
    //   config.headers.Authorization = `Bearer ${token}`;
    // }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

/**
 * RESPONSE INTERCEPTOR
 */
axiosClient.interceptors.response.use(
  (response) => {
    // console.log("API Response:", response);
    return response;
  },
  (error: AxiosError<BackendError>) => {
    let errorMessage = "An unknown error occurred";

    if (error.response) {
      errorMessage = error.response.data?.message || errorMessage;
      switch (error.response.status) {
        case 401:
          console.error("Unauthorized");
          break;
        case 403:
          console.error("Forbidden - You don't have permission");
          break;
        case 500:
          console.error("Server Error - Internal Server Failure");
          break;
      }
    } else if (error.request) {
      errorMessage = "Network Error: Cannot reach the server. Please check your connection.";
    } else {
      errorMessage = error.message;
    }
    return Promise.reject({
      message: errorMessage,
      status: error.response?.status,
      originalError: error.response?.data
    });
  }
);

export default axiosClient;