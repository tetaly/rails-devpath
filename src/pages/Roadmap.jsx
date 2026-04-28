import React, { useState } from 'react';
import { localizedCategory, localizedPhase, localizedTopic, phases, topics, topicKey } from '../data/curriculum';
import './Roadmap.css';

const phaseDetailKeys = {
  1: ['roadmap.foundationsObjective', 'roadmap.foundationsDeliverable'],
  2: ['roadmap.constructionObjective', 'roadmap.constructionDeliverable'],
  3: ['roadmap.productionObjective', 'roadmap.productionDeliverable'],
  4: ['roadmap.excellenceObjective', 'roadmap.excellenceDeliverable'],
};

export default function Roadmap({ done, t, lang }) {
  const [open, setOpen] = useState(1);
  const totalDone = topics.filter((topic) => done.has(topicKey(topic))).length;
  const totalPct = Math.round((totalDone / topics.length) * 100);

  return (
    <section className="wrap roadmap">
      <div className="sectionHead">
        <p className="sectionLabel">{t('roadmap.label')}</p>
        <h2>{t('roadmap.titleLine1')}<br />{t('roadmap.titleLine2')}</h2>
        <p>{t('roadmap.desc')}</p>
      </div>

      <div className="roadSummary">
        <div>
          <strong>{totalPct}%</strong>
          <span>{t('roadmap.completed')}</span>
        </div>
        <div>
          <strong>{topics.length}</strong>
          <span>{t('roadmap.topics')}</span>
        </div>
        <div>
          <strong>{phases.length}</strong>
          <span>{t('roadmap.phases')}</span>
        </div>
      </div>

      <div className="phaseList">
        {phases.map((rawPhase) => {
          const phase = localizedPhase(rawPhase, lang);
          const phaseTopics = topics.filter((topic) => topic.phase === phase.id);
          const doneCount = phaseTopics.filter((topic) => done.has(topicKey(topic))).length;
          const pct = Math.round((doneCount / phaseTopics.length) * 100);
          const modules = buildModules(phaseTopics, done, lang);
          const [objectiveKey, deliverableKey] = phaseDetailKeys[phase.id];
          const levelCounts = countLevels(phaseTopics);

          return (
            <article className={`roadPhase ${phase.tone} ${open === phase.id ? 'open' : ''}`} key={phase.id}>
              <button className="roadPhaseHead" type="button" onClick={() => setOpen(open === phase.id ? null : phase.id)}>
                <span>{phase.label}</span>
                <i />
                <div>
                  <h3>{phase.name}</h3>
                  <p>{phase.tagline}</p>
                  <div className="phaseMiniBar"><span style={{ width: `${pct}%` }} /></div>
                </div>
                <small>{doneCount}/{phaseTopics.length} {t('roadmap.topics')}</small>
                <em>{phase.duration}</em>
              </button>
              {open === phase.id && (
                <div className="phaseDetail">
                  <div className="phaseDetailGrid">
                    <div className="phaseInfoBox">
                      <span>{t('roadmap.objective')}</span>
                      <p>{t(objectiveKey)}</p>
                    </div>
                    <div className="phaseInfoBox">
                      <span>{t('roadmap.deliverable')}</span>
                      <p>{t(deliverableKey)}</p>
                    </div>
                    <div className="phaseInfoBox compact">
                      <span>{t('roadmap.levels')}</span>
                      <div className="levelDots">
                        <b className="base">{levelCounts.Fondamental}</b>
                        <b className="middle">{levelCounts.Moyen}</b>
                        <b className="advanced">{levelCounts.Avancé}</b>
                      </div>
                    </div>
                  </div>

                  <div className="moduleGrid">
                    {modules.map((module) => (
                      <div className="moduleCard" key={module.name}>
                        <header>
                          <strong>{module.name}</strong>
                          <small>{module.done}/{module.topics.length}</small>
                        </header>
                        <div className="moduleProgress"><span style={{ width: `${module.pct}%` }} /></div>
                        <div className="moduleTopics">
                          {module.topics.map((topic) => (
                            <span className={`${topic.isNew ? 'new' : ''} ${done.has(topicKey(topic)) ? 'done' : ''}`} key={`${module.name}-${topic.name}`}>
                              {localizedTopic(topic, lang).name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </article>
          );
        })}
      </div>
    </section>
  );
}

function buildModules(phaseTopics, done, lang) {
  return [...new Set(phaseTopics.map((topic) => topic.cat))].map((cat) => {
    const moduleTopics = phaseTopics.filter((topic) => topic.cat === cat);
    const doneCount = moduleTopics.filter((topic) => done.has(topicKey(topic))).length;
    return {
      name: localizedCategory(cat, lang),
      topics: moduleTopics,
      done: doneCount,
      pct: Math.round((doneCount / moduleTopics.length) * 100),
    };
  });
}

function countLevels(phaseTopics) {
  return phaseTopics.reduce(
    (acc, topic) => {
      acc[topic.level] += 1;
      return acc;
    },
    { Fondamental: 0, Moyen: 0, Avancé: 0 },
  );
}
