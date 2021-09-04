import authService from '@/services/authService';
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';

const instance = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
});

instance.interceptors.request.use(async (config: AxiosRequestConfig) => {
  const accessToken = await authService.getAccessToken();
  if (accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
},
(error: AxiosError) => {
  Promise.reject(error);
});

instance.interceptors.response.use((response: AxiosResponse) => {
  return response;
}, (error: AxiosError) => {
  console.log('API Error', error);
  throw error;
});

const get = (resource: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return instance.get(resource, config);
};

const post = (resource: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return instance.post(resource, data, config);
};

const put = (resource: string, data?: any, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return instance.put(resource, data, config);
};

const destroy = (resource: string, config?: AxiosRequestConfig): Promise<AxiosResponse> => {
  return instance.delete(resource, config);
};

export default {
  get,
  post,
  put,
  delete: destroy,
};
