import './ProgressBar.css';
import React from 'react';

export default function ProgressBar({ value, tone = 'green' }) {
  return (
    <div className="progressTrack">
      <div className={`progressFill ${tone}`} style={{ width: `${value}%` }} />
    </div>
  );
}
