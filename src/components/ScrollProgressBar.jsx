import React from 'react';
import './ScrollProgressBar.css';

/**
 * Scroll-synced progress bar with animated gradient sweep.
 * Width is driven by scrollProgress (0-1).
 */
export default function ScrollProgressBar({ progress = 0 }) {
  return (
    <div className="scroll-progress" aria-hidden="true">
      <div
        className="scroll-progress__fill"
        style={{ transform: `scaleX(${progress})` }}
      />
    </div>
  );
}
