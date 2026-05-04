import React, { useEffect, useRef, useCallback } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';
import './NetworkBackground.css';

/**
 * Persistent animated network background with drifting nodes,
 * dynamic connections, and occasional data pulses.
 * Renders on a canvas for GPU-accelerated performance.
 */

const NODE_COUNT_DESKTOP = 50;
const NODE_COUNT_MOBILE = 25;
const CONNECTION_DISTANCE = 180;
const PULSE_INTERVAL = 3000;
const NODE_SPEED = 0.3;

function createNode(width, height) {
  return {
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * NODE_SPEED,
    vy: (Math.random() - 0.5) * NODE_SPEED,
    radius: 1.5 + Math.random() * 2,
    opacity: 0.15 + Math.random() * 0.25,
    pulsePhase: Math.random() * Math.PI * 2,
    color: pickColor(),
  };
}

function pickColor() {
  const colors = [
    [184, 240, 80],   // green
    [240, 176, 64],   // orange
    [240, 88, 88],    // red
    [160, 96, 240],   // purple
    [80, 208, 240],   // blue
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}

function createPulse(nodes) {
  if (nodes.length < 2) return null;
  const startIdx = Math.floor(Math.random() * nodes.length);
  let endIdx = Math.floor(Math.random() * nodes.length);
  while (endIdx === startIdx) endIdx = Math.floor(Math.random() * nodes.length);

  const start = nodes[startIdx];
  const end = nodes[endIdx];
  const dx = end.x - start.x;
  const dy = end.y - start.y;
  const dist = Math.sqrt(dx * dx + dy * dy);

  if (dist > CONNECTION_DISTANCE * 2) return null;

  return {
    startX: start.x,
    startY: start.y,
    endX: end.x,
    endY: end.y,
    progress: 0,
    speed: 0.012 + Math.random() * 0.01,
    color: start.color,
  };
}

export default function NetworkBackground({ opacity = 0.4, className = '' }) {
  const canvasRef = useRef(null);
  const nodesRef = useRef([]);
  const pulsesRef = useRef([]);
  const rafRef = useRef(null);
  const lastPulseTime = useRef(0);
  const sizeRef = useRef({ w: 0, h: 0 });
  const prefersReduced = useReducedMotion();

  const init = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const rect = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = rect.width * dpr;
    canvas.height = rect.height * dpr;
    sizeRef.current = { w: rect.width, h: rect.height, dpr };

    const isMobile = rect.width < 768;
    const count = isMobile ? NODE_COUNT_MOBILE : NODE_COUNT_DESKTOP;
    nodesRef.current = Array.from({ length: count }, () =>
      createNode(rect.width, rect.height)
    );
    pulsesRef.current = [];
  }, []);

  const draw = useCallback(
    (timestamp) => {
      const canvas = canvasRef.current;
      if (!canvas) return;

      const ctx = canvas.getContext('2d');
      const { w, h, dpr } = sizeRef.current;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, w, h);

      const nodes = nodesRef.current;
      const pulses = pulsesRef.current;

      // Update node positions
      for (const node of nodes) {
        node.x += node.vx;
        node.y += node.vy;

        // Bounce off edges with smooth padding
        if (node.x < -20) node.vx = Math.abs(node.vx);
        if (node.x > w + 20) node.vx = -Math.abs(node.vx);
        if (node.y < -20) node.vy = Math.abs(node.vy);
        if (node.y > h + 20) node.vy = -Math.abs(node.vy);

        // Subtle pulse
        node.pulsePhase += 0.01;
        const pulse = Math.sin(node.pulsePhase) * 0.08;
        const currentOpacity = node.opacity + pulse;

        // Draw node
        ctx.beginPath();
        ctx.arc(node.x, node.y, node.radius, 0, Math.PI * 2);
        const [r, g, b] = node.color;
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${currentOpacity})`;
        ctx.fill();
      }

      // Draw connections
      for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
          const dx = nodes[i].x - nodes[j].x;
          const dy = nodes[i].y - nodes[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < CONNECTION_DISTANCE) {
            const lineOpacity = (1 - dist / CONNECTION_DISTANCE) * 0.08;
            ctx.beginPath();
            ctx.moveTo(nodes[i].x, nodes[i].y);
            ctx.lineTo(nodes[j].x, nodes[j].y);
            ctx.strokeStyle = `rgba(255, 255, 255, ${lineOpacity})`;
            ctx.lineWidth = 0.5;
            ctx.stroke();
          }
        }
      }

      // Data pulses
      if (timestamp - lastPulseTime.current > PULSE_INTERVAL) {
        const newPulse = createPulse(nodes);
        if (newPulse) pulses.push(newPulse);
        lastPulseTime.current = timestamp;
      }

      // Draw & update pulses
      for (let i = pulses.length - 1; i >= 0; i--) {
        const p = pulses[i];
        p.progress += p.speed;

        if (p.progress >= 1) {
          pulses.splice(i, 1);
          continue;
        }

        const x = p.startX + (p.endX - p.startX) * p.progress;
        const y = p.startY + (p.endY - p.startY) * p.progress;
        const pulseOpacity = Math.sin(p.progress * Math.PI) * 0.6;
        const [r, g, b] = p.color;

        // Glow
        const gradient = ctx.createRadialGradient(x, y, 0, x, y, 12);
        gradient.addColorStop(0, `rgba(${r}, ${g}, ${b}, ${pulseOpacity})`);
        gradient.addColorStop(1, `rgba(${r}, ${g}, ${b}, 0)`);
        ctx.beginPath();
        ctx.arc(x, y, 12, 0, Math.PI * 2);
        ctx.fillStyle = gradient;
        ctx.fill();

        // Core dot
        ctx.beginPath();
        ctx.arc(x, y, 2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r}, ${g}, ${b}, ${pulseOpacity + 0.2})`;
        ctx.fill();
      }

      rafRef.current = requestAnimationFrame(draw);
    },
    []
  );

  useEffect(() => {
    if (prefersReduced) return;

    init();
    rafRef.current = requestAnimationFrame(draw);

    const handleResize = () => {
      init();
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [init, draw, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <canvas
      ref={canvasRef}
      className={`network-bg ${className}`}
      style={{ opacity }}
      aria-hidden="true"
    />
  );
}
