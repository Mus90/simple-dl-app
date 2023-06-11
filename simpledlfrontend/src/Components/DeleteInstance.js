import React from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

function DeleteInstance({ show, instance, onHide, onDelete, deletingInstance }) {
  const handleDelete = () => {
    onDelete(instance);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Delete Instance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Are you sure you want to delete the instance "{instance}"?</p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleDelete} disabled={deletingInstance}>
          {deletingInstance ? <Spinner animation="border" size="sm" /> : 'Delete'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default DeleteInstance;
