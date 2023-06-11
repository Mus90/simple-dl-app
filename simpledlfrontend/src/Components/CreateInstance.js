import React, { useState } from 'react';

const CreateInstance = ({ onCreate }) => {
  const [newInstance, setNewInstance] = useState('');

  const handleCreate = () => {
    onCreate(newInstance);
    setNewInstance('');
  };

  return (
    <div>
      <input type="text" value={newInstance} onChange={(e) => setNewInstance(e.target.value)} />
      <button onClick={handleCreate}>Create Instance</button>
    </div>
  );
};

export default CreateInstance;
