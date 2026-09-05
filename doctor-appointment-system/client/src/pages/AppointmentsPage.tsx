import React, { useEffect, useState } from 'react';
import { getAppointments, createAppointment, deleteAppointment } from '../services/appointmentService';
import { getDoctors } from '../services/doctorService';
import { getPatients } from '../services/patientService';

const AppointmentsPage: React.FC = () => {
  const [appointments, setAppointments] = useState<any[]>([]);
  const [doctors, setDoctors] = useState<any[]>([]);
  const [patients, setPatients] = useState<any[]>([]);

  const [formData, setFormData] = useState({
    patientId: '',
    doctorId: '',
    problem: '',
    appointmentDate: ''
  });

  const loadAllData = async () => {
    try {
      const [apptData, docData, patData] = await Promise.all([
        getAppointments(),
        getDoctors(),
        getPatients()
      ]);

      setAppointments(Array.isArray(apptData) ? apptData : apptData?.data || []);
      setDoctors(Array.isArray(docData) ? docData : docData?.data || []);
      setPatients(Array.isArray(patData) ? patData : patData?.data || []);
    } catch (err) {
      console.error('Data Loading Error:', err);
    }
  };

  useEffect(() => {
    loadAllData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await createAppointment(formData);
      setFormData({ patientId: '', doctorId: '', problem: '', appointmentDate: '' });
      loadAllData();
    } catch (err) {
      console.error('Error creating appointment:', err);
    }
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this appointment?')) {
      try {
        await deleteAppointment(id);
        loadAllData();
      } catch (err) {
        console.error('Error deleting appointment:', err);
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Appointment Management</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px', margin: '0 auto 30px' }}>
        <label>
          <strong>Patient:</strong>
          <select name="patientId" value={formData.patientId} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
            <option value="">-- Select Patient --</option>
            {patients.map((pat) => (
              <option key={pat._id} value={pat._id}>
                {pat.name} ({pat.phone})
              </option>
            ))}
          </select>
        </label>

        <label>
          <strong>Doctor:</strong>
          <select name="doctorId" value={formData.doctorId} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }}>
            <option value="">-- Select Doctor --</option>
            {doctors.map((doc) => (
              <option key={doc._id} value={doc._id}>
                {doc.name} - {doc.specialization}
              </option>
            ))}
          </select>
        </label>

        <label>
          <strong>Problem:</strong>
          <input type="text" name="problem" value={formData.problem} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </label>

        <label>
          <strong>Appointment Date:</strong>
          <input type="date" name="appointmentDate" value={formData.appointmentDate} onChange={handleChange} required style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
        </label>

        <button type="submit" style={{ padding: '10px', marginTop: '10px', cursor: 'pointer' }}>Create Appointment</button>
      </form>

      {/* Table */}
      <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Patient Name</th>
            <th>Doctor Name</th>
            <th>Problem</th>
            <th>Appointment Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {appointments.length > 0 ? (
            appointments.map((appt) => (
              <tr key={appt._id}>
                <td>{appt.patientId?.name || appt.patientName || 'N/A'}</td>
                <td>{appt.doctorId?.name || appt.doctorName || 'N/A'}</td>
                <td>{appt.problem}</td>
                <td>{new Date(appt.appointmentDate).toLocaleDateString()}</td>
                <td>
                  <button onClick={() => handleDelete(appt._id)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={5}>No appointments found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppointmentsPage;