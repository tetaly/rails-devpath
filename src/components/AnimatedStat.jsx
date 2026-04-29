import React, { useRef, useState, useEffect } from 'react';
import useCountUp from '../hooks/useCountUp';

/**
 * Stat card with smooth count-up animation.
 * Triggers when entering viewport via IntersectionObserver.
 */
export default function AnimatedStat({ value, label, tone = '' }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const displayValue = useCountUp(value, { duration: 1800, enabled: visible });

  return (
    <div className="statCard" ref={ref}>
      <strong className={tone}>{displayValue}</strong>
      <span>{label}</span>
    </div>
  );
}
