import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt } from '@fortawesome/free-solid-svg-icons';

const InstanceTable = ({ instances, onEdit, onDelete }) => {
  return (
    <table>
      <thead>
        <tr>
          <th>Instance Name</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        {instances.map((instance) => (
          <tr key={instance}>
            <td>{instance}</td>
            <td>
              <div className="instance-actions">
                <button onClick={() => onEdit(instance)}>
                  <FontAwesomeIcon icon={faEdit} />
                </button>
                <button onClick={() => onDelete(instance)}>
                  <FontAwesomeIcon icon={faTrashAlt} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InstanceTable;
