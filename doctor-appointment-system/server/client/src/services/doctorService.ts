import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const getDoctors = async () => {
  const response = await axios.get(`${API_BASE_URL}/doctor-list/get`);
  return response.data;
};

export const getDoctorById = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/doctor/${id}/get`);
  return response.data;
};

export const getDoctorAppointments = async (id: string) => {
  const response = await axios.get(`${API_BASE_URL}/doctor/${id}/appointment-list/get`);
  return response.data;
};

export const createDoctor = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/doctor/create`, data);
  return response.data;
};

export const updateDoctor = async (id: string, data: any) => {
  const response = await axios.put(`${API_BASE_URL}/doctor/${id}/update`, data);
  return response.data;
};

export const deleteDoctor = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/doctor/${id}/delete`);
  return response.data;
};