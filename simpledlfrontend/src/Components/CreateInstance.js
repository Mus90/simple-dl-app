import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
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
    <Card className="create-instance-card">
      <Card.Body>
        <Card.Title
          style={{
            textAlign: "center",
            marginBottom: "30px",
            fontWeight: "bold",
          }}
        >
          Create New Instance
        </Card.Title>
        {isLoading && (
          <ProgressBar animated now={100} className="loading-progress" />
        )}
        <Form className="create-instance-form" onSubmit={handleSubmit}>
          <Form.Group controlId="newInstance" className="form-inline">
            <Row>
              <Col sm="auto" className="my-auto">
                <Form.Label className="form-label mr-2">
                  Instance Name:
                </Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  value={newInstance}
                  onChange={(e) => setNewInstance(e.target.value)}
                  className="form-control"
                  style={{ width: "300px" }}
                  placeholder="Instance Name"
                />
              </Col>
            </Row>
          </Form.Group>
          <Button variant="success" type="submit" className="submit-button">
            Create
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
}

export default CreateInstance;
