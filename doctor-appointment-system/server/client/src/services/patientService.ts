import axios from 'axios';

const API_URL = 'http://localhost:5000/api/patients';

export const getPatients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getPatientById = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const getPatientAppointments = async (id: string) => {
  const response = await axios.get(`${API_URL}/${id}/appointments`);
  return response.data;
};

export const createPatient = async (patientData: any) => {
  const response = await axios.post(API_URL, patientData);
  return response.data;
};

export const updatePatient = async (id: string, patientData: any) => {
  const response = await axios.put(`${API_URL}/${id}`, patientData);
  return response.data;
};

export const deletePatient = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};