import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getPatientById, getPatientAppointments } from '../services/patientService';

export const PatientDetailsPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [patient, setPatient] = useState<any>(null);
  const [appointments, setAppointments] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const pData = await getPatientById(id);
        const aData = await getPatientAppointments(id);

        setPatient(pData?.data || pData);
        setAppointments(Array.isArray(aData) ? aData : aData?.data || []);
      } catch (err) {
        console.error('Error loading patient details:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [id]);

  if (loading) return <div style={{ padding: '20px' }}>Loading...</div>;
  if (!patient) return <div style={{ padding: '20px' }}>Patient not found.</div>;

  return (
    <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
      <Link to="/patients">&larr; Back to Patients</Link>
      
      <h2>Patient Details</h2>
      <div style={{ padding: '15px', border: '1px solid #ccc', borderRadius: '5px', marginBottom: '20px' }}>
        <p><strong>Name:</strong> {patient.name}</p>
        <p><strong>Phone:</strong> {patient.phone}</p>
        <p><strong>Age:</strong> {patient.age}</p>
        <p><strong>Gender:</strong> {patient.gender}</p>
      </div>

      <h3>Appointments</h3>
      {appointments.length > 0 ? (
        <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Doctor Name</th>
              <th>Specialization</th>
              <th>Problem</th>
              <th>Appointment Date</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((app) => (
              <tr key={app._id}>
                <td>{typeof app.doctorId === 'object' ? app.doctorId?.name : 'N/A'}</td>
                <td>{typeof app.doctorId === 'object' ? app.doctorId?.specialization : 'N/A'}</td>
                <td>{app.problem}</td>
                <td>{new Date(app.appointmentDate).toLocaleDateString('en-GB')}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No appointments found for this patient.</p>
      )}
    </div>
  );
};

export default PatientDetailsPage;