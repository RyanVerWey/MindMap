import React, { useState } from 'react';

const Settings = () => {
  const [autosave, setAutosave] = useState(true);

  const toggleAutosave = () => setAutosave(!autosave);

  return (
    <div>
      <h2>User Settings</h2>
      <label>
        <input type="checkbox" checked={autosave} onChange={toggleAutosave} />
        Enable Autosave
      </label>
    </div>
  );
};

export default Settings;
