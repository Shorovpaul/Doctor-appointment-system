import React from 'react';
import { Link } from 'react-router-dom';

export interface Doctor {
  _id?: string;
  name: string;
  phone: string;
  age: number;
  gender: string;
  specialization: string;
}

interface DoctorListProps {
  doctors: Doctor[];
}

const DoctorList: React.FC<DoctorListProps> = ({ doctors }) => {
  return (
    <div>
      <h3>Doctor List</h3>
      {doctors.length === 0 ? (
        <p>No doctors found.</p>
      ) : (
        <table border={1} cellPadding={8} style={{ width: '100%', borderCollapse: 'collapse' }}>
          <thead>
            <tr>
              <th>Name</th>
              <th>Specialization</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {doctors.map((doctor) => {
              const doctorId = doctor._id;
              return (
                <tr key={doctorId || doctor.phone}>
                  <td>{doctor.name}</td>
                  <td>{doctor.specialization}</td>
                  <td>
                    {doctorId && (
                      <Link to={`/doctors/${doctorId}`}>
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

export default DoctorList;