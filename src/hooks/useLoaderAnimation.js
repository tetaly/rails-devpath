import { useEffect, useRef, useState, useCallback } from 'react';
import anime from 'animejs';
import useReducedMotion from './useReducedMotion';

/**
 * System loader animation hook.
 * Simulates a Rails system boot sequence with typing messages,
 * node activation, and line connections.
 * 
 * @param {Object} options
 * @param {string[]} options.messages - Boot messages to display
 * @param {number} options.typeSpeed - Characters per tick (ms)
 * @param {number} options.minDuration - Minimum loader duration in ms
 * @param {Function} options.onComplete - Called when loader finishes
 */
export default function useLoaderAnimation(options = {}) {
  const prefersReduced = useReducedMotion();
  const [isLoading, setIsLoading] = useState(true);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageIndex, setMessageIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [completedMessages, setCompletedMessages] = useState([]);
  const [nodeProgress, setNodeProgress] = useState(0);
  const [exitPhase, setExitPhase] = useState(false);
  const timerRef = useRef(null);
  const startTime = useRef(Date.now());

  const {
    messages = [
      'Initializing Rails environment...',
      'Loading modules...',
      'Compiling assets...',
      'Connecting to database...',
      'Starting application server...',
      'System ready.',
    ],
    typeSpeed = 30,
    minDuration = 3200,
    onComplete,
  } = options;

  // Skip loader for reduced motion
  useEffect(() => {
    if (prefersReduced) {
      setIsLoading(false);
      onComplete?.();
    }
  }, [prefersReduced]);

  // Typing animation loop
  useEffect(() => {
    if (prefersReduced || !isLoading || exitPhase) return;
    if (messageIndex >= messages.length) {
      // All messages typed — begin exit sequence
      const elapsed = Date.now() - startTime.current;
      const remaining = Math.max(0, minDuration - elapsed);
      
      timerRef.current = setTimeout(() => {
        setExitPhase(true);
      }, remaining + 400);
      return;
    }

    const msg = messages[messageIndex];
    if (charIndex < msg.length) {
      timerRef.current = setTimeout(() => {
        setCurrentMessage(msg.slice(0, charIndex + 1));
        setCharIndex((c) => c + 1);
      }, typeSpeed);
    } else {
      // Message complete
      timerRef.current = setTimeout(() => {
        setCompletedMessages((prev) => [...prev, msg]);
        setCurrentMessage('');
        setCharIndex(0);
        setMessageIndex((i) => i + 1);
        setNodeProgress((i) => Math.min(i + 1, messages.length));
      }, 200);
    }

    return () => clearTimeout(timerRef.current);
  }, [isLoading, messageIndex, charIndex, exitPhase, prefersReduced, messages, typeSpeed, minDuration]);

  // Exit transition
  useEffect(() => {
    if (!exitPhase) return;

    const exitTimer = setTimeout(() => {
      setIsLoading(false);
      onComplete?.();
    }, 800); // Duration of exit animation

    return () => clearTimeout(exitTimer);
  }, [exitPhase, onComplete]);

  return {
    isLoading,
    currentMessage,
    completedMessages,
    messageIndex,
    nodeProgress,
    totalNodes: messages.length,
    exitPhase,
    progress: messages.length > 0 ? nodeProgress / messages.length : 1,
  };
}
