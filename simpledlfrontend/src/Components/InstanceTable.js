import React, { useState } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import "./InstanceTable.css";
import ReactPaginate from "react-paginate";

const InstanceTable = ({ instances, onEdit, onDelete }) => {
  const [currentPage, setCurrentPage] = useState(0);

  const handleInstanceClick = (instance) => {
    const fileUrl = `http://localhost:8080/${instance}/public_html/`;
    // Open the file in a new browser tab/window
    window.open(fileUrl, "_blank");
  };

  const handlePageChange = (selectedPage) => {
    setCurrentPage(selectedPage.selected);
  };

  const instancesPerPage = 10;
  const offset = currentPage * instancesPerPage;
  const instancesForCurrentPage = instances.slice(
    offset,
    offset + instancesPerPage
  );

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
          {instancesForCurrentPage.map((instance) => (
            <tr key={instance}>
              <td>
                <a href="#" onClick={() => handleInstanceClick(instance)}>
                  {instance}
                </a>
              </td>
              <>
                <div className="instance-actions">
                  <button onClick={() => onEdit(instance)}>Edit</button>
                  <button
                    onClick={() => onDelete(instance)}
                    className="delete-button"
                  >
                    Delete
                  </button>
                </div>
              </>
            </tr>
          ))}
        </tbody>
      </table>

      <ReactPaginate
        pageCount={Math.ceil(instances.length / instancesPerPage)} // Set the total number of pages based on the number of instances (assuming 10 instances per page)
        onPageChange={handlePageChange} // Handle page changes
        containerClassName="pagination"
        activeClassName="active"
      />
    </Router>
  );
};

export default InstanceTable;
