import React, { useMemo, useState } from 'react';
import TopicItem from '../components/TopicItem.jsx';
import { categories, localizedCategory, localizedTopic, topics, topicKey } from '../data/curriculum';
import { getTopicDetail, references } from '../data/topicDetails';
import './Curriculum.css';

export default function Curriculum({ done, onToggleTopic, t, lang }) {
  const [filter, setFilter] = useState('all');
  const [query, setQuery] = useState('');
  const [level, setLevel] = useState('all');
  const [phase, setPhase] = useState('all');
  const [selectedTopic, setSelectedTopic] = useState(null);
  const filters = [
    ['all', t('curriculum.all')],
    ['new', t('curriculum.new')],
    ...categories().map((cat) => [cat, localizedCategory(cat, lang)]),
  ];

  const visible = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();
    return topics.filter((topic) => {
      const matchesCategory = filter === 'all' || (filter === 'new' ? topic.isNew : topic.cat === filter);
      const matchesLevel = level === 'all' || topic.level === level;
      const matchesPhase = phase === 'all' || topic.phase === Number(phase);
      const displayTopic = localizedTopic(topic, lang);
      const matchesQuery = !normalizedQuery || [topic.name, topic.sub, topic.cat, displayTopic.name, displayTopic.sub, displayTopic.cat].join(' ').toLowerCase().includes(normalizedQuery);
      return matchesCategory && matchesLevel && matchesPhase && matchesQuery;
    });
  }, [filter, level, phase, query]);

  const doneVisible = visible.filter((topic) => done.has(topicKey(topic))).length;
  const remainingVisible = visible.length - doneVisible;

  const grouped = categories()
    .map((cat) => [cat, visible.filter((topic) => topic.cat === cat)])
    .filter(([, items]) => items.length);

  return (
    <section className="wrap curriculum">
      <div className="sectionHead">
        <p className="sectionLabel">{t('curriculum.label')}</p>
        <h2>{t('curriculum.titleLine1')}<br />{t('curriculum.titleLine2')}</h2>
        <p>{t('curriculum.desc')}</p>
      </div>

      <div className="curriculumToolbar">
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder={t('curriculum.search')}
        />
        <select value={level} onChange={(event) => setLevel(event.target.value)} aria-label={t('curriculum.level')}>
          <option value="all">{t('curriculum.allLevels')}</option>
          <option value="Fondamental">{t('curriculum.fundamental')}</option>
          <option value="Moyen">{t('curriculum.medium')}</option>
          <option value="Avancé">{t('curriculum.advanced')}</option>
        </select>
        <select value={phase} onChange={(event) => setPhase(event.target.value)} aria-label={t('curriculum.phase')}>
          <option value="all">{t('curriculum.allPhases')}</option>
          <option value="1">Phase 01</option>
          <option value="2">Phase 02</option>
          <option value="3">Phase 03</option>
          <option value="4">Phase 04</option>
        </select>
      </div>

      <div className="filterRow">
        {filters.map(([value, label]) => (
          <button className={filter === value ? 'active' : ''} key={value} type="button" onClick={() => setFilter(value)}>
            {label}
          </button>
        ))}
      </div>

      <div className="legend">
        <span><i className="base" />{t('curriculum.fundamental')}</span>
        <span><i className="middle" />{t('curriculum.medium')}</span>
        <span><i className="advanced" />{t('curriculum.advanced')}</span>
        <span><i className="new" />{t('curriculum.new')}</span>
      </div>

      <div className="curriculumStats">
        <span><strong>{visible.length}</strong>{t('curriculum.results')}</span>
        <span><strong>{doneVisible}</strong>{t('curriculum.done')}</span>
        <span><strong>{remainingVisible}</strong>{t('curriculum.remaining')}</span>
      </div>

      {!visible.length ? (
        <div className="emptyState">{t('curriculum.empty')}</div>
      ) : filter === 'new' ? (
        <div className="flatGrid">
          {visible.map((topic) => (
            <TopicItem topic={topic} done={done} onToggle={onToggleTopic} onOpen={setSelectedTopic} t={t} lang={lang} key={topicKey(topic)} />
          ))}
        </div>
      ) : (
        <div className="categoryGrid">
          {grouped.map(([cat, items]) => (
            <article className="categoryBlock" key={cat}>
              <header>
                <div>
                  <h3>{localizedCategory(cat, lang)}</h3>
                  <div className="categoryProgress">
                    <span style={{ width: `${Math.round((items.filter((topic) => done.has(topicKey(topic))).length / items.length) * 100)}%` }} />
                  </div>
                </div>
                <span>{items.filter((topic) => done.has(topicKey(topic))).length}/{items.length}</span>
              </header>
              <div>
                {items.map((topic) => (
                  <TopicItem topic={topic} done={done} onToggle={onToggleTopic} onOpen={setSelectedTopic} t={t} lang={lang} key={topicKey(topic)} />
                ))}
              </div>
            </article>
          ))}
        </div>
      )}

      {selectedTopic && <TopicDetailPopup topic={selectedTopic} onClose={() => setSelectedTopic(null)} t={t} lang={lang} />}
    </section>
  );
}

function TopicDetailPopup({ topic, onClose, t, lang }) {
  const displayTopic = localizedTopic(topic, lang);
  const detail = getTopicDetail(topic, lang, displayTopic);

  return (
    <div className="topicPopupBackdrop" role="presentation" onClick={onClose}>
      <div className="topicPopup" role="dialog" aria-modal="true" aria-label={topic.name} onClick={(event) => event.stopPropagation()}>
        <header className="topicPopupHeader">
          <div>
            <span>{displayTopic.cat} · {t('curriculum.phase')} {topic.phase}</span>
            <h3>{displayTopic.name}</h3>
            <p>{displayTopic.sub}</p>
          </div>
          <button type="button" onClick={onClose}>{t('curriculum.close')}</button>
        </header>

        <div className="topicMetaRow">
          <span>{topic.level}</span>
          <span>{displayTopic.cat}</span>
          {topic.isNew && <span>{t('curriculum.new')}</span>}
        </div>

        <div className="detailHeroBlock">
          <h4>{t('curriculum.detailGoal')}</h4>
          <p>{detail.goal}</p>
        </div>

        <div className="detailPopupGrid">
          <DetailBlock title={t('curriculum.detailExercise')}>
            <p>{detail.exercise}</p>
          </DetailBlock>

          <DetailBlock title={t('curriculum.detailMediTrack')}>
            <p>{detail.meditrack}</p>
          </DetailBlock>
        </div>

        <DetailBlock title={t('curriculum.detailLearn')} variant="wide">
          <ul className="learnGrid">
            {detail.learn.map((item) => <li key={item}>{item}</li>)}
          </ul>
        </DetailBlock>

        <DetailBlock title={t('curriculum.detailMistake')} variant="warning">
          <p>{detail.mistake}</p>
        </DetailBlock>

        <DetailBlock title={t('curriculum.detailRefs')} variant="wide">
          <div className="referenceLinks">
            {detail.refs.map((refKey) => {
              const ref = references[refKey];
              return <a href={ref.url} target="_blank" rel="noreferrer" key={ref.url}>{ref.label}</a>;
            })}
          </div>
        </DetailBlock>
      </div>
    </div>
  );
}

function DetailBlock({ title, children, variant = '' }) {
  return (
    <section className={`detailBlock ${variant}`}>
      <h4>{title}</h4>
      {children}
    </section>
  );
}
