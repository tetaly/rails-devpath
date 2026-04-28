import ProgressBar from '../components/ProgressBar.jsx';
import { localizedCommands, localizedFeatures, localizedStories, projectFeatureBlueprint, projectReferences, projectStack } from '../data/project';
import './Project.css';
import React, { useState } from 'react';

export default function Project({ done, stats, onToggleFeature, t, lang }) {
  const commands = localizedCommands(lang);
  const features = localizedFeatures(lang);
  const stories = localizedStories(lang);
  const [selectedFeature, setSelectedFeature] = useState(null);

  return (
    <section className="wrap project">
      <div className="projectHero">
        <div>
          <p className="projectTag"><span />{t('project.tag')}</p>
          <h1>Medi<span>Track</span></h1>
          <p className="projectDesc">
            {t('project.desc')}
          </p>
          <div className="stack">
            {projectStack.map((item) => <span key={item}>{item}</span>)}
          </div>
          <div className="projectProgress">
            <div>
              <strong>{t('project.completedFeatures')}</strong>
              <span>{stats.featurePct}%</span>
            </div>
            <ProgressBar value={stats.featurePct} tone="orange" />
            <small>{stats.doneFeatures} / {stats.totalFeatures} {t('common.features')}</small>
          </div>
        </div>

        <SchemaCard />
      </div>

      <div className="projectBrief">
        <div className="sectionLabel">{t('project.overviewLabel')}</div>
        <h2>{t('project.overviewTitle')}</h2>
        <div className="briefGrid">
          <BriefCard title={t('project.users')} text={t('project.usersText')} />
          <BriefCard title={t('project.coreFlow')} text={t('project.coreFlowText')} />
          <BriefCard title={t('project.scope')} text={t('project.scopeText')} />
        </div>
      </div>

      <div className="projectWorkGrid">
        <div className="commandPanel">
          <h2>{t('project.startTitle')}</h2>
          <p>{t('project.commandsHint')}</p>
          {commands.map(([label, command]) => (
            <button className="commandLine" key={label} type="button" onClick={() => navigator.clipboard?.writeText(command)}>
              <small># {label}</small>
              <span>{command}</span>
            </button>
          ))}
        </div>

        <div className="storyPanel">
          <div className="sectionLabel">{t('project.storiesLabel')}</div>
          <h2>{t('project.storiesTitle')}</h2>
          {stories.map((story) => (
            <article className="storyItem" key={story.id}>
              <strong>{story.role}</strong>
              <p>{story.text}</p>
            </article>
          ))}
          <div className="projectRefs">
            <strong>{t('project.references')}</strong>
            <div>
              {projectReferences.map(([label, url]) => <a href={url} target="_blank" rel="noreferrer" key={url}>{label}</a>)}
            </div>
          </div>
        </div>
      </div>

      <div className="sectionHead compact">
        <p className="sectionLabel">{t('project.featuresLabel')}</p>
        <h2>{t('project.featuresTitle')}</h2>
        <p>{t('project.featuresDesc')}</p>
      </div>

      <div className="featurePhases">
        {features.map((phase) => (
          <article className="featurePhase" key={phase.phase}>
            <header>
              <span>0{phase.phase}</span>
              <h3>{phase.phaseName}</h3>
              <small>{phase.items.filter((item) => done.has(item.id)).length}/{phase.items.length} {t('common.features')}</small>
            </header>
            <div>
              {phase.items.map((feature) => (
                <article
                  className={`featureItem ${done.has(feature.id) ? 'done' : ''}`}
                  key={feature.id}
                >
                  <button className="featureCheck" type="button" onClick={() => onToggleFeature(feature.id)}>
                    {done.has(feature.id) ? '✓' : ''}
                  </button>
                  <div className="featureContent">
                    <strong>{feature.name}</strong>
                    <p>{feature.desc}</p>
                    <div className="featureMeta">{feature.topics.map((topic) => <small key={topic}>{topic}</small>)}</div>
                    <div className="featureDetails">
                      <FeatureList title={t('project.implementation')} items={feature.steps || []} />
                      <FeatureList title={t('project.acceptance')} items={feature.acceptance || []} />
                    </div>
                    <button className="featureMore" type="button" onClick={() => setSelectedFeature(feature)}>
                      {t('project.details')}
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </article>
        ))}
      </div>

      {selectedFeature && (
        <ProjectFeaturePopup feature={selectedFeature} lang={lang} t={t} onClose={() => setSelectedFeature(null)} />
      )}
    </section>
  );
}

function BriefCard({ title, text }) {
  return (
    <article className="briefCard">
      <strong>{title}</strong>
      <p>{text}</p>
    </article>
  );
}

function FeatureList({ title, items }) {
  if (!items.length) return null;
  return (
    <div>
      <b>{title}</b>
      <ul>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </div>
  );
}

function ProjectFeaturePopup({ feature, lang, t, onClose }) {
  const blueprint = projectFeatureBlueprint(feature, lang);

  return (
    <div className="projectPopupBackdrop" role="presentation" onClick={onClose}>
      <div className="projectPopup" role="dialog" aria-modal="true" aria-label={feature.name} onClick={(event) => event.stopPropagation()}>
        <header className="projectPopupHeader">
          <div>
            <span>{t('project.featuresLabel')}</span>
            <h3>{feature.name}</h3>
            <p>{feature.desc}</p>
          </div>
          <button type="button" onClick={onClose}>{t('curriculum.close')}</button>
        </header>

        <div className="projectPopupGrid">
          <PopupBlock title={t('project.implementation')} items={feature.steps || []} />
          <PopupBlock title={t('project.acceptance')} items={feature.acceptance || []} />
          <PopupBlock title={t('project.screens')} items={blueprint.screens} />
          <PopupBlock title={t('project.template')} items={blueprint.files} code />
        </div>

        <div className="popupTopics">
          {feature.topics.map((topic) => <span key={topic}>{topic}</span>)}
        </div>
      </div>
    </div>
  );
}

function PopupBlock({ title, items, code = false }) {
  return (
    <section className="popupBlock">
      <h4>{title}</h4>
      <ul className={code ? 'codeList' : ''}>
        {items.map((item) => <li key={item}>{item}</li>)}
      </ul>
    </section>
  );
}

function SchemaCard() {
  const models = [
    ['User', ['email :string', 'role :enum patient | doctor | admin', 'first_name, last_name :string']],
    ['DoctorProfile', ['user_id :fk → User', 'specialty :string', 'bio :text', 'avatar :attachment']],
    ['Appointment', ['doctor_id :fk → User', 'patient_id :fk → User', 'scheduled_at :datetime', 'status :enum']],
    ['Availability', ['doctor_id :fk → User', 'day_of_week :integer', 'starts_at, ends_at :time']],
    ['Notification', ['user_id :fk → User', 'appointment_id :fk', 'read_at :datetime']],
  ];

  return (
    <div className="schemaCard">
      {models.map(([model, fields]) => (
        <div key={model}>
          <strong>{model}</strong>
          {fields.map((field) => <span key={field}>{field}</span>)}
        </div>
      ))}
    </div>
  );
}
