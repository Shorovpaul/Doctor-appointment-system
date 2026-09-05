import React, { useState } from 'react';
import type { Doctor } from '../types/doctor';

interface Props {
  onSubmit: (doctor: Doctor) => void;
}

export const DoctorForm: React.FC<Props> = ({ onSubmit }) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    age: '',
    gender: 'Male',
    specialization: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      ...formData,
      age: Number(formData.age),
    } as any);
    setFormData({ name: '', phone: '', age: '', gender: 'Male', specialization: '' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', justifyContent: 'center' }}>
      <input
        type="text"
        placeholder="Doctor Name"
        value={formData.name}
        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={formData.phone}
        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={formData.age}
        onChange={(e) => setFormData({ ...formData, age: e.target.value })}
        required
      />
      <select value={formData.gender} onChange={(e) => setFormData({ ...formData, gender: e.target.value })}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
      </select>
      <input
        type="text"
        placeholder="Specialization"
        value={formData.specialization}
        onChange={(e) => setFormData({ ...formData, specialization: e.target.value })}
        required
      />
      <button type="submit">Add Doctor</button>
    </form>
  );
};