import React, { useEffect, useRef, useCallback } from 'react';
import useReducedMotion from '../hooks/useReducedMotion';
import './RailsSystemModel.css';

/* ── Node & Connection definitions ── */
const RING_COUNTS = [1, 4, 5, 4, 3]; // core, ring1, ring2, ring3, ring4
const RING_RADII = [0, 0.18, 0.32, 0.44, 0.52];
const RING_OFFSETS = [-Math.PI / 2, -Math.PI / 4, -Math.PI / 2, 0, -Math.PI / 3];

const NODES = [
  { id: 'core', label: 'RAILS', sub: 'CORE', ring: 0, idx: 0, phase: 0, col: [255, 42, 42], sz: 16 },
  { id: 'model', label: 'MODEL', sub: 'ActiveRecord', ring: 1, idx: 0, phase: 1, col: [184, 240, 80], sz: 10 },
  { id: 'view', label: 'VIEW', sub: 'ERB', ring: 1, idx: 1, phase: 1, col: [184, 240, 80], sz: 10 },
  { id: 'ctrl', label: 'CTRL', sub: 'Actions', ring: 1, idx: 2, phase: 1, col: [184, 240, 80], sz: 10 },
  { id: 'db', label: 'DB', sub: 'PostgreSQL', ring: 1, idx: 3, phase: 1, col: [184, 240, 80], sz: 10 },
  { id: 'routes', label: 'ROUTES', sub: 'REST', ring: 2, idx: 0, phase: 2, col: [240, 176, 64], sz: 8 },
  { id: 'auth', label: 'AUTH', sub: 'Devise', ring: 2, idx: 1, phase: 2, col: [240, 176, 64], sz: 8 },
  { id: 'test', label: 'TEST', sub: 'RSpec', ring: 2, idx: 2, phase: 2, col: [240, 176, 64], sz: 8 },
  { id: 'assets', label: 'ASSETS', sub: 'Pipeline', ring: 2, idx: 3, phase: 2, col: [240, 176, 64], sz: 8 },
  { id: 'mail', label: 'MAIL', sub: 'Mailer', ring: 2, idx: 4, phase: 2, col: [240, 176, 64], sz: 8 },
  { id: 'deploy', label: 'DEPLOY', sub: 'Production', ring: 3, idx: 0, phase: 3, col: [240, 88, 88], sz: 7 },
  { id: 'jobs', label: 'JOBS', sub: 'Sidekiq', ring: 3, idx: 1, phase: 3, col: [240, 88, 88], sz: 7 },
  { id: 'api', label: 'API', sub: 'JSON', ring: 3, idx: 2, phase: 3, col: [240, 88, 88], sz: 7 },
  { id: 'sec', label: 'SEC', sub: 'CSRF', ring: 3, idx: 3, phase: 3, col: [240, 88, 88], sz: 7 },
  { id: 'cache', label: 'CACHE', sub: 'Redis', ring: 4, idx: 0, phase: 4, col: [160, 96, 240], sz: 7 },
  { id: 'ws', label: 'WS', sub: 'Cable', ring: 4, idx: 1, phase: 4, col: [160, 96, 240], sz: 7 },
  { id: 'perf', label: 'PERF', sub: 'Optimize', ring: 4, idx: 2, phase: 4, col: [160, 96, 240], sz: 7 },
];

const EDGES = [
  ['core','model'],['core','view'],['core','ctrl'],['core','db'],
  ['model','view'],['view','ctrl'],['ctrl','model'],['model','db'],
  ['routes','ctrl'],['auth','ctrl'],['test','model'],['test','ctrl'],
  ['assets','view'],['mail','model'],['deploy','core'],['jobs','model'],
  ['api','ctrl'],['sec','auth'],['cache','db'],['ws','ctrl'],['perf','db'],
];

function nodeById(id) { return NODES.find(n => n.id === id); }

function nodeAngle(node, time) {
  if (node.ring === 0) return 0;
  const count = RING_COUNTS[node.ring];
  const offset = RING_OFFSETS[node.ring];
  const baseAngle = (node.idx / count) * Math.PI * 2 + offset;
  // Slow rotation per ring (inner faster)
  const speed = (5 - node.ring) * 0.00008;
  return baseAngle + time * speed;
}

function nodePos(node, cx, cy, radius, time) {
  if (node.ring === 0) return { x: cx, y: cy };
  const r = RING_RADII[node.ring] * radius * 2;
  const angle = nodeAngle(node, time);
  // Gentle breathing
  const breathe = 1 + Math.sin(time * 0.0008 + node.idx * 1.2) * 0.015;
  return {
    x: cx + Math.cos(angle) * r * breathe,
    y: cy + Math.sin(angle) * r * breathe,
  };
}

export default function RailsSystemModel({ scrollProgress = 0, activePhase = 0, hoveredPhase = null }) {
  const canvasRef = useRef(null);
  const rafRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const stateRef = useRef({ scrollProgress, activePhase, hoveredPhase });
  const pulsesRef = useRef([]);
  const lastPulseRef = useRef(0);

  // Keep state ref in sync (avoids recreating draw callback)
  useEffect(() => {
    stateRef.current = { scrollProgress, activePhase, hoveredPhase };
  }, [scrollProgress, activePhase, hoveredPhase]);

  const resize = useCallback(() => {
    const c = canvasRef.current;
    if (!c) return;
    const rect = c.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    c.width = rect.width * dpr;
    c.height = rect.height * dpr;
    c._w = rect.width; c._h = rect.height; c._dpr = dpr;
  }, []);

  const draw = useCallback((time) => {
    const c = canvasRef.current;
    if (!c) return;
    const ctx = c.getContext('2d');
    const { _w: w, _h: h, _dpr: dpr } = c;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    ctx.clearRect(0, 0, w, h);

    const { scrollProgress: sp, activePhase: ap, hoveredPhase: hp } = stateRef.current;
    const cx = w / 2;
    const cy = h / 2;
    const radius = Math.min(w, h) * 0.48;

    // Compute positions
    const positions = {};
    NODES.forEach(n => { positions[n.id] = nodePos(n, cx, cy, radius, time); });

    // Determine which phases are "active" based on scroll
    const phaseActive = (p) => {
      if (p === 0) return true; // core always active
      if (ap >= p) return true;
      return false;
    };

    const phaseHighlighted = (p) => hp !== null && hp === p;
    const nodeAlpha = (n) => {
      if (phaseHighlighted(n.phase)) return 1.0;
      if (phaseActive(n.phase)) return 0.7 + sp * 0.3;
      return 0.12;
    };

    // ── Draw connections ──
    EDGES.forEach(([fId, tId]) => {
      const fn = nodeById(fId), tn = nodeById(tId);
      const fp = positions[fId], tp = positions[tId];
      const bothActive = phaseActive(fn.phase) && phaseActive(tn.phase);
      const eitherHL = phaseHighlighted(fn.phase) || phaseHighlighted(tn.phase);
      const alpha = eitherHL ? 0.35 : bothActive ? 0.12 + sp * 0.08 : 0.03;
      const [r, g, b] = bothActive ? fn.col : [100, 100, 100];

      ctx.beginPath();
      ctx.moveTo(fp.x, fp.y);
      ctx.lineTo(tp.x, tp.y);
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.lineWidth = eitherHL ? 1.5 : 0.8;
      ctx.stroke();
    });

    // ── Data pulses ──
    if (time - lastPulseRef.current > 1800 && ap > 0) {
      // Pick a random active edge
      const activeEdges = EDGES.filter(([f, t]) => {
        const fn = nodeById(f), tn = nodeById(t);
        return phaseActive(fn.phase) && phaseActive(tn.phase);
      });
      if (activeEdges.length) {
        const [f, t] = activeEdges[Math.floor(Math.random() * activeEdges.length)];
        pulsesRef.current.push({ from: f, to: t, t: 0, col: nodeById(f).col });
      }
      lastPulseRef.current = time;
    }

    const pulses = pulsesRef.current;
    for (let i = pulses.length - 1; i >= 0; i--) {
      const p = pulses[i];
      p.t += 0.015;
      if (p.t >= 1) { pulses.splice(i, 1); continue; }
      const fp = positions[p.from], tp = positions[p.to];
      const x = fp.x + (tp.x - fp.x) * p.t;
      const y = fp.y + (tp.y - fp.y) * p.t;
      const [r, g, b] = p.col;
      const a = Math.sin(p.t * Math.PI) * 0.8;
      // Glow
      const grad = ctx.createRadialGradient(x, y, 0, x, y, 14);
      grad.addColorStop(0, `rgba(${r},${g},${b},${a})`);
      grad.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.beginPath(); ctx.arc(x, y, 14, 0, Math.PI * 2);
      ctx.fillStyle = grad; ctx.fill();
      // Dot
      ctx.beginPath(); ctx.arc(x, y, 2.5, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(${r},${g},${b},${a + 0.2})`; ctx.fill();
    }

    // ── Draw nodes ──
    NODES.forEach(n => {
      const pos = positions[n.id];
      const active = phaseActive(n.phase);
      const hl = phaseHighlighted(n.phase);
      const alpha = nodeAlpha(n);
      const [r, g, b] = n.col;
      const sz = n.sz * (hl ? 1.25 : active ? 1.0 : 0.6);

      // Outer glow
      if (active || hl) {
        const glowSz = sz * (hl ? 5 : 3.5);
        const glowAlpha = hl ? 0.3 : 0.12 + Math.sin(time * 0.002 + n.idx) * 0.05;
        const gGrad = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, glowSz);
        gGrad.addColorStop(0, `rgba(${r},${g},${b},${glowAlpha})`);
        gGrad.addColorStop(1, `rgba(${r},${g},${b},0)`);
        ctx.beginPath(); ctx.arc(pos.x, pos.y, glowSz, 0, Math.PI * 2);
        ctx.fillStyle = gGrad; ctx.fill();
      }

      // Node circle
      ctx.beginPath(); ctx.arc(pos.x, pos.y, sz, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(10,12,16,${active ? 0.8 : 0.4})`;
      ctx.fill();
      ctx.strokeStyle = `rgba(${r},${g},${b},${alpha})`;
      ctx.lineWidth = hl ? 2 : 1.2;
      ctx.stroke();

      // Inner dot
      if (active) {
        ctx.beginPath(); ctx.arc(pos.x, pos.y, sz * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.9})`;
        ctx.fill();
      }

      // Label
      if (sz > 5) {
        ctx.font = `600 ${Math.max(8, sz * 0.7)}px 'Syne', sans-serif`;
        ctx.textAlign = 'center';
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.9})`;
        ctx.fillText(n.label, pos.x, pos.y + sz + 14);
        // Sublabel
        ctx.font = `400 ${Math.max(7, sz * 0.5)}px 'JetBrains Mono', monospace`;
        ctx.fillStyle = `rgba(${r},${g},${b},${alpha * 0.5})`;
        ctx.fillText(n.sub, pos.x, pos.y + sz + 25);
      }
    });

    // ── Core hexagon overlay ──
    const coreSz = 16 + Math.sin(time * 0.002) * 2;
    const coreAlpha = 0.6 + Math.sin(time * 0.003) * 0.15;
    ctx.beginPath();
    for (let i = 0; i < 6; i++) {
      const a = (i / 6) * Math.PI * 2 - Math.PI / 2;
      const method = i === 0 ? 'moveTo' : 'lineTo';
      ctx[method](cx + Math.cos(a) * coreSz * 1.6, cy + Math.sin(a) * coreSz * 1.6);
    }
    ctx.closePath();
    ctx.strokeStyle = `rgba(255,42,42,${coreAlpha * 0.5})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();

    rafRef.current = requestAnimationFrame(draw);
  }, []);

  useEffect(() => {
    if (prefersReduced) return;
    resize();
    rafRef.current = requestAnimationFrame(draw);
    window.addEventListener('resize', resize);
    return () => {
      window.removeEventListener('resize', resize);
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [resize, draw, prefersReduced]);

  if (prefersReduced) return null;

  return (
    <div className="rails-model-container" aria-hidden="true">
      <canvas ref={canvasRef} className="rails-model-canvas" />
    </div>
  );
}
