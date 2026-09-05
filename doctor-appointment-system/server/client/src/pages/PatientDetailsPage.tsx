import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Patient } from '../types/patient';
import type { Appointment } from '../types/appointment';
import { getPatientById } from '../services/patientService';
import { getAppointments } from '../services/appointmentService';

const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (id) {
      getPatientById(id).then(setPatient).catch(console.error);
      getAppointments().then((apts) => {
        const filtered = apts.filter((a) => 
          typeof a.patientId === 'object' ? a.patientId._id === id : a.patientId === id
        );
        setAppointments(filtered);
      }).catch(console.error);
    }
  }, [id]);

  if (!patient) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading patient details...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/patients" style={{ textDecoration: 'none', color: '#0066cc', fontWeight: 'bold' }}>
        ← Back to Patients
      </Link>

      <h2 style={{ marginTop: '15px' }}>Patient Details</h2>
      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
      </div>

      <h3>Appointments History</h3>
      {appointments.length === 0 ? (
        <p>No appointments found for this patient.</p>
      ) : (
        <ul style={{ lineHeight: '1.8' }}>
          {appointments.map((apt) => (
            <li key={apt._id}>
              <strong>Doctor:</strong> {typeof apt.doctorId === 'object' ? apt.doctorId.name : apt.doctorId} | {' '}
              <strong>Problem:</strong> {apt.problem} | {' '}
              <strong>Date:</strong> {apt.appointmentDate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default PatientDetailsPage;