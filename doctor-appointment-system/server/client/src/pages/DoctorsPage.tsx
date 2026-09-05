import React, { useEffect, useState } from 'react';
import DoctorList, { Doctor } from '../components/DoctorList';
import { getDoctors, createDoctor, updateDoctor, deleteDoctor } from '../services/doctorService';

const DoctorsPage: React.FC = () => {
  const [doctors, setDoctors] = useState<Doctor[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const [editingId, setEditingId] = useState<string | null>(null);
  const [name, setName] = useState('');
  const [specialization, setSpecialization] = useState('');
  const [phone, setPhone] = useState('');

  const fetchDoctors = async () => {
    try {
      setLoading(true);
      const res = await getDoctors();

      let data: Doctor[] = [];
      if (Array.isArray(res)) {
        data = res;
      } else if (res && Array.isArray(res.data)) {
        data = res.data;
      } else if (res && Array.isArray(res.doctors)) {
        data = res.doctors;
      }

      setDoctors(data);
      setError(null);
    } catch (err: any) {
      console.error('Fetch doctors error:', err);
      setError('Could not fetch doctors from backend server.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, specialization, phone };

    try {
      if (editingId) {
        await updateDoctor(editingId, payload);
        alert('Doctor updated successfully!');
        setEditingId(null);
      } else {
        await createDoctor(payload);
        alert('Doctor added successfully!');
      }

      setName('');
      setSpecialization('');
      setPhone('');
      fetchDoctors();
    } catch (err: any) {
      alert('Failed to save doctor: ' + (err.response?.data?.message || err.message));
    }
  };

  const handleEdit = (doctor: Doctor) => {
    setEditingId(doctor._id || null);
    setName(doctor.name);
    setSpecialization(doctor.specialization);
    setPhone(doctor.phone);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Are you sure you want to delete this doctor?')) {
      try {
        await deleteDoctor(id);
        fetchDoctors();
      } catch (err: any) {
        alert('Failed to delete doctor');
      }
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Doctor Management</h2>

      <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap', alignItems: 'center' }}>
        <input
          type="text"
          placeholder="Doctor Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          style={{ padding: '6px' }}
        />
        <input
          type="text"
          placeholder="Specialization"
          value={specialization}
          onChange={(e) => setSpecialization(e.target.value)}
          required
          style={{ padding: '6px' }}
        />
        <input
          type="text"
          placeholder="Phone"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
          style={{ padding: '6px' }}
        />
        <button type="submit" style={{ padding: '6px 12px', cursor: 'pointer' }}>
          {editingId ? 'Update Doctor' : 'Add Doctor'}
        </button>
      </form>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      {loading ? (
        <div>Loading doctors...</div>
      ) : (
        <DoctorList doctors={doctors} onEdit={handleEdit} onDelete={handleDelete} />
      )}
    </div>
  );
};

export default DoctorsPage;