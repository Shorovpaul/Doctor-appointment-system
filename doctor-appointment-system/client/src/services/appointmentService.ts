import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const getAppointments = async () => {
  const response = await axios.get(`${API_BASE_URL}/appointment-list/get`);
  return response.data;
};

export const createAppointment = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/appointment/create`, data);
  return response.data;
};

export const updateAppointment = async (id: string, data: any) => {
  const response = await axios.put(`${API_BASE_URL}/appointment/${id}/update`, data);
  return response.data;
};

export const deleteAppointment = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/appointment/${id}/delete`);
  return response.data;
};