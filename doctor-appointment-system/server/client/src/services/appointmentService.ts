import axios from 'axios';

// URL-এ /api যুক্ত করুন
const API_URL = 'http://localhost:5000/api/appointments';

export const getAppointments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const createAppointment = async (data: any) => {
  const response = await axios.post(API_URL, data);
  return response.data;
};

export const deleteAppointment = async (id: string) => {
  const response = await axios.delete(`${API_URL}/${id}`);
  return response.data;
};