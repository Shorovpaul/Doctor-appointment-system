import React, { useState, useEffect } from 'react';
import type { Patient } from '../types/patient';

interface PatientFormProps {
  onSubmit: (patient: Patient) => void;
  editingPatient: Patient | null;
  onCancelEdit: () => void;
}

export const PatientForm: React.FC<PatientFormProps> = ({
  onSubmit,
  editingPatient,
  onCancelEdit,
}) => {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState('');
  const [gender, setGender] = useState<'Male' | 'Female' | 'Other'>('Male');

  useEffect(() => {
    if (editingPatient) {
      setName(editingPatient.name || '');
      setPhone(editingPatient.phone || '');
      setAge(editingPatient.age ? String(editingPatient.age) : '');
      setGender((editingPatient.gender as 'Male' | 'Female' | 'Other') || 'Male');
      
    }
  }, [editingPatient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !phone || !age) {
      alert('Please fill in all fields');
      return;
    }

    onSubmit({
      ...(editingPatient?._id ? { _id: editingPatient._id } : {}),
      name,
      phone,
      age: Number(age),
      gender,
    });

    setName('');
    setPhone('');
    setAge('');
    setGender('Male');
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Phone"
        value={phone}
        onChange={(e) => setPhone(e.target.value)}
        required
      />
      <input
        type="number"
        placeholder="Age"
        value={age}
        onChange={(e) => setAge(e.target.value)}
        required
      />
      <select 
        value={gender} 
        onChange={(e) => setGender(e.target.value as 'Male' | 'Female' | 'Other')}
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <button type="submit">{editingPatient ? 'Update' : 'Add Patient'}</button>
      {editingPatient && <button type="button" onClick={onCancelEdit}>Cancel</button>}
    </form>
  );
};