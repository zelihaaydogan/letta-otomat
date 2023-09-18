import axios from 'axios';
import { setSession } from './jwt';

const errorToast = (errorMessage) => {
  console.log(errorMessage);
};

const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_APP_API_ENDPOINT
    ? process.env.NEXT_PUBLIC_APP_API_ENDPOINT
    : typeof window !== 'undefined'
    ? window.location.origin
    : '',
  headers: {
    'Content-Type': 'application/json',
  },
});

axiosInstance.interceptors.request.use((request) => {
  if (!request.headers.Authorization) {
    const accessToken = localStorage.getItem('accessToken');
    if (accessToken) request.headers.Authorization = `Bearer ${accessToken}`;
  }

  return request;
});

axiosInstance.interceptors.response.use(
  (response) => {
    const { result } = response.data;
    if (result) errorToast(result.message);
    return (response || {}).data || undefined;
  },
  (error) => {
    if (!error.response) return Promise.reject('Unexpected Error');
    const { status, data = {} } = error.response;
    if (status === 401) {
      localStorage.removeItem('accessToken');
      window.location.href = '/';
    }

    return Promise.resolve(error.message);
  }
);

export default axiosInstance;
