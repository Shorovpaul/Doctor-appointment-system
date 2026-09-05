import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Doctor } from '../types/doctor';
import type { Appointment } from '../types/appointment';
import { getDoctorById } from '../services/doctorService';
import { getAppointments } from '../services/appointmentService';

const DoctorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (id) {
      getDoctorById(id).then(setDoctor).catch(console.error);
      getAppointments().then((apts) => {
        const filtered = apts.filter((a) => 
          typeof a.doctorId === 'object' ? a.doctorId._id === id : a.doctorId === id
        );
        setAppointments(filtered);
      }).catch(console.error);
    }
  }, [id]);

  if (!doctor) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading doctor details...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/doctors" style={{ textDecoration: 'none', color: '#0066cc', fontWeight: 'bold' }}>
        ← Back to Doctors
      </Link>

      <h2 style={{ marginTop: '15px' }}>Doctor Details</h2>
      <div style={{ background: '#f9f9f9', padding: '15px', borderRadius: '5px', marginBottom: '20px' }}>
        <p><strong>Name:</strong> {doctor.name}</p>
        <p><strong>Phone:</strong> {doctor.phone}</p>
        <p><strong>Age:</strong> {doctor.age}</p>
        <p><strong>Gender:</strong> {doctor.gender}</p>
        <p><strong>Specialization:</strong> {doctor.specialization}</p>
      </div>

      <h3>Scheduled Appointments</h3>
      {appointments.length === 0 ? (
        <p>No appointments found for this doctor.</p>
      ) : (
        <ul style={{ lineHeight: '1.8' }}>
          {appointments.map((apt) => (
            <li key={apt._id}>
              <strong>Patient:</strong> {typeof apt.patientId === 'object' ? apt.patientId.name : apt.patientId} | {' '}
              <strong>Problem:</strong> {apt.problem} | {' '}
              <strong>Date:</strong> {apt.appointmentDate}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default DoctorDetailsPage;