import React, { useEffect, useRef, useCallback } from 'react';
import useLoaderAnimation from '../hooks/useLoaderAnimation';
import './SystemLoader.css';

/**
 * Full-screen loading sequence simulating a Rails system boot.
 * Features:
 * - Dark overlay with animated network graph
 * - Typing-style system messages
 * - Progressive node activation
 * - Seamless exit transition (morph into hero)
 */

// Mini canvas for loader graph
function LoaderGraph({ progress, totalNodes, exitPhase }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const nodesRef = useRef([]);
  const timeRef = useRef(0);

  const initGraph = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;

    // Create fixed positions for nodes in a beautiful layout
    const cx = rect.width / 2;
    const cy = rect.height / 2;
    const radius = Math.min(rect.width, rect.height) * 0.3;

    nodesRef.current = Array.from({ length: totalNodes }, (_, i) => {
      const angle = (i / totalNodes) * Math.PI * 2 - Math.PI / 2;
      return {
        x: cx + Math.cos(angle) * radius,
        y: cy + Math.sin(angle) * radius,
        baseX: cx + Math.cos(angle) * radius,
        baseY: cy + Math.sin(angle) * radius,
        activated: false,
        activateTime: 0,
        radius: 6,
      };
    });
  }, [totalNodes]);

  useEffect(() => {
    initGraph();

    const draw = (timestamp) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const rect = canvas.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, rect.width, rect.height);

      timeRef.current += 0.016;
      const nodes = nodesRef.current;
      const cx = rect.width / 2;
      const cy = rect.height / 2;

      // Update node activation state
      const activeCount = Math.floor(progress * totalNodes);
      nodes.forEach((node, i) => {
        if (i < activeCount && !node.activated) {
          node.activated = true;
          node.activateTime = timeRef.current;
        }
        // Gentle drift
        node.x = node.baseX + Math.sin(timeRef.current * 0.5 + i) * 3;
        node.y = node.baseY + Math.cos(timeRef.current * 0.4 + i * 0.7) * 3;
      });

      // Draw connections between activated nodes
      for (let i = 0; i < nodes.length; i++) {
        if (!nodes[i].activated) continue;
        for (let j = i + 1; j < nodes.length; j++) {
          if (!nodes[j].activated) continue;

          const timeSinceI = timeRef.current - nodes[i].activateTime;
          const timeSinceJ = timeRef.current - nodes[j].activateTime;
          const lineOpacity = Math.min(timeSinceI, timeSinceJ, 1) * 0.3;

          ctx.beginPath();
          ctx.moveTo(nodes[i].x, nodes[i].y);
          ctx.lineTo(nodes[j].x, nodes[j].y);
          ctx.strokeStyle = `rgba(184, 240, 80, ${lineOpacity})`;
          ctx.lineWidth = 1;
          ctx.stroke();
        }
      }

      // Draw center hub
      const hubGlow = Math.sin(timeRef.current * 2) * 0.15 + 0.4;
      const hubGradient = ctx.createRadialGradient(cx, cy, 0, cx, cy, 20);
      hubGradient.addColorStop(0, `rgba(255, 42, 42, ${hubGlow})`);
      hubGradient.addColorStop(1, 'rgba(255, 42, 42, 0)');
      ctx.beginPath();
      ctx.arc(cx, cy, 20, 0, Math.PI * 2);
      ctx.fillStyle = hubGradient;
      ctx.fill();

      ctx.beginPath();
      ctx.arc(cx, cy, 5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 42, 42, 0.9)`;
      ctx.fill();

      // Draw connections to center
      nodes.forEach((node) => {
        if (!node.activated) return;
        const timeSince = timeRef.current - node.activateTime;
        const lineOpacity = Math.min(timeSince, 1) * 0.15;
        ctx.beginPath();
        ctx.moveTo(cx, cy);
        ctx.lineTo(node.x, node.y);
        ctx.strokeStyle = `rgba(255, 42, 42, ${lineOpacity})`;
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // Draw nodes
      nodes.forEach((node, i) => {
        const isActive = node.activated;
        const timeSince = isActive ? timeRef.current - node.activateTime : 0;
        const scale = isActive ? Math.min(timeSince * 3, 1) : 0;
        const r = node.radius * scale;

        if (r <= 0) return;

        // Glow
        const glowRadius = r * 4;
        const glowGradient = ctx.createRadialGradient(
          node.x, node.y, 0,
          node.x, node.y, glowRadius
        );
        const color = isActive ? '184, 240, 80' : '119, 113, 106';
        glowGradient.addColorStop(0, `rgba(${color}, ${0.3 * scale})`);
        glowGradient.addColorStop(1, `rgba(${color}, 0)`);
        ctx.beginPath();
        ctx.arc(node.x, node.y, glowRadius, 0, Math.PI * 2);
        ctx.fillStyle = glowGradient;
        ctx.fill();

        // Core
        ctx.beginPath();
        ctx.arc(node.x, node.y, r, 0, Math.PI * 2);
        ctx.fillStyle = isActive
          ? `rgba(184, 240, 80, ${0.8 * scale})`
          : `rgba(119, 113, 106, 0.3)`;
        ctx.fill();
      });

      rafRef.current = requestAnimationFrame(draw);
    };

    rafRef.current = requestAnimationFrame(draw);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [initGraph, progress, totalNodes]);

  return (
    <canvas
      ref={canvasRef}
      className={`loader-graph ${exitPhase ? 'loader-graph--exit' : ''}`}
      aria-hidden="true"
    />
  );
}

export default function SystemLoader({ onComplete }) {
  const {
    isLoading,
    currentMessage,
    completedMessages,
    nodeProgress,
    totalNodes,
    exitPhase,
    progress,
  } = useLoaderAnimation({
    messages: [
      'Initializing Rails environment...',
      'Loading ActiveRecord modules...',
      'Compiling asset pipeline...',
      'Connecting to PostgreSQL...',
      'Starting Puma server...',
      'System ready.',
    ],
    typeSpeed: 25,
    minDuration: 3000,
    onComplete,
  });

  if (!isLoading && !exitPhase) return null;

  return (
    <div className={`system-loader ${exitPhase ? 'system-loader--exit' : ''}`}>
      <div className="loader-content">
        <LoaderGraph
          progress={progress}
          totalNodes={totalNodes}
          exitPhase={exitPhase}
        />

        <div className="loader-terminal">
          <div className="terminal-header">
            <span className="terminal-dot terminal-dot--red" />
            <span className="terminal-dot terminal-dot--yellow" />
            <span className="terminal-dot terminal-dot--green" />
            <span className="terminal-title">rails server</span>
          </div>
          <div className="terminal-body">
            {completedMessages.map((msg, i) => (
              <div key={i} className="terminal-line terminal-line--complete">
                <span className="terminal-prompt">▸</span>
                <span>{msg}</span>
                <span className="terminal-check">✓</span>
              </div>
            ))}
            {currentMessage && (
              <div className="terminal-line terminal-line--typing">
                <span className="terminal-prompt terminal-prompt--active">▸</span>
                <span>{currentMessage}</span>
                <span className="terminal-cursor">█</span>
              </div>
            )}
          </div>

          <div className="loader-progress-track">
            <div
              className="loader-progress-fill"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
