import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const api = axios.create({
  baseURL: 'https://call-your-driver-backend.vercel.app/api',
  // baseURL: 'http://192.168.8.100:5000/api',
});

api.interceptors.request.use(async (config) => {
  const token = await AsyncStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const login = async (username: string, password: string) => {
  const { data } = await api.post('/users/login', { username, password });
  await AsyncStorage.setItem('token', data.token);
};

export const register = async (name: string, username: string, password: string, contactNumber: string) => {
  await api.post('/users/register', { name, username, password, contactNumber });
};

export const suggestDriver = async (parkName: string, category: string) => {
  console.log(category)
  return api.post('/drivers/suggest', { parkName, category });
};

export const logout = async () => {
  await AsyncStorage.removeItem('token');
};

export const deductPoints = async (contactNumber: string) => {
  return api.post('/drivers/deductPoints', { contactNumber });
};

export const getParks = async () => api.get('/parks');
export const getCategories = async () => api.get('/categories');

export const resetPassword = async (username: string, newPassword: string) => {
  await api.post('/users/reset-password', { username, newPassword });
};