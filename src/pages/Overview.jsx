import ProgressBar from '../components/ProgressBar.jsx';
import { categories, localizedPhase, phases } from '../data/curriculum';
import './Overview.css';
import React from 'react';
import { Link } from 'react-router-dom';

export default function Overview({ stats, t, lang }) {
  return (
    <section className="wrap">
      <div className="hero">
        <p className="eyebrow">{t('overview.eyebrow')}</p>
        <h1>Rails<span>Dev Path</span></h1>
        <div className="statGrid">
          <Stat value={stats.totalTopics} label={t('overview.totalTopics')} tone="green" />
          <Stat value={stats.newTopics} label={t('overview.newTopics')} tone="blue" />
          <Stat value={stats.doneTopics} label={t('overview.completedTopics')} />
          <Stat value={categories().length} label={t('overview.categories')} tone="orange" />
        </div>
        <div className="heroProgress">
          <div>
            <span>{t('overview.globalProgress')}</span>
            <strong>{stats.topicPct}%</strong>
          </div>
          <ProgressBar value={stats.topicPct} />
        </div>
      </div>

      <div className="sectionHead">
        <p className="sectionLabel">{t('overview.pathLabel')}</p>
        <h2>{t('overview.pathTitle')}</h2>
        <p>{t('overview.pathDesc')}</p>
      </div>

      <div className="phaseCards">
        {phases.map((rawPhase) => {
          const phase = localizedPhase(rawPhase, lang);
          return (
            <Link className={`phaseCard ${phase.tone}`} key={phase.id} to="/roadmap">
              <span className="phaseStripe" />
              <strong>{t('overview.phase')} {phase.label}</strong>
              <h3>{phase.name}</h3>
              <p>{phase.tagline}</p>
              <small>{phase.duration} →</small>
            </Link>
          );
        })}
      </div>
    </section>
  );
}

function Stat({ value, label, tone = '' }) {
  return (
    <div className="statCard">
      <strong className={tone}>{value}</strong>
      <span>{label}</span>
    </div>
  );
}
