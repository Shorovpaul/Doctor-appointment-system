import React, { useState } from 'react';
import type { Patient } from '../types/patient';
import type { Doctor } from '../types/doctor';
import type { Appointment } from '../types/appointment';

interface Props {
  patients: Patient[];
  doctors: Doctor[];
  onSubmit: (appointment: Partial<Appointment>) => void;
}

export const AppointmentForm: React.FC<Props> = ({ patients, doctors, onSubmit }) => {
  const [patientId, setPatientId] = useState('');
  const [doctorId, setDoctorId] = useState('');
  const [problem, setProblem] = useState('');
  const [appointmentDate, setAppointmentDate] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ patientId, doctorId, problem, appointmentDate });

    // সফল সাবমিটের পর সবগুলো ইনপুট ফিল্ড রিসেট করা হচ্ছে
    setPatientId('');
    setDoctorId('');
    setProblem(''); 
    setAppointmentDate('');
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '300px' }}>
      <select value={patientId} onChange={(e) => setPatientId(e.target.value)} required>
        <option value="">Select Patient</option>
        {patients.map((p) => <option key={p._id} value={p._id}>{p.name}</option>)}
      </select>
      
      <select value={doctorId} onChange={(e) => setDoctorId(e.target.value)} required>
        <option value="">Select Doctor</option>
        {doctors.map((d) => <option key={d._id} value={d._id}>{d.name} ({d.specialization})</option>)}
      </select>

      <input type="text" placeholder="Problem" value={problem} onChange={(e) => setProblem(e.target.value)} required />
      <input type="date" value={appointmentDate} onChange={(e) => setAppointmentDate(e.target.value)} required />
      
      <button type="submit">Create Appointment</button>
    </form>
  );
};