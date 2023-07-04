import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import InstanceTable from "./Components/InstanceTable";
import DeleteInstance from "./Components/DeleteInstance";
import "./App.css";
import CreateInstance from "./Components/CreateInstance";

function App() {
  const [instances, setInstances] = useState([]);
  const [deleteModalInstance, setDeleteModalInstance] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

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

  const handleDeleteInstance = async (instance) => {
    setDeleteModalInstance(instance);
    setShowAlert(true);
    // await new Promise((resolve) => setTimeout(resolve, 100)); // Delay setting isLoading to true
    // setIsLoading(true);
  };

  const handleConfirmDelete = async () => {
    try {
      setShowAlert(false); // Hide the confirmation alert
      setIsLoading(true); // Set isLoading to true before the request
      await axios.delete(
        `http://localhost:8081/api/simple/instance/${deleteModalInstance}`
      );
      setResponseMessage(
        `Instance "${deleteModalInstance}" deleted successfully.`
      );
      fetchInstances();
    } catch (error) {
      console.error("Error deleting instance:", error);
      setResponseMessage(`Error deleting instance: ${error.message}`);
    } finally {
      setDeleteModalInstance("");
      setIsLoading(false); // Set isLoading back to false after the request completes
      setTimeout(() => {
        setShowAlert(true);
      }, 100); // Delay showing the success alert to ensure it appears after the confirmation alert disappears
    }
  };

  const handleCreateInstance = async (newInstance) => {
    try {
      const trimmedInstance = newInstance.trim();
      if (trimmedInstance === "") {
        return;
      }
      setIsLoading(true); // Set isLoading to true while waiting for the request
      await axios.post(
        `http://localhost:8081/api/simple/instance/${newInstance}`
      );
      setResponseMessage(`Instance "${newInstance}" created successfully.`);
      fetchInstances();
    } catch (error) {
      console.error("Error creating instance:", error);
      setResponseMessage(`Error creating instance: ${error.message}`);
    } finally {
      setIsLoading(false); // Set isLoading back to false after the request completes
      setShowAlert(true);
    }
  };

  const dismissAlert = () => {
    setShowAlert(false);
    setResponseMessage("");
  };

  return (
    <div className="App">
      <h1 style={{ textShadow: "1px 5px 2px rgba(0, 0, 0, 0.2)" }}>
        <span style={{ color: "red", fontFamily: "cursive" }}>DL</span> Instance
        Management
      </h1>

      <div className="container">
        <div className="create-instance-section">
          <h2>
            <span style={{ color: "red", fontFamily: "cursive" }}>Create</span>{" "}
            New Instance
          </h2>
          <CreateInstance handleCreateInstance={handleCreateInstance} />
        </div>
      </div>

      <div className="instances-section">
        <h2>Instances</h2>
        {instances.length > 0 ? (
          <InstanceTable
            instances={instances}
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

      {isLoading && <ProgressBar animated now={100} />}

      {showAlert && responseMessage && (
        <div className="alert-overlay">
          <div className="alert-content">
            <p>{responseMessage}</p>
            <button className="dismiss-btn" onClick={dismissAlert}>
              Ok
            </button>
          </div>
        </div>
      )}

      {deleteModalInstance && (
        <DeleteInstance
          instance={deleteModalInstance}
          onHide={() => setDeleteModalInstance("")}
          onDelete={handleConfirmDelete}
        />
      )}
    </div>
  );
}

export default App;
