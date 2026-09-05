import React from 'react';
import { Link } from 'react-router-dom';

export interface Doctor {
  _id?: string;
  name: string;
  specialization: string;
  phone: string;
}

interface DoctorListProps {
  doctors: Doctor[];
  onEdit?: (doctor: Doctor) => void;
  onDelete?: (id: string) => Promise<void> | void;
}

const DoctorList: React.FC<DoctorListProps> = ({
  doctors,
  onEdit,
  onDelete,
}) => {
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
              <th>Phone</th>
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
                  <td>{doctor.phone}</td>
                  <td>
                    {onEdit && (
                      <button onClick={() => onEdit(doctor)} style={{ marginRight: '5px' }}>
                        Edit
                      </button>
                    )}
                    {onDelete && doctorId && (
                      <button onClick={() => onDelete(doctorId)} style={{ marginRight: '5px' }}>
                        Delete
                      </button>
                    )}
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