import { useEffect, useRef, useState, useCallback } from 'react';

/**
 * Lerp-based smooth scroll hook with scroll progress tracking.
 * Uses requestAnimationFrame for silky smooth inertia scrolling.
 * 
 * Returns:
 * - scrollProgress (0-1): normalized scroll position
 * - scrollY: current interpolated scroll Y
 * - containerRef: ref for the scroll container (or use window)
 */
export default function useScrollAnimation({ lerp = 0.08, disabled = false } = {}) {
  const [scrollProgress, setScrollProgress] = useState(0);
  const currentY = useRef(0);
  const targetY = useRef(0);
  const rafId = useRef(null);
  const isActive = useRef(true);

  const tick = useCallback(() => {
    if (!isActive.current) return;

    // Lerp interpolation
    currentY.current += (targetY.current - currentY.current) * lerp;

    // Snap when close enough to avoid micro-updates
    if (Math.abs(targetY.current - currentY.current) < 0.5) {
      currentY.current = targetY.current;
    }

    const max = document.documentElement.scrollHeight - window.innerHeight;
    const progress = max > 0 ? Math.min(Math.max(currentY.current / max, 0), 1) : 0;
    setScrollProgress(progress);

    rafId.current = requestAnimationFrame(tick);
  }, [lerp]);

  useEffect(() => {
    if (disabled) return;

    isActive.current = true;

    const handleScroll = () => {
      targetY.current = window.scrollY;
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    targetY.current = window.scrollY;
    currentY.current = window.scrollY;
    rafId.current = requestAnimationFrame(tick);

    return () => {
      isActive.current = false;
      window.removeEventListener('scroll', handleScroll);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [tick, disabled]);

  return { scrollProgress, scrollY: currentY };
}
