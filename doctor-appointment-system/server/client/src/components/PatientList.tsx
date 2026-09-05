import React from 'react';
import type { Patient } from '../types/patient';

interface PatientListProps {
  patients: Patient[];
  onEdit?: (patient: Patient) => void;
  onDelete?: (id: string) => Promise<void> | void;
}

export const PatientList: React.FC<PatientListProps> = ({
  patients,
  onEdit,
  onDelete,
}) => {
  return (
    <div>
      <h3>Patient List</h3>
      {patients.length === 0 ? (
        <p>No patients found.</p>
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
            {patients.map((patient) => (
              <tr key={patient._id || patient.phone}>
                <td>{patient.name}</td>
                <td>{patient.phone}</td>
                <td>{patient.age}</td>
                <td>{patient.gender}</td>
                <td>
                  {onEdit && (
                    <button onClick={() => onEdit(patient)} style={{ marginRight: '5px' }}>
                      Edit
                    </button>
                  )}
                  {onDelete && patient._id && (
                    <button onClick={() => onDelete(patient._id!)}>
                      Delete
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};


