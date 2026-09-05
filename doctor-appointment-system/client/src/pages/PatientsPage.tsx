import React, { useEffect, useState } from 'react';
import { getPatients, createPatient, updatePatient, deletePatient } from '../services/patientService';
import { Link } from 'react-router-dom';

export interface Patient {
  _id?: string;
  name: string;
  phone: string;
  age: number;
  gender: string;
}

const PatientsPage: React.FC = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [editingId, setEditingId] = useState<string | null>(null);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [age, setAge] = useState<number | ''>('');
  const [gender, setGender] = useState('Male');

  const fetchPatients = async () => {
    try {
      setLoading(true);
      const res = await getPatients();
      const data = Array.isArray(res) ? res : res?.data || res?.patients || [];
      setPatients(data);
    } catch (err) {
      console.error('Fetch patients error:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPatients();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = { name, phone, age: Number(age), gender };

    try {
      if (editingId) {
        await updatePatient(editingId, payload);
        alert('Patient updated!');
        setEditingId(null);
      } else {
        await createPatient(payload);
        alert('Patient added!');
      }
      setName('');
      setPhone('');
      setAge('');
      setGender('Male');
      fetchPatients();
    } catch (err: any) {
      alert('Error saving patient');
    }
  };

  const handleEdit = (p: Patient) => {
    setEditingId(p._id || null);
    setName(p.name);
    setPhone(p.phone);
    setAge(p.age);
    setGender(p.gender);
  };

  const handleDelete = async (id: string) => {
    if (window.confirm('Delete patient?')) {
      await deletePatient(id);
      fetchPatients();
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h2>Patient Management</h2>

      <form 
        onSubmit={handleSubmit} 
        autoComplete="off" 
        style={{ display: 'flex', gap: '10px', marginBottom: '20px', flexWrap: 'wrap' }}
      >
        <input 
          type="text" 
          placeholder="Name" 
          value={name} 
          onChange={(e) => setName(e.target.value)} 
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
        <input 
          type="number" 
          placeholder="Age" 
          value={age} 
          onChange={(e) => setAge(e.target.value ? Number(e.target.value) : '')} 
          required 
          style={{ padding: '6px', width: '70px' }} 
        />
        <select value={gender} onChange={(e) => setGender(e.target.value)} style={{ padding: '6px' }}>
          <option value="Male">Male</option>
          <option value="Female">Female</option>
          <option value="Other">Other</option>
        </select>
        <button type="submit" style={{ padding: '6px 12px' }}>
          {editingId ? 'Update Patient' : 'Add Patient'}
        </button>
      </form>

      <h3>Patient List</h3>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {patients.map((p, index) => {
              if (!p) return null;

              return (
                <tr key={p._id || p.phone || index}>
                  <td>{p.name}</td>
                  <td>{p.phone}</td>
                  <td>{p.age}</td>
                  <td>{p.gender}</td>
                  <td>
                    <button onClick={() => handleEdit(p)} style={{ marginRight: '5px' }}>Edit</button>
                    {p._id && (
                      <button onClick={() => handleDelete(p._id!)} style={{ marginRight: '5px' }}>
                        Delete
                      </button>
                    )}
                    {p._id && (
                      <Link to={`/patients/${p._id}`}>
                        <button>Details</button>
                      </Link>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default PatientsPage;