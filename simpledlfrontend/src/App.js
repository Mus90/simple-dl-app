import React, { useState, useEffect } from "react";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import InstanceTable from "./Components/InstanceTable";
import DeleteInstance from "./Components/DeleteInstance";
import CreateInstance from "./Components/CreateInstance";
import Nav from "react-bootstrap/Nav";
import "./App.css";

function App() {
  const [instances, setInstances] = useState([]);
  const [deleteModalInstance, setDeleteModalInstance] = useState("");
  const [responseMessage, setResponseMessage] = useState("");
  const [showAlert, setShowAlert] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("home");

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
  };

  const handleConfirmDelete = async () => {
    try {
      setShowAlert(false);
      setIsLoading(true);
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
      setIsLoading(false);
      setTimeout(() => {
        setShowAlert(true);
      }, 100);
    }
  };

  const handleCreateInstance = async (newInstance, newTitle, newFooter, backgroundColor, logoImage) => {
    try {
      const trimmedInstance = newInstance.trim();
      if (trimmedInstance === "") {
        return;
      }
  
      setIsLoading(true);
  
      // Send the title, footer, and background color along with the request
      await axios.post(
        `http://localhost:8081/api/simple/instance/${newInstance}`,
        {
          title: newTitle,
          footer: newFooter,
          backgroundColor: backgroundColor,
          logoImage: logoImage
        }
      );
  
      setResponseMessage(`Instance "${newInstance}" created successfully.`);
      fetchInstances();
    } catch (error) {
      console.error("Error creating instance:", error);
      setResponseMessage(`Error creating instance: ${error.message}`);
    } finally {
      setIsLoading(false);
      setShowAlert(true);
    }
  };


  const dismissAlert = () => {
    setShowAlert(false);
    setResponseMessage("");
    setActiveTab("home");
  };

  const handleSelect = (selectedTab) => {
    setActiveTab(selectedTab);
  };

  return (
    <div className="App">
      <h1 style={{ textShadow: "1px 5px 2px rgba(0, 0, 0, 0.2)" }}>
        <span style={{ color: "red", fontFamily: "cursive" }}>SimpleDL</span>{" "}
        Instance Management
      </h1>

      <Nav variant="tabs" activeKey={activeTab} onSelect={handleSelect}>
        <Nav.Item>
          <Nav.Link eventKey="home">Home</Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link eventKey="create">Create Instance</Nav.Link>
        </Nav.Item>
      </Nav>

      {activeTab === "home" && (
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
      )}

      {activeTab === "create" && (
        <div className="container">
          <div className="create-instance-section">
            <CreateInstance handleCreateInstance={handleCreateInstance} />
          </div>
        </div>
      )}

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
