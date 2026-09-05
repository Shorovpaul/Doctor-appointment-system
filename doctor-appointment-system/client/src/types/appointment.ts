import type { Patient } from './patient';
import type { Doctor } from './doctor';

export interface Appointment {
  _id?: string;
  patientId: string | Patient;
  doctorId: string | Doctor;
  problem: string;
  appointmentDate: string;
}