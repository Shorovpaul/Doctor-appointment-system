import React, { useState, useEffect } from 'react';
import type { Patient } from '../types/patient';

interface PatientFormProps {
  onSubmit: (patient: Patient) => Promise<void> | void;
  editingPatient?: Patient | null;
  onCancelEdit?: () => void;
}

export const PatientForm: React.FC<PatientFormProps> = ({
  onSubmit,
  editingPatient,
  onCancelEdit,
}) => {
  const [formData, setFormData] = useState<Patient>({
    name: '',
    phone: '',
    age: 0,
    gender: 'Male',
  });

  useEffect(() => {
    if (editingPatient) {
      setFormData(editingPatient);
    } else {
      setFormData({ name: '', phone: '', age: 0, gender: 'Male' });
    }
  }, [editingPatient]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
    setFormData({ name: '', phone: '', age: 0, gender: 'Male' });
  };

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '10px', maxWidth: '400px' }}>
      <h3>{editingPatient ? 'Edit Patient' : 'Add New Patient'}</h3>
      <input
        type="text"
        placeholder="Name"
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
        value={formData.age || ''}
        onChange={(e) => setFormData({ ...formData, age: Number(e.target.value) })}
        required
      />
      <select
        value={formData.gender}
        onChange={(e) => setFormData({ ...formData, gender: e.target.value })}
      >
        <option value="Male">Male</option>
        <option value="Female">Female</option>
        <option value="Other">Other</option>
      </select>
      <div style={{ display: 'flex', gap: '10px' }}>
        <button type="submit">{editingPatient ? 'Update' : 'Add'} Patient</button>
        {editingPatient && onCancelEdit && (
          <button type="button" onClick={onCancelEdit}>Cancel</button>
        )}
      </div>
    </form>
  );
};