import React, { useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import ProgressBar from "react-bootstrap/ProgressBar";
import Card from "react-bootstrap/Card";
import { Row, Col } from "react-bootstrap";
import { ChromePicker } from "react-color";
import "./CreateInstance.css";

function CreateInstance() {
  const [newInstance, setNewInstance] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newFooter, setNewFooter] = useState("");
  const [backgroundColor, setBackgroundColor] = useState("#ffffff");
  const [logoImage, setLogoImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setLogoImage(file);
  };

  const handleCreateInstance = async (instanceName, title, footer, backgroundColor, logoImage) => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('footer', footer);
    formData.append('backgroundColor', backgroundColor);
    if (logoImage) {
        formData.append('imageFile', logoImage);
    }

    try {
        const response = await fetch(`http://localhost:8081/api/manage/create/${instanceName}`, {
            method: 'POST',
            body: formData,
        });

        const data = await response.json();
        setIsLoading(false);
        if (response.ok) {
            console.log('Instance created:', data);
        } else {
            console.error('Error creating instance:', data);
        }
    } catch (error) {
        setIsLoading(false);
        console.error('Network error:', error);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const trimmedInstance = newInstance.trim();
    if (trimmedInstance === "") {
      return;
    }
    handleCreateInstance(trimmedInstance, newTitle, newFooter, backgroundColor, logoImage);
    setNewInstance("");
    setNewTitle("");
    setNewFooter("");
    setLogoImage(null);
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

          <Form.Group controlId="newTitle" className="form-inline">
            <Row>
              <Col sm="auto" className="my-auto">
                <Form.Label className="form-label mr-2">Title:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  className="form-control"
                  style={{ width: "300px" }}
                  placeholder="Title"
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="newFooter" className="form-inline">
            <Row>
              <Col sm="auto" className="my-auto">
                <Form.Label className="form-label mr-2">Footer:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="text"
                  value={newFooter}
                  onChange={(e) => setNewFooter(e.target.value)}
                  className="form-control"
                  style={{ width: "300px" }}
                  placeholder="Footer"
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="logoImage" className="form-inline">
            <Row>
              <Col sm="auto" className="my-auto">
                <Form.Label className="form-label mr-2">Logo Image:</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  type="file"
                  onChange={handleImageChange}
                  className="form-control"
                />
              </Col>
            </Row>
          </Form.Group>

          <Form.Group controlId="backgroundColor" className="form-inline">
            <Row>
              <Col sm="auto" className="my-auto">
                <Form.Label className="form-label mr-2">
                  Background Color:
                </Form.Label>
              </Col>
              <Col>
                <ChromePicker
                  color={backgroundColor}
                  onChange={(color) => setBackgroundColor(color.hex)}
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
