import React from 'react';
import type { Appointment } from '../types/appointment';

interface Props {
  appointments: Appointment[];
}

export const AppointmentList: React.FC<Props> = ({ appointments }) => (
  <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
    <thead>
      <tr>
        <th>Patient Name</th>
        <th>Doctor Name</th>
        <th>Problem</th>
        <th>Appointment Date</th>
      </tr>
    </thead>
    <tbody>
      {appointments.length === 0 ? (
        <tr>
          <td colSpan={4} style={{ textAlign: 'center' }}>No appointments found.</td>
        </tr>
      ) : (
        appointments.map((apt) => (
          <tr key={apt._id}>
            <td>{typeof apt.patientId === 'object' ? apt.patientId.name : 'N/A'}</td>
            <td>{typeof apt.doctorId === 'object' ? apt.doctorId.name : 'N/A'}</td>
            <td>{apt.problem}</td>
            <td>{apt.appointmentDate}</td>
          </tr>
        ))
      )}
    </tbody>
  </table>
);

export default AppointmentList;