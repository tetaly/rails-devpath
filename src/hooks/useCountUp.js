import { useEffect, useRef, useState } from 'react';

/**
 * Smooth count-up animation hook for stat numbers.
 * Uses requestAnimationFrame for smooth interpolation.
 * 
 * @param {number} target - The target number to count up to
 * @param {Object} options
 * @param {number} options.duration - Animation duration in ms
 * @param {string} options.suffix - String to append (e.g., '%')
 * @param {boolean} options.enabled - Whether the animation is active
 */
export default function useCountUp(target, { duration = 1800, suffix = '', enabled = true } = {}) {
  const [value, setValue] = useState(0);
  const rafRef = useRef(null);
  const startTimeRef = useRef(null);
  const startValueRef = useRef(0);

  useEffect(() => {
    if (!enabled) return;

    startValueRef.current = 0;
    startTimeRef.current = null;

    const animate = (timestamp) => {
      if (!startTimeRef.current) startTimeRef.current = timestamp;
      const elapsed = timestamp - startTimeRef.current;
      const progress = Math.min(elapsed / duration, 1);

      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(startValueRef.current + (target - startValueRef.current) * eased);
      setValue(current);

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      }
    };

    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration, enabled]);

  return `${value}${suffix}`;
}
