import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import type { Doctor } from '../types/doctor';
import type { Appointment } from '../types/appointment';
import { getDoctorById, getDoctorAppointments } from '../services/doctorService';

const DoctorDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [doctor, setDoctor] = useState<Doctor | null>(null);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  useEffect(() => {
    if (id) {
      getDoctorById(id).then(setDoctor).catch(console.error);
      getDoctorAppointments(id).then(setAppointments).catch(console.error);
    }
  }, [id]);

  if (!doctor) return <div style={{ padding: '20px', textAlign: 'center' }}>Loading...</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/doctors">← Back to Doctors</Link>
      <h2>Doctor Details</h2>
      <p><strong>Name:</strong> {doctor.name}</p>
      <p><strong>Phone:</strong> {doctor.phone}</p>
      <p><strong>Specialization:</strong> {doctor.specialization}</p>

      <h3>Appointments</h3>
      {appointments.map((apt) => (
        <li key={apt._id}>
          {typeof apt.patientId === 'object' ? apt.patientId.name : 'N/A'} - {apt.problem} ({apt.appointmentDate})
        </li>
      ))}
    </div>
  );
};

export default DoctorDetailsPage;