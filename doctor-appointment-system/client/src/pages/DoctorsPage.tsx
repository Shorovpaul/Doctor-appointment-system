import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from '../services/doctorService';

interface Doctor {
  _id: string;
  name: string;
  specialization: string;
  phone: string;
  age?: number | string;
  gender?: string;
}

const DoctorsPage: React.FC = () => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    specialization: '',
    phone: '',
    age: '',
    gender: 'Male'
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  const fetchDoctors = async () => {
    try {
      const data = await getDoctors();
      setDoctors(Array.isArray(data) ? data : data?.data || []);
    } catch (err) {
      console.error('Error fetching doctors:', err);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (editingId) {
        await updateDoctor(editingId, formData);
        setEditingId(null);
      } else {
        await createDoctor(formData);
      }
      setFormData({ name: '', specialization: '', phone: '', age: '', gender: 'Male' });
      fetchDoctors();
    } catch (err) {
      console.error('Error saving doctor:', err);
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingId(doctor._id);
    setFormData({
      name: doctor.name || '',
      specialization: doctor.specialization || '',
      phone: doctor.phone || '',
      age: doctor.age ? String(doctor.age) : '',
      gender: doctor.gender || 'Male'
    });
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await deleteDoctor(id);
        fetchDoctors();
      } catch (err) {
        console.error('Error deleting doctor:', err);
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '1000px', margin: '0 auto' }}>
      <h2 style={{ textAlign: 'center' }}>Doctor Management</h2>

      {/* Input Form */}
      <form
        onSubmit={handleSubmit}
        autoComplete="off"
        style={{ display: 'flex', gap: '10px', marginBottom: '20px', justifyContent: 'center', flexWrap: 'wrap' }}
      >
        <input
          type="text"
          name="name"
          placeholder="Doctor Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="specialization"
          placeholder="Specialization"
          value={formData.specialization}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="phone"
          placeholder="Phone"
          value={formData.phone}
          onChange={handleChange}
          required
        />
        <input
          type="number"
          name="age"
          placeholder="Age"
          value={formData.age}
          onChange={handleChange}
        />
        <select name="gender" value={formData.gender} onChange={handleChange}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit">{editingId ? 'Update Doctor' : 'Add Doctor'}</button>
      </form>

      <h3 style={{ textAlign: 'center' }}>Doctor List</h3>

      {/* Doctor Table */}
      <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'center' }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Specialization</th>
            <th>Phone</th>
            <th>Age</th>
            <th>Gender</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {doctors.length > 0 ? (
            doctors.map((doctor) => (
              <tr key={doctor._id}>
                <td>{doctor.name}</td>
                <td>{doctor.specialization}</td>
                <td>{doctor.phone}</td>
                <td>{doctor.age || 'N/A'}</td>
                <td>{doctor.gender || 'N/A'}</td>
                <td>
                  <button onClick={() => handleEdit(doctor)}>Edit</button>{' '}
                  <button onClick={() => handleDelete(doctor._id)}>Delete</button>{' '}
                  <button onClick={() => navigate(`/doctor/${doctor._id}`)}>Details</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan={6}>No doctors found.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DoctorsPage;