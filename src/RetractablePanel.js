import React, { useState, useEffect } from 'react';
import Schedule from './Schedule';
import './RetractablePanel.css';

const RetractablePanel = ({ schedule }) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);

  useEffect(() => {
    if (schedule.length > 0) {
      setIsPanelOpen(true);
    }
  }, [schedule]);

  const togglePanel = () => {
    setIsPanelOpen(!isPanelOpen);
  };

  return (
    <div className={`panel-container ${isPanelOpen ? 'open' : ''}`}>
      <button onClick={togglePanel}>
        {isPanelOpen ? 'Hide Schedule' : 'Show Schedule'}
      </button>
      <div className="panel-content">
        {isPanelOpen && <Schedule isPanel={true} />} {/* Pass a prop to indicate it's being rendered in the panel */}
      </div>
    </div>
  );
};

export default RetractablePanel;