import axios, { AxiosRequestConfig, AxiosResponse } from 'axios';

export const AxiosInterceptor = () => {
  const updateHeader = (request: any) => {
    if (request.data instanceof FormData) {
      const newHeaders = {
        'Access-Control-Allow-Origin': 'multipart/form-data',
      };
      request.headers = { ...request.headers, ...newHeaders };
    } else {
      const newHeaders = {
        'Content-Type': 'application/json',
        'Access-Control-Allow-Origin': '*',
      };
      request.headers = { ...request.headers, ...newHeaders };
    }
    return request;
  };

  axios.interceptors.request.use((request: AxiosRequestConfig) => updateHeader(request));

  axios.interceptors.response.use(
    (response: AxiosResponse) => {
      return response.data || response;
    },
    error => {
      throw error.response?.data || error;
    }
  );
};
