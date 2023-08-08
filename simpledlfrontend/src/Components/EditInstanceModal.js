import React, { useState, useEffect } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function EditInstanceModal({ show, instance, onHide, onUpdate }) {
  const [updatedInstance, setUpdatedInstance] = useState('');

  useEffect(() => {
    setUpdatedInstance(instance);
  }, [instance]);

  const handleUpdateInstance = () => {
    onUpdate(updatedInstance);
  };

  return (
    <Modal show={show} onHide={onHide}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Instance</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form.Group>
          <Form.Label>Instance Name:</Form.Label>
          <Form.Control
            type="text"
            value={updatedInstance}
            onChange={(e) => setUpdatedInstance(e.target.value)}
          />
        </Form.Group>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Close
        </Button>
        <Button variant="primary" onClick={handleUpdateInstance}>
          Update
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default EditInstanceModal;
