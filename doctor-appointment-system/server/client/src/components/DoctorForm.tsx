import React, { useState, useEffect } from 'react';
import type { Doctor } from '../types/doctor';

interface Props {
  onSubmit: (doctor: Partial<Doctor>) => void;
  initialData?: Doctor | null;
  onCancel?: () => void;
}

export const DoctorForm: React.FC<Props> = ({ onSubmit, initialData, onCancel }) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState('Male');
  const [specialization, setSpecialization] = useState('');

  useEffect(() => {
    if (initialData) {
      setName(initialData.name || '');
      setPhone(initialData.phone || '');
      setAge(initialData.age ? String(initialData.age) : '');
      setGender(initialData.gender || 'Male');
      setSpecialization(initialData.specialization || '');
    } else {
      resetForm();
    }
  }, [initialData]);

  const resetForm = () => {
    setName('');
    setPhone('');
    setAge('');
    setGender('Male');
    setSpecialization('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({
      name,
      phone,
      age: age ? Number(age) : undefined,
      gender,
      specialization,
    });
    resetForm();
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px', display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center' }}>
      <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
      <input type="text" placeholder="Phone" value={phone} onChange={(e) => setPhone(e.target.value)} required />
      <input type="number" placeholder="Age" value={age} onChange={(e) => setAge(e.target.value)} style={{ width: '70px' }} />
      <select value={gender} onChange={(e) => setGender(e.target.value)}>
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <input type="text" placeholder="Specialization" value={specialization} onChange={(e) => setSpecialization(e.target.value)} required />
      <button type="submit">{initialData ? 'Update Doctor' : 'Add Doctor'}</button>
      {initialData && onCancel && (
        <button type="button" onClick={onCancel}>Cancel</button>
      )}
    </form>
  );
};