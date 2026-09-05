import { Patient } from './patient';
import { Doctor } from './doctor';

export interface Appointment {
  _id?: string;
  patientId: string | Patient;
  doctorId: string | Doctor;
  problem: string;
  appointmentDate: string;
}