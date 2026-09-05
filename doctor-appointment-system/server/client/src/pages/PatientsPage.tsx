import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Patient } from '../types/patient';
import type { Appointment } from '../types/appointment';
import { getPatientById, getPatientAppointments } from '../services/patientService';

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (id) {
      getPatientById(id).then(setPatient).catch(console.error);
      getPatientAppointments(id).then(setAppointments).catch(console.error);
    }
  }, [id]);

  if (!patient) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/patients">← Back to Patients</Link>
      <h2>Patient Details</h2>
      <p><strong>Name:</strong> {patient.name}</p>
      <p><strong>Phone:</strong> {patient.phone}</p>
      <p><strong>Age:</strong> {patient.age}</p>

      <h3>Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments found for this patient.</p>
      ) : (
        <ul>
          {appointments.map((apt) => (
            <li key={apt._id}>
              Doctor: {typeof apt.doctorId === 'object' ? apt.doctorId.name : 'N/A'} - Problem: {apt.problem}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientDetailsPage;