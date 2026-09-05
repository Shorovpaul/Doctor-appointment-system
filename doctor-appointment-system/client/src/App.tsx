import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import PatientsPage from './pages/PatientsPage';
import PatientDetailsPage from './pages/PatientDetailsPage';
import DoctorsPage from './pages/DoctorsPage';
import DoctorDetailsPage from './pages/DoctorDetailsPage';
import AppointmentsPage from './pages/AppointmentsPage';

const App: React.FC = () => {
  return (
    <Router>
      <nav style={{ display: 'flex', gap: '20px', padding: '15px', justifyContent: 'center', backgroundColor: '#f0f0f0' }}>
        <Link to="/appointments">Appointments</Link>
        <Link to="/doctors">Doctors</Link>
        <Link to="/patients">Patients</Link>
      </nav>

      <Routes>
        <Route path="/" element={<AppointmentsPage />} />
        <Route path="/appointments" element={<AppointmentsPage />} />
        
        {/* Patient Routes */}
        <Route path="/patients" element={<PatientsPage />} />
        <Route path="/patients/:id" element={<PatientDetailsPage />} />

        {/* Doctor Routes - Updated path to match navigate('/doctor/:id') */}
        <Route path="/doctors" element={<DoctorsPage />} />
        <Route path="/doctor/:id" element={<DoctorDetailsPage />} />
      </Routes>
    </Router>
  );
};

export default App;