import React, { useState, useEffect } from "react";
import axios from "axios";
import Form from "react-bootstrap/Form";
import Alert from "react-bootstrap/Alert";
import InstanceTable from "./Components/InstanceTable";
import CreateInstance from "./Components/CreateInstance";
import EditInstanceModal from "./Components/EditInstanceModal";
import DeleteInstance from "./Components/DeleteInstance";
import "./App.css";
import { Button, Spinner } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";

function App() {
  const [instances, setInstances] = useState([]);
  const [editModalShow, setEditModalShow] = useState(false);
  const [editModalInstance, setEditModalInstance] = useState("");
  const [deleteModalShow, setDeleteModalShow] = useState(false);
  const [deleteModalInstance, setDeleteModalInstance] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [newInstance, setNewInstance] = useState("");
  const [creatingInstance, setCreatingInstance] = useState(false);
  const [deletingInstance, setDeletingInstance] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    fetchInstances();
  }, []);

  const fetchInstances = async () => {
    try {
      const response = await axios.get(
        "http://localhost:8081/api/simple/instances"
      );
      setInstances(response.data);
    } catch (error) {
      console.error("Error fetching instances:", error);
    }
  };

  const handleEditInstance = (instance) => {
    setEditModalInstance(instance);
    setEditModalShow(true);
  };

  const handleUpdateInstance = async (updatedInstance) => {
    try {
      const response = await axios.post(
        `http://localhost:8081/api/simple/instance/${editModalInstance}`,
        {
          instance: updatedInstance,
        }
      );
      setResponseMessage(response.data);
      fetchInstances();
      showAlertMessage();
    } catch (error) {
      console.error("Error updating instance:", error);
    }
    setEditModalShow(false);
  };

  const handleDeleteInstance = (instance) => {
    setDeleteModalInstance(instance);
    setDeleteModalShow(true);
  };

  const handleConfirmDelete = async (instance) => {
    try {
      setDeletingInstance(true);
      const response = await axios.delete(
        `http://localhost:8081/api/simple/instance/${instance}`
      );
      setResponseMessage(response.data);
      fetchInstances();
      showAlertMessage();
    } catch (error) {
      console.error("Error deleting instance:", error);
    } finally {
      setDeletingInstance(false);
      setDeleteModalShow(false);
    }
  };

  const handleCreateInstance = async (newInstance) => {
    try {
      setCreatingInstance(true);
      const trimmedInstance = newInstance.trim();
      if (trimmedInstance === "") {
        return;
      }
      const response = await axios.post(
        `http://localhost:8081/api/simple/instance/${newInstance}`
      );
      setResponseMessage(response.data);
      fetchInstances();
      showAlertMessage();
      setNewInstance("");
    } catch (error) {
      console.error("Error creating instance:", error);
    } finally {
      setCreatingInstance(false);
    }
  };

  const showAlertMessage = () => {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setResponseMessage("");
    }, 3000);
  };

  return (
    <div className="App">
      <h1 style={{ textShadow: "1px 5px 2px rgba(0, 0, 0, 0.2)" }}>
        <span style={{ color: "red", fontFamily: "cursive" }}>DL</span> Instance
        Management
      </h1>

      <div className="container">
        <div className="create-instance-section"></div>
        <h2 style={{}}>
          <span style={{ color: "red", fontFamily: "cursive" }}>Create </span>
          New Instance
        </h2>
        <Form
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Form.Group
            controlId="newInstance"
            style={{
              display: "flex",
              gap: "1rem",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Form.Label style={{ fontWeight: "bold" }}>
              Instance Name:
            </Form.Label>
            <Form.Control
              type="text"
              value={newInstance}
              onChange={(e) => setNewInstance(e.target.value)}
              style={{ padding: "0.5rem" }}
              placeholder="Instance Name"
            />
          </Form.Group>
          <Button
            variant="success"
            onClick={() => handleCreateInstance(newInstance)}
            style={{
              backgroundColor: "lightgreen",
              border: "none",
              borderRadius: "4px",
              cursor: "pointer",
              padding: "0.725rem",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",

              boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
            }}
          >
            {creatingInstance ? (
              <Spinner animation="border" size="sm" />
            ) : (
              <>
                <FontAwesomeIcon icon={faPlus} />
              </>
            )}
          </Button>
        </Form>
      </div>

      <div className="instances-section">
        <h2>Instances</h2>
        {instances.length > 0 ? (
          <InstanceTable
            instances={instances}
            onEdit={handleEditInstance}
            onDelete={handleDeleteInstance}
            style={{ marginTop: "20px" }}
            rowStyle={{ backgroundColor: "#f5f5f5" }}
            evenRowStyle={{ backgroundColor: "#ffffff" }}
          />
        ) : (
          <p
            style={{
              fontSize: "18px",
              color: "#888",
              marginTop: "20px",
              textAlign: "center",
            }}
          >
            No instances found.
          </p>
        )}
      </div>

      <EditInstanceModal
        show={editModalShow}
        instance={editModalInstance}
        onHide={() => setEditModalShow(false)}
        onUpdate={handleUpdateInstance}
      />

      <DeleteInstance
        show={deleteModalShow}
        instance={deleteModalInstance}
        onHide={() => setDeleteModalShow(false)}
        onDelete={handleConfirmDelete}
        deletingInstance={deletingInstance}
      />

      {showAlert && responseMessage && (
        <Alert variant="info">{responseMessage}</Alert>
      )}

      <div>
        <div class="carousel">
          <a href="Users/mustafa/simple-dl-app/simpledl-backend/Intsance_2/public_html/index.html">
            Visit W3Schools.com!
          </a>
        </div>
      </div>
    </div>
  );
}

export default App;
