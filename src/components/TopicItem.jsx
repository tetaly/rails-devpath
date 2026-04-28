import { localizedTopic, topicKey } from '../data/curriculum';
import './TopicItem.css';
import React from 'react';

const badgeClass = {
  Fondamental: 'base',
  Moyen: 'middle',
  Avancé: 'advanced',
};

export default function TopicItem({ topic, done, onToggle, onOpen, t, lang }) {
  const checked = done.has(topicKey(topic));
  const displayTopic = localizedTopic(topic, lang);
  const levelLabels = {
    Fondamental: t('curriculum.fundamental'),
    Moyen: t('curriculum.medium'),
    Avancé: t('curriculum.advanced'),
  };

  return (
    <div className={`topicItem ${checked ? 'done' : ''} ${topic.isNew ? 'new' : ''}`}>
      <button className="topicMain" type="button" onClick={() => onToggle(topic)}>
      <span className="check">{checked ? '✓' : ''}</span>
      <span className="topicText">
        <strong>{displayTopic.name}</strong>
        <small>{displayTopic.sub}</small>
      </span>
      </button>
      <span className="topicBadges">
        {topic.isNew && <span className="topicBadge newBadge">{t('curriculum.new')}</span>}
        <span className={`topicBadge ${badgeClass[topic.level]}`}>{levelLabels[topic.level]}</span>
      </span>
      <button className="topicDetailsButton" type="button" onClick={() => onOpen(topic)}>
        {t('curriculum.details')}
      </button>
    </div>
  );
}
