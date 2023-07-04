import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import "./CreateInstance.css";

function CreateInstance({ handleCreateInstance, isLoading }) {
  const [newInstance, setNewInstance] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInstance = newInstance.trim();
    if (trimmedInstance === "") {
      return;
    }

    handleCreateInstance(trimmedInstance);
    setNewInstance("");
  };

  return (
    <div>
      {isLoading && <ProgressBar animated now={100} />}
      <Form className="create-instance-form" onSubmit={handleSubmit}>
        <Form.Group controlId="newInstance">
          <Form.Label className="form-label">Instance Name:</Form.Label>
          <Form.Control
            type="text"
            value={newInstance}
            onChange={(e) => setNewInstance(e.target.value)}
            className="form-control"
            placeholder="Instance Name"
          />
        </Form.Group>
        <Button variant="success" type="submit" className="submit-button">
          Create
        </Button>
      </Form>
    </div>
  );
}

export default CreateInstance;
