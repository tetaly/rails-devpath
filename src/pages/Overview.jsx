import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import anime from 'animejs';

import ProgressBar from '../components/ProgressBar.jsx';
import NetworkBackground from '../components/NetworkBackground.jsx';
import ScrollProgressBar from '../components/ScrollProgressBar.jsx';
import AnimatedStat from '../components/AnimatedStat.jsx';
import SystemLoader from '../components/SystemLoader.jsx';
import RailsSystemModel from '../components/RailsSystemModel.jsx';

import useScrollAnimation from '../hooks/useScrollAnimation.js';
import useReducedMotion from '../hooks/useReducedMotion.js';

import { categories, localizedPhase, phases } from '../data/curriculum';
import './Overview.css';

const TECH_STACK = [
  { name: 'Ruby on Rails', desc: 'Backend framework' },
  { name: 'React 18', desc: 'Frontend UI' },
  { name: 'Supabase', desc: 'Auth & Database' },
  { name: 'Anime.js', desc: 'Animations' },
  { name: 'Vite', desc: 'Build tool' },
  { name: 'JetBrains Mono', desc: 'Typography' },
];

export default function Overview({ stats, t, lang }) {
  const alreadySeen = sessionStorage.getItem('loaderSeen') === 'true';
  const [loaderDone, setLoaderDone] = useState(alreadySeen);
  const [activePhase, setActivePhase] = useState(4);
  const [hoveredPhase, setHoveredPhase] = useState(null);
  const heroRef = useRef(null);
  const prefersReduced = useReducedMotion();
  const { scrollProgress } = useScrollAnimation({ lerp: 0.06, disabled: !loaderDone });
  const cardRefs = useRef([]);
  const heroContentRef = useRef(null);

  const handleLoaderComplete = useCallback(() => {
    sessionStorage.setItem('loaderSeen', 'true');
    setLoaderDone(true);
  }, []);

  useEffect(() => {
    if (prefersReduced) {
      sessionStorage.setItem('loaderSeen', 'true');
      setLoaderDone(true);
    }
  }, [prefersReduced]);

  // ── Hero entrance timeline ──
  useEffect(() => {
    if (!loaderDone || prefersReduced) return;

    const titleChars = document.querySelectorAll('.hero-char');
    if (titleChars.length) {
      anime({
        targets: titleChars,
        translateY: [80, 0],
        opacity: [0, 1],
        rotateX: [50, 0],
        duration: 1200,
        delay: anime.stagger(35, { start: 100 }),
        easing: 'easeOutExpo',
      });
    }

    anime({
      targets: '.hero-reveal',
      translateY: [60, 0],
      opacity: [0, 1],
      duration: 1200,
      delay: anime.stagger(100, { start: 500 }),
      easing: 'easeOutCubic',
    });
  }, [loaderDone, prefersReduced]);

  // ── Hero parallax ──
  useEffect(() => {
    if (!loaderDone || prefersReduced) return;
    const el = heroContentRef.current;
    if (!el) return;

    let raf;
    const tick = () => {
      const sy = window.scrollY;
      const parallax = sy * 0.3;
      const opacity = Math.max(0, 1 - sy / (window.innerHeight * 0.7));
      const scale = 1 - sy * 0.00008;
      el.style.transform = `translateY(${parallax}px) scale(${Math.max(scale, 0.92)})`;
      el.style.opacity = opacity;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [loaderDone, prefersReduced]);

  // ── Phase card scroll reveal (repeats every scroll) ──
  useEffect(() => {
    if (!loaderDone || prefersReduced) return;

    const observers = [];
    cardRefs.current.forEach((el, i) => {
      if (!el) return;
      el.style.opacity = '0';
      el.style.transform = 'translateY(50px) scale(0.95)';

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            const tl = anime.timeline({ easing: 'easeOutCubic' });
            tl.add({ targets: el, translateY: [50, 0], scale: [0.95, 1], opacity: [0, 1], duration: 800 });
            tl.add({ targets: el.querySelector('.phaseStripe'), scaleY: [0, 1], opacity: [0, 1], duration: 500, easing: 'easeOutExpo' }, '-=500');
            tl.add({ targets: el.querySelector('.card-title'), translateX: [-15, 0], opacity: [0, 1], duration: 400 }, '-=350');
            tl.add({ targets: el.querySelector('.card-heading'), translateY: [12, 0], opacity: [0, 1], duration: 400 }, '-=250');
            tl.add({ targets: el.querySelector('.card-desc'), translateY: [12, 0], opacity: [0, 1], duration: 400 }, '-=200');
            tl.add({ targets: el.querySelector('.card-meta'), opacity: [0, 1], duration: 300 }, '-=150');
          } else {
            // Reset when leaving viewport so animation replays
            anime.remove(el);
            el.style.opacity = '0';
            el.style.transform = 'translateY(50px) scale(0.95)';
            const stripe = el.querySelector('.phaseStripe');
            const title = el.querySelector('.card-title');
            const heading = el.querySelector('.card-heading');
            const desc = el.querySelector('.card-desc');
            const meta = el.querySelector('.card-meta');
            if (stripe) { stripe.style.opacity = '0'; stripe.style.transform = 'scaleY(0)'; }
            if (title) { title.style.opacity = '0'; title.style.transform = 'translateX(-15px)'; }
            if (heading) { heading.style.opacity = '0'; heading.style.transform = 'translateY(12px)'; }
            if (desc) { desc.style.opacity = '0'; desc.style.transform = 'translateY(12px)'; }
            if (meta) { meta.style.opacity = '0'; }
          }
        },
        { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });

    return () => observers.forEach(o => o.disconnect());
  }, [loaderDone, prefersReduced]);

  // ── Generic section reveal (repeats every scroll) ──
  useEffect(() => {
    if (!loaderDone || prefersReduced) return;
    const els = document.querySelectorAll('.section-reveal');
    els.forEach(el => { el.style.opacity = '0'; el.style.transform = 'translateY(35px)'; });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            anime({
              targets: entry.target,
              translateY: [35, 0],
              opacity: [0, 1],
              duration: 800,
              easing: 'easeOutCubic',
            });
          } else {
            anime.remove(entry.target);
            entry.target.style.opacity = '0';
            entry.target.style.transform = 'translateY(35px)';
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -30px 0px' }
    );
    els.forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, [loaderDone, prefersReduced]);

  function splitChars(text, className = '') {
    return text.split('').map((char, i) => (
      <span key={i} className={`hero-char ${className}`} style={{ display: 'inline-block', opacity: 0, '--i': i }}>
        {char === ' ' ? '\u00A0' : char}
      </span>
    ));
  }

  return (
    <>
      {!loaderDone && <SystemLoader onComplete={handleLoaderComplete} />}

      <NetworkBackground opacity={0.25} />

      <RailsSystemModel
        scrollProgress={scrollProgress}
        activePhase={activePhase}
        hoveredPhase={hoveredPhase}
      />

      {loaderDone && <ScrollProgressBar progress={scrollProgress} />}

      <section className="overview-wrapper" ref={heroRef}>
        {/* ═══ HERO ═══ */}
        <div className="hero" ref={heroContentRef}>
          <p className="eyebrow hero-reveal">{t('overview.eyebrow')}</p>
          <h1 className="hero-glow">
            <span className="hero-title-line">{splitChars('Rails')}</span>
            <span className="hero-title-line hero-title-accent">{splitChars('DevPath', 'accent')}</span>
          </h1>
          <div className="statGrid hero-reveal">
            <AnimatedStat value={stats.totalTopics} label={t('overview.totalTopics')} tone="green" />
            <AnimatedStat value={stats.newTopics} label={t('overview.newTopics')} tone="blue" />
            <AnimatedStat value={stats.doneTopics} label={t('overview.completedTopics')} />
            <AnimatedStat value={categories().length} label={t('overview.categories')} tone="orange" />
          </div>
          <div className="heroProgress hero-reveal">
            <div>
              <span>{t('overview.globalProgress')}</span>
              <strong>{stats.topicPct}%</strong>
            </div>
            <ProgressBar value={stats.topicPct} />
          </div>
        </div>

        {/* ═══ ABOUT ═══ */}
        <div className="sectionHead section-reveal">
          <p className="sectionLabel">{t('overview.aboutLabel')}</p>
          <h2>{t('overview.aboutTitle')}</h2>
          <p>{t('overview.aboutDesc')}</p>
        </div>

        <div className="featureGrid section-reveal">
          {[1, 2, 3, 4].map(n => (
            <div className="featureBox" key={n}>
              <span className="featureIcon">{['📚', '🏗️', '💾', '🗺️'][n - 1]}</span>
              <strong>{t(`overview.aboutFeature${n}Title`)}</strong>
              <p>{t(`overview.aboutFeature${n}Desc`)}</p>
            </div>
          ))}
        </div>

        {/* ═══ LEARNING PATH ═══ */}
        <div className="sectionHead section-reveal">
          <p className="sectionLabel">{t('overview.pathLabel')}</p>
          <h2>{t('overview.pathTitle')}</h2>
          <p>{t('overview.pathDesc')}</p>
        </div>

        <div className="phaseCards">
          {phases.map((rawPhase, i) => {
            const phase = localizedPhase(rawPhase, lang);
            return (
              <Link
                className={`phaseCard ${phase.tone}`}
                key={phase.id}
                to="/roadmap"
                ref={el => (cardRefs.current[i] = el)}
                onMouseEnter={() => setHoveredPhase(phase.id)}
                onMouseLeave={() => setHoveredPhase(null)}
              >
                <span className="phaseStripe" />
                <strong className="card-title">{t('overview.phase')} {phase.label}</strong>
                <h3 className="card-heading">{phase.name}</h3>
                <p className="card-desc">{phase.tagline}</p>
                <small className="card-meta">{phase.duration} →</small>
              </Link>
            );
          })}
        </div>

        {/* ═══ HOW TO USE ═══ */}
        <div className="sectionHead section-reveal">
          <p className="sectionLabel">{t('overview.guideLabel')}</p>
          <h2>{t('overview.guideTitle')}</h2>
        </div>

        <div className="guideSteps">
          {[1, 2, 3, 4].map(n => (
            <div className="guideStep section-reveal" key={n}>
              <div className="guideStepNumber">{String(n).padStart(2, '0')}</div>
              <div className="guideStepContent">
                <strong>{t(`overview.guideStep${n}Title`)}</strong>
                <p>{t(`overview.guideStep${n}Desc`)}</p>
              </div>
            </div>
          ))}
        </div>

        {/* ═══ NAVIGATION MAP ═══ */}
        <div className="sectionHead section-reveal">
          <p className="sectionLabel">{t('overview.navLabel')}</p>
          <h2>{t('overview.navTitle')}</h2>
        </div>

        <div className="navGrid section-reveal">
          {['Overview', 'Roadmap', 'Curriculum', 'Project'].map((key) => {
            const k = key.toLowerCase();
            const paths = { overview: '/', roadmap: '/roadmap', curriculum: '/curriculum', project: '/project' };
            const tones = { overview: 'green', roadmap: 'orange', curriculum: 'blue', project: 'red' };
            return (
              <Link className={`navCard navCard--${tones[k]}`} key={k} to={paths[k]}>
                <strong>{t(`overview.nav${key}Title`)}</strong>
                <p>{t(`overview.nav${key}Desc`)}</p>
                <small>→</small>
              </Link>
            );
          })}
        </div>

        {/* ═══ TECH STACK ═══ */}
        <div className="sectionHead section-reveal">
          <p className="sectionLabel">{t('overview.techLabel')}</p>
          <h2>{t('overview.techTitle')}</h2>
        </div>

        <div className="techGrid section-reveal">
          {TECH_STACK.map(item => (
            <div className="techBadge" key={item.name}>
              <strong>{item.name}</strong>
              <span>{item.desc}</span>
            </div>
          ))}
        </div>

        {/* ═══ CTA ═══ */}
        <div className="ctaSection section-reveal">
          <h2>{t('overview.ctaTitle')}</h2>
          <p>{t('overview.ctaDesc')}</p>
          <div className="ctaButtons">
            <Link to="/curriculum" className="ctaBtn ctaBtn--primary">{t('overview.ctaButton1')}</Link>
            <Link to="/project" className="ctaBtn ctaBtn--secondary">{t('overview.ctaButton2')}</Link>
          </div>
        </div>
      </section>
    </>
  );
}
