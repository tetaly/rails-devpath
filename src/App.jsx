import React, { useEffect, useMemo, useState } from 'react';
import { Navigate, Route, Routes, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar.jsx';
import { topics, topicKey } from './data/curriculum';
import { features } from './data/project';
import { hasSupabaseConfig, supabase } from './lib/supabase';
import { translate } from './lib/i18n';
import { loadProgress, setFeatureProgress, setTopicProgress } from './lib/progressStore';
import Curriculum from './pages/Curriculum.jsx';
import Auth from './pages/Auth.jsx';
import Overview from './pages/Overview.jsx';
import Project from './pages/Project.jsx';
import Roadmap from './pages/Roadmap.jsx';

const allFeatures = features.flatMap((phase) => phase.items);
const LANG_KEY = 'rdp-language';

export default function App() {
  const location = useLocation();
  const [lang, setLang] = useState(localStorage.getItem(LANG_KEY) || 'fr');
  const [session, setSession] = useState(null);
  const [topicDone, setTopicDone] = useState(new Set());
  const [featureDone, setFeatureDone] = useState(new Set());
  const [notice, setNotice] = useState('');
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    localStorage.setItem(LANG_KEY, lang);
  }, [lang]);

  useEffect(() => {
    let mounted = true;
    let authSubscription;

    async function boot() {
      if (supabase) {
        const { data } = await supabase.auth.getSession();
        if (mounted) setSession(data.session);

        const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => {
          setSession(nextSession);
        });
        authSubscription = listener.subscription;
      }

      setIsLoading(false);
    }

    boot();
    return () => {
      mounted = false;
      authSubscription?.unsubscribe();
    };
  }, []);

  useEffect(() => {
    async function syncProgress() {
      try {
        const progress = await loadProgress(session?.user?.id);
        setTopicDone(progress.topicIds);
        setFeatureDone(progress.featureIds);
      } catch (error) {
        setNotice(error.message);
      }
    }

    syncProgress();
  }, [session?.user?.id]);

  const stats = useMemo(() => {
    const validTopicDone = [...topicDone].filter((id) => topics.some((topic) => topicKey(topic) === id));
    const topicPct = Math.round((validTopicDone.length / topics.length) * 100);
    const featurePct = Math.round((featureDone.size / allFeatures.length) * 100);

    return {
      totalTopics: topics.length,
      newTopics: topics.filter((topic) => topic.isNew).length,
      doneTopics: validTopicDone.length,
      topicPct,
      totalFeatures: allFeatures.length,
      doneFeatures: featureDone.size,
      featurePct,
    };
  }, [featureDone, topicDone]);

  async function toggleTopic(topic) {
    try {
      const key = topicKey(topic);
      const next = await setTopicProgress({
        userId: session?.user?.id,
        topicKey: key,
        completed: !topicDone.has(key),
        current: topicDone,
      });
      setTopicDone(next);
    } catch (error) {
      setNotice(error.message);
    }
  }

  async function toggleFeature(featureId) {
    try {
      const next = await setFeatureProgress({
        userId: session?.user?.id,
        featureId,
        completed: !featureDone.has(featureId),
        current: featureDone,
      });
      setFeatureDone(next);
    } catch (error) {
      setNotice(error.message);
    }
  }

  const isAccountRoute = location.pathname === '/account';

  return (
    <>
      <Navbar stats={stats} session={session} lang={lang} setLang={setLang} t={t} />
      <main>
        {!hasSupabaseConfig && !isAccountRoute && <p className="wrap configNote">{t('common.localMode')}</p>}
        {notice && <button className="notice" onClick={() => setNotice('')}>{notice}</button>}
        <Routes>
          <Route path="/" element={<Overview stats={stats} t={t} lang={lang} />} />
          <Route path="/roadmap" element={<Roadmap done={topicDone} t={t} lang={lang} />} />
          <Route path="/curriculum" element={<Curriculum done={topicDone} onToggleTopic={toggleTopic} t={t} lang={lang} />} />
          <Route path="/project" element={<Project done={featureDone} stats={stats} onToggleFeature={toggleFeature} t={t} lang={lang} />} />
          <Route path="/account" element={<Auth session={session} loading={isLoading} stats={stats} t={t} />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
    </>
  );

  function t(path) {
    return translate(lang, path);
  }
}
