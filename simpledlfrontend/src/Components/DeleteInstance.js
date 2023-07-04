import React from "react";
import PropTypes from "prop-types";
import "./DeleteInstance.css";
import ProgressBar from "react-bootstrap/ProgressBar";

const DeleteInstance = ({ instance, onHide, onDelete, isLoading }) => {
  const handleDelete = async () => {
    try {
      onHide();
      await onDelete(instance);
    } catch (error) {
      console.error("Error deleting instance:", error);
    }
  };

  const handleCancel = () => {
    onHide();
  };

  return (
    <div className="alert-overlay">
      <div className="alert-content">
        {isLoading && <ProgressBar animated now={100} />}
        <h4>Delete Instance</h4>
        <p>Are you sure you want to delete the instance "{instance}"?</p>
        <div className="button-container">
          <button className="cancel-btn" onClick={handleCancel}>
            Cancel
          </button>
          <button className="delete-btn" onClick={handleDelete}>
            Yes
          </button>
        </div>
      </div>
    </div>
  );
};

DeleteInstance.propTypes = {
  instance: PropTypes.string.isRequired,
  onHide: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
};

export default DeleteInstance;
