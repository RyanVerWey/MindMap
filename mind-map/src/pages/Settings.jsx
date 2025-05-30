import React, { useState } from 'react';

const Settings = () => {
  const [autosave, setAutosave] = useState(true);

  const toggleAutosave = () => setAutosave(!autosave);

  const pageStyles = {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
    padding: 'var(--spacing-lg)',
    backgroundColor: 'var(--color-background)',
  };

  const contentWrapperStyles = {
    width: '100%',
    maxWidth: '600px',
    backgroundColor: 'var(--color-surface)',
    padding: 'var(--spacing-lg)',
    borderRadius: 'var(--radius-md)',
    boxShadow: 'var(--shadow-md)',
  };

  return (
    <div style={pageStyles}>
      <div style={contentWrapperStyles}>
        <h2 className="settings-heading">User Settings</h2>
        <label className="settings-label">
          <input
            type="checkbox"
            checked={autosave}
            onChange={toggleAutosave}
            className="settings-checkbox"
          />
          Enable Autosave
        </label>
      </div>
    </div>
  );
};

export default Settings;
