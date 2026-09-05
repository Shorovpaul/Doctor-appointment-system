import axios from 'axios';

// Environment variable handling
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api';

export const getPatients = async () => {
  const response = await axios.get(`${API_BASE_URL}/patient-list/get`);
  return response.data;
};

export const getPatientById = async (id: string) => {
  // Correct API Endpoint as per requirement: /api/patient/:id/get
  const response = await axios.get(`${API_BASE_URL}/patient/${id}/get`);
  return response.data;
};

export const getPatientAppointments = async (id: string) => {
  // Correct API Endpoint as per requirement: /api/patient/:id/appointment-list/get
  const response = await axios.get(`${API_BASE_URL}/patient/${id}/appointment-list/get`);
  return response.data;
};

export const createPatient = async (data: any) => {
  const response = await axios.post(`${API_BASE_URL}/patient/create`, data);
  return response.data;
};

export const updatePatient = async (id: string, data: any) => {
  const response = await axios.put(`${API_BASE_URL}/patient/${id}/update`, data);
  return response.data;
};

export const deletePatient = async (id: string) => {
  const response = await axios.delete(`${API_BASE_URL}/patient/${id}/delete`);
  return response.data;
};