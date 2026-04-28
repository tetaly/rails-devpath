import './Navbar.css';
import React from 'react';
import { NavLink } from 'react-router-dom';

const tabs = [
  ['/', 'nav.overview'],
  ['/roadmap', 'nav.roadmap'],
  ['/curriculum', 'nav.curriculum'],
  ['/project', 'nav.project'],
];

export default function Navbar({ stats, session, lang, setLang, t }) {
  return (
    <nav className="nav">
      <div className="navInner">
        <NavLink className="logo" to="/">
          rails<span>.</span>devpath
        </NavLink>
        <div className="navTabs">
          {tabs.map(([path, labelKey]) => (
            <NavLink
              className={({ isActive }) => `navTab ${isActive ? 'active' : ''} ${path === '/project' ? 'projectTab' : ''}`}
              key={path}
              to={path}
              end={path === '/'}
            >
              {t(labelKey)}
            </NavLink>
          ))}
        </div>
        <div className="navProgress">
          <span>{stats.doneTopics} {t('nav.completed')}</span>
          <strong>{stats.topicPct}%</strong>
          <div className="languageSwitch" aria-label="Language">
            <button className={lang === 'fr' ? 'active' : ''} type="button" onClick={() => setLang('fr')}>FR</button>
            <button className={lang === 'en' ? 'active' : ''} type="button" onClick={() => setLang('en')}>EN</button>
          </div>
          <NavLink
            className={({ isActive }) => `accountButton ${isActive ? 'active' : ''}`}
            to="/account"
          >
            {session ? t('nav.account') : t('nav.login')}
          </NavLink>
        </div>
      </div>
    </nav>
  );
}
