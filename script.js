window.onload = function() {
  const instances = [];
  let editModalShow = false;
  let editModalInstance = '';
  let deleteModalShow = false;
  let deleteModalInstance = '';
  let responseMessage = '';
  let newInstance = '';
  let creatingInstance = false;
  let deletingInstance = false;
  let showAlert = false;

  function fetchInstances() {
    // Simulating the API call using fetch or XMLHttpRequest
    fetch('http://localhost:8081/api/simple/instances')
      .then(response => response.json())
      .then(data => {
        setInstances(data);
      })
      .catch(error => {
        console.error('Error fetching instances:', error);
      });
  }

  function handleEditInstance(instance) {
    setEditModalInstance(instance);
    setEditModalShow(true);
  }

  function handleUpdateInstance(updatedInstance) {
    // Simulating the API call using fetch or XMLHttpRequest
    fetch(`http://localhost:8081/api/simple/instance/${editModalInstance}`, {
      method: 'POST',
      body: JSON.stringify({ instance: updatedInstance }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(response => response.json())
      .then(data => {
        setResponseMessage(data);
        fetchInstances();
        showAlertMessage();
      })
      .catch(error => {
        console.error('Error updating instance:', error);
      });

    setEditModalShow(false);
  }

  function handleDeleteInstance(instance) {
    setDeleteModalInstance(instance);
    setDeleteModalShow(true);
  }

  function handleConfirmDelete(instance) {
    setDeletingInstance(true);
    // Simulating the API call using fetch or XMLHttpRequest
    fetch(`http://localhost:8081/api/simple/instance/${instance}`, {
      method: 'DELETE'
    })
      .then(response => response.json())
      .then(data => {
        setResponseMessage(data);
        fetchInstances();
        showAlertMessage();
      })
      .catch(error => {
        console.error('Error deleting instance:', error);
      })
      .finally(() => {
        setDeletingInstance(false);
        setDeleteModalShow(false);
      });
  }

  function handleCreateInstance(newInstance) {
    setCreatingInstance(true);
    const trimmedInstance = newInstance.trim();
    if (trimmedInstance === '') {
      return;
    }

    // Simulating the API call using fetch or XMLHttpRequest
    fetch(`http://localhost:8081/api/simple/instance/${newInstance}`, {
      method: 'POST'
    })
      .then(response => response.json())
      .then(data => {
        setResponseMessage(data);
        fetchInstances();
        showAlertMessage();
        setNewInstance('');
      })
      .catch(error => {
        console.error('Error creating instance:', error);
      })
      .finally(() => {
        setCreatingInstance(false);
      });
  }

  function showAlertMessage() {
    setShowAlert(true);
    setTimeout(() => {
      setShowAlert(false);
      setResponseMessage('');
    }, 3000);
  }

  function setInstances(data) {
    instances.length = 0;
    instances.push(...data);
    renderApp();
  }

  function renderApp() {
    const app = document.getElementById('app');
    app.innerHTML = `
      <div class="App">
        <h1>DL Instance Management</h1>
        <div class="container">
          <div class="create-instance-section">
            <h2>Create New Instance</h2>
            <input type="text" id="newInstance" value="${newInstance}" />
            <button id="createButton">${creatingInstance ? 'Creating...' : 'Create'}</button>
          </div>
        </div>
      
        <div class="instances-section">
          <h2>Instances</h2>
          <div id="instanceTable">${renderInstanceTable()}</div>
        </div>
      
        <div id="editModal"></div>
        <div id="deleteModal"></div>
      
        ${showAlert && responseMessage ? `<div class="alert">${responseMessage}</div>` : ''}
      </div>
    `;

    document.getElementById('createButton').addEventListener('click', () => {
      const newInstance = document.getElementById('newInstance').value;
      handleCreateInstance(newInstance);
    });

    renderEditModal();
    renderDeleteModal();
  }

  function renderInstanceTable() {
    if (instances.length === 0) {
      return '<p>No instances found.</p>';
    }

    let tableHtml = `
      <table class="instances-table">
        <thead>
          <tr>
            <th>Instance Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
    `;

    instances.forEach(instance => {
      tableHtml += `
        <tr>
          <td>${instance}</td>
          <td>
            <div class="instance-actions">
              <button class="editButton">Edit</button>
              <button class="deleteButton">Delete</button>
            </div>
          </td>
        </tr>
      `;
    });

    tableHtml += '</tbody></table>';

    return tableHtml;
  }

  function renderEditModal() {
    const editModal = document.getElementById('editModal');
    if (!editModalShow) {
      editModal.innerHTML = '';
      return;
    }

    editModal.innerHTML = `
      <div class="modal">
        <div class="modal-content">
          <h3>Edit Instance</h3>
          <label for="updatedInstance">Instance Name:</label>
          <input type="text" id="updatedInstance" value="${editModalInstance}" />
          <button id="updateButton">Update</button>
        </div>
      </div>
    `;

    document.getElementById('updateButton').addEventListener('click', () => {
      const updatedInstance = document.getElementById('updatedInstance').value;
      handleUpdateInstance(updatedInstance);
    });
  }

  function renderDeleteModal() {
    const deleteModal = document.getElementById('deleteModal');
    if (!deleteModalShow) {
      deleteModal.innerHTML = '';
      return;
    }

    deleteModal.innerHTML = `
      <div class="modal">
        <div class="modal-content">
          <h3>Delete Instance</h3>
          <p>Are you sure you want to delete the instance "${deleteModalInstance}"?</p>
          <div class="modal-actions">
            <button id="cancelDeleteButton">Cancel</button>
            <button id="confirmDeleteButton" ${deletingInstance ? 'disabled' : ''}>${deletingInstance ? 'Deleting...' : 'Delete'}</button>
          </div>
        </div>
      </div>
    `;

    document.getElementById('cancelDeleteButton').addEventListener('click', () => {
      setDeleteModalShow(false);
    });

    document.getElementById('confirmDeleteButton').addEventListener('click', () => {
      handleConfirmDelete(deleteModalInstance);
    });
  }

  renderApp();
  fetchInstances();
</script>
</html>
