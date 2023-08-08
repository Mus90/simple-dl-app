window.onload = function () {
  const instances = [];
  let newInstance = "";
  let creatingInstance = false;
  let deletingInstance = false;

  let showAlert = false;
  let responseMessage = "";

  function fetchInstances() {
    fetch("http://localhost:8081/api/simple/instances")
      .then((response) => response.json())
      .then((data) => {
        setInstances(data);
      })
      .catch((error) => {
        console.error("Error fetching instances:", error);
      });
  }

  function handleCreateInstance(newInstance) {
    setCreatingInstance(true);
    const trimmedInstance = newInstance.trim();
    if (trimmedInstance === "") {
      return;
    }

    fetch(`http://localhost:8081/api/simple/instance/${newInstance}`, {
      method: "POST",
    })
      .then((response) => {
       if (response.ok) {
                    return response.text();
                  } else {
                    throw new Error("Error creating instance.");
                  }
      })
      .then((data) => {
      console.log("Response from server:", data); // Add this line
        setResponseMessage(data);
        setNewInstance("");
       showAlertMessage();
       fetchInstances();
      })
      .catch((error) => {
        console.error("Error creating instance:", error);
      })
      .finally(() => {
        setCreatingInstance(false);
      });
  }

 function handleDeleteInstance(instanceName, deleteButton) {
   setDeletingInstance(true);
   deleteButton.disabled = true;
   deleteButton.textContent = "Deleting...";

   fetch(`http://localhost:8081/api/simple/instance/${encodeURIComponent(instanceName)}`, {
     method: "DELETE",
   })
     .then((response) => {
       if (response.ok) {
         return response.text();
       } else {
         throw new Error("Error deleting instance.");
       }
     })
     .then((data) => {
       setResponseMessage(data);
       showAlertMessage();
       fetchInstances();
     })
     .catch((error) => {
       console.error("Error deleting instance:", error);
     })
     .finally(() => {
       setDeletingInstance(false);
     });
 }

function openInstanceInNewTab(instanceName) {
    fetch(`http://localhost:8081/api/files/${encodeURIComponent(instanceName)}/public_html/index.html`)
      .then((response) => response.json())
      .then((data) => {
        if (data.fileUrl) {
          window.open(data.fileUrl, "_blank");
        } else {
          console.error("Error retrieving file URL");
        }
      })
      .catch((error) => {
        console.error("Error opening instance:", error);
      });
  }


  function showAlertMessage() {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setResponseMessage("");
    }, 3000);
  }

  function setCreatingInstance(value) {
    creatingInstance = value;
    renderApp();
  }

   function setDeletingInstance(value) {
      deletingInstance = value;
      renderApp();
    }

  function setInstances(data) {
    instances.length = 0;
    instances.push(...data);
    renderApp();
  }

  function setNewInstance(value) {
    newInstance = value;
    renderApp();
  }

  function setResponseMessage(message) {
    responseMessage = message;
    renderApp();
  }

  function setShowAlert(value) {
    showAlert = value;
    renderApp();
  }

 function renderApp() {
   const app = document.getElementById("app");
   app.innerHTML = `
     <div class="App">
       <h1>SimpleDL Management System</h1>
       <div class="container">
         <div class="create-instance-section">
           <h2>Create New Instance</h2>
           <input type="text" id="newInstance" value="${newInstance}" />
           <button id="createButton" ${
     creatingInstance ? "disabled" : ""
   }>${creatingInstance ? "Creating..." : "Create"}</button>
         </div>
         <div class="instances-section">
           <h2>Instances</h2>
           <div class="table-container">
             <table class="instances-table">
               <thead>
                 <tr>
                   <th>Instance Name</th>
                   <th>Edit</th>
                   <th>Delete</th>
                 </tr>
               </thead>
               <tbody>
                 ${instances
                   .map(
                     (instance) => `
                   <tr>
                     <td><a href="#" class="instance-link" data-instance="${instance}">${instance}</a></td>
                     <td><button class="editButton" data-instance="${instance}">Edit</button></td>
                     <td><button class="deleteButton" data-instance="${instance}">Delete</button></td>
                   </tr>
                 `
                   )
                   .join("")}
               </tbody>
             </table>
           </div>
         </div>
         <div class="response-section ${showAlert ? "show" : ""}">
           <p>${responseMessage}</p>
         </div>
       </div>
     </div>
   `;

   const createButton = document.getElementById("createButton");
   const newInstanceInput = document.getElementById("newInstance");

   createButton.addEventListener("click", () => {
     const newInstanceId = newInstanceInput.value;
     handleCreateInstance(newInstanceId);
   });

   const deleteButtons = document.getElementsByClassName("deleteButton");
   for (const button of deleteButtons) {
     button.addEventListener("click", (event) => {
       const instanceName = event.target.getAttribute("data-instance");
       handleDeleteInstance(instanceName, event.target);
     });
   }

   // Add event listener to handle opening instance in a new tab
     const instanceLinks = document.getElementsByClassName("instance-link");
     for (const link of instanceLinks) {
       link.addEventListener("click", (event) => {
         const instanceName = event.target.getAttribute("data-instance");
         openInstanceInNewTab(instanceName);
       });
     }
   }

  fetchInstances();
};
