import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrashAlt } from "@fortawesome/free-solid-svg-icons";
import { BrowserRouter as Router, Link } from "react-router-dom";

const InstanceTable = ({ instances, onEdit, onDelete }) => {
  const handleInstanceClick = (instance) => {
    // Perform the desired action when the instance name is clicked
    const fileUrl = `http://localhost:8081/api/${instance}/public_html/index.html`;

    // Open the file in a new browser tab/window
    window.open(fileUrl, "_blank");
  };

  return (
    <Router>
      <table className="instance-table">
        <thead>
          <tr>
            <th>Instance Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {instances.map((instance) => (
            <tr key={instance}>
              <td>
                <a href="#" onClick={() => handleInstanceClick(instance)}>
                  {instance}
                </a>
              </td>
              <>
                <div className="instance-actions">
                  <button onClick={() => onEdit(instance)}>
                    <FontAwesomeIcon icon={faEdit} />
                  </button>
                  <button onClick={() => onDelete(instance)}>
                    <FontAwesomeIcon icon={faTrashAlt} />
                  </button>
                </div>
              </>
            </tr>
          ))}
        </tbody>
      </table>
    </Router>
  );
};

export default InstanceTable;
