import React, { useState } from 'react';
import Schedule from './Schedule';
import './RetractablePanel.css';

const RetractablePanel = ({ onShowSchedule }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
    if (onShowSchedule && isPanelOpen) {
      onShowSchedule();
    }
  };

  return (
    <div className={`panel-container ${isPanelOpen ? 'open' : ''}`}>
      <button onClick={togglePanel}>
        {isPanelOpen ? 'Hide Schedule' : 'Show Schedule'}
      </button>
      <div className="panel-content">
        {isPanelOpen && <Schedule />}
      </div>
    </div>
  );
};

export default RetractablePanel;