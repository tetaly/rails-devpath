import { useEffect, useRef } from 'react';
import anime from 'animejs';
import useReducedMotion from './useReducedMotion';

/**
 * Intersection Observer-based reveal animation hook.
 * Animates elements with class `revealTarget` inside the container ref.
 * 
 * @param {Object} options
 * @param {number} options.threshold - IntersectionObserver threshold (0-1)
 * @param {number} options.stagger - Delay between staggered elements in ms
 * @param {number} options.duration - Animation duration in ms
 * @param {string} options.easing - Anime.js easing function
 * @param {boolean} options.once - Only animate once (default true)
 * @param {number} options.translateY - Starting translateY offset
 * @param {number} options.scale - Starting scale value
 * @param {boolean} options.blur - Apply blur-to-sharp effect
 */
export default function useRevealAnimation(options = {}) {
  const containerRef = useRef(null);
  const prefersReduced = useReducedMotion();

  const {
    threshold = 0.15,
    stagger = 80,
    duration = 900,
    easing = 'easeOutCubic',
    once = true,
    translateY = 40,
    scale = 0.97,
    blur = false,
  } = options;

  useEffect(() => {
    if (prefersReduced || !containerRef.current) return;

    const elements = containerRef.current.querySelectorAll('.reveal');
    if (!elements.length) return;

    // Set initial hidden state
    elements.forEach((el) => {
      el.style.opacity = '0';
      el.style.transform = `translateY(${translateY}px) scale(${scale})`;
      el.style.willChange = 'transform, opacity';
      if (blur) {
        el.style.filter = 'blur(6px)';
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;

          // Find all reveal children within this observed element
          const targets = entry.target.classList.contains('reveal')
            ? [entry.target]
            : entry.target.querySelectorAll('.reveal');

          const animProps = {
            targets,
            translateY: [translateY, 0],
            scale: [scale, 1],
            opacity: [0, 1],
            duration,
            easing,
            delay: anime.stagger(stagger),
            complete: () => {
              // Clean up will-change for perf
              Array.from(targets).forEach((t) => {
                t.style.willChange = 'auto';
                t.style.filter = '';
              });
            },
          };

          if (blur) {
            // We handle blur through a separate filter animation
            animProps.filter = ['blur(6px)', 'blur(0px)'];
          }

          anime(animProps);

          if (once) observer.unobserve(entry.target);
        });
      },
      { threshold, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [prefersReduced, threshold, stagger, duration, easing, once, translateY, scale, blur]);

  return containerRef;
}
