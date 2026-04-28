import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import ProgressBar from '../components/ProgressBar.jsx';
import { hasSupabaseConfig, supabase } from '../lib/supabase';
import './Auth.css';

export default function Auth({ session, loading, stats, t }) {
  const navigate = useNavigate();
  const [mode, setMode] = useState('login');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  async function handleAuthSubmit(event) {
    event.preventDefault();
    setMessage('');
    setError('');

    if (!supabase) {
      setError(t('auth.noSupabase'));
      return;
    }

    setIsSubmitting(true);

    if (mode === 'register') {
      const { data, error: signUpError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: { name },
        },
      });

      if (signUpError) {
        setError(formatAuthError(signUpError.message, t));
      } else {
        await upsertProfile(data.user?.id, name, email);
        setMessage(data.session ? t('auth.created') : t('auth.createdNeedsConfirm'));
      }
    } else {
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (signInError) {
        setError(formatAuthError(signInError.message, t));
      }
    }

    setIsSubmitting(false);
  }

  async function handleForgotPassword() {
    setMessage('');
    setError('');

    if (!supabase) {
      setError(t('auth.noSupabase'));
      return;
    }

    if (!email) {
      setError(t('auth.enterEmail'));
      return;
    }

    setIsResetting(true);
    const { error: resetError } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: window.location.origin,
    });
    setIsResetting(false);

    if (resetError) {
      setError(formatAuthError(resetError.message, t));
      return;
    }

    setMessage(t('auth.resetSent'));
  }

  async function handleSignOut() {
    if (!supabase) return;
    await supabase.auth.signOut();
    navigate('/');
  }

  return (
    <section className="authPage">
      <div className="wrap authLayout">
        <div className="authIntro">
          <p className="sectionLabel">{t('auth.accountLabel')}</p>
          <h1>{t('auth.title')}</h1>
          <p>
            {t('auth.desc')}
          </p>

          <div className="authMetrics">
            <div>
              <strong>{stats.topicPct}%</strong>
              <span>{t('auth.curriculum')}</span>
            </div>
            <div>
              <strong>{stats.featurePct}%</strong>
              <span>{t('auth.project')}</span>
            </div>
          </div>
        </div>

        <div className="authCard">
          <span className="authCardGlow" />
          {loading ? (
            <div className="authState">
              <p className="authKicker">{t('auth.session')}</p>
              <h2>{t('common.loading')}</h2>
            </div>
          ) : session ? (
            <ConnectedState session={session} stats={stats} onSignOut={handleSignOut} t={t} />
          ) : (
            <SignedOutState
              mode={mode}
              setMode={setMode}
              name={name}
              setName={setName}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
              message={message}
              error={error}
              isSubmitting={isSubmitting}
              isResetting={isResetting}
              onSubmit={handleAuthSubmit}
              onForgotPassword={handleForgotPassword}
              t={t}
            />
          )}
        </div>
      </div>
    </section>
  );
}

function SignedOutState({
  mode,
  setMode,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  message,
  error,
  isSubmitting,
  isResetting,
  onSubmit,
  onForgotPassword,
  t,
}) {
  const isRegister = mode === 'register';

  return (
    <>
      <div className="authState">
        <p className="authKicker">{t('auth.authKicker')}</p>
        <h2>{isRegister ? t('auth.registerTitle') : t('auth.loginTitle')}</h2>
        <p>{isRegister ? t('auth.registerDesc') : t('auth.loginDesc')}</p>
      </div>

      {!hasSupabaseConfig && (
        <div className="authWarning">
          <strong>{t('auth.localStrong')}</strong>
          <span>{t('auth.localText')}</span>
        </div>
      )}

      <div className="authSwitch">
        <button className={!isRegister ? 'active' : ''} type="button" onClick={() => setMode('login')}>login</button>
        <button className={isRegister ? 'active' : ''} type="button" onClick={() => setMode('register')}>register</button>
      </div>

      <form className="authForm" onSubmit={onSubmit}>
        {isRegister && (
          <label>
            <span>{t('auth.name')}</span>
            <input
              type="text"
              placeholder="Ahmed Bachir"
              value={name}
              onChange={(event) => setName(event.target.value)}
              required
            />
          </label>
        )}

        <label>
            <span>{t('auth.email')}</span>
          <input
            type="email"
            placeholder="toi@example.com"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            required
          />
        </label>

        <label>
            <span>{t('auth.password')}</span>
          <input
            type="password"
            placeholder={t('auth.passwordPlaceholder')}
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            minLength={6}
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting || !hasSupabaseConfig}>
          {isSubmitting ? t('auth.submitLoading') : isRegister ? t('auth.createAccount') : t('auth.signIn')}
        </button>
      </form>

      {!isRegister && (
        <button className="forgotButton" type="button" onClick={onForgotPassword} disabled={isResetting || !hasSupabaseConfig}>
          {isResetting ? t('auth.resetLoading') : t('auth.forgotPassword')}
        </button>
      )}

      <p className="authHint">
        {t('auth.devHint')}
      </p>

      {(message || error) && <p className={`authFeedback ${error ? 'error' : ''}`}>{error || message}</p>}

      <div className="authSteps">
        <span>{t('auth.stepAccount')}</span>
        <span>{t('auth.stepSession')}</span>
        <span>{t('auth.stepSync')}</span>
      </div>
    </>
  );
}

async function upsertProfile(userId, name, email) {
  if (!userId) return;

  await supabase.from('profiles').upsert(
    {
      id: userId,
      name,
      email,
      updated_at: new Date().toISOString(),
    },
    { onConflict: 'id' },
  );
}

function formatAuthError(errorMessage, t = null) {
  const normalized = errorMessage.toLowerCase();

  if (normalized.includes('rate limit')) {
    return t ? t('auth.errors.rateLimit') : 'Supabase is temporarily blocking emails.';
  }

  if (normalized.includes('invalid')) {
    return t ? t('auth.errors.invalid') : 'Invalid email or password.';
  }

  if (normalized.includes('already registered')) {
    return t ? t('auth.errors.registered') : 'This email already has an account.';
  }

  if (normalized.includes('password')) {
    return t ? t('auth.errors.password') : 'The password must follow Supabase rules.';
  }

  return errorMessage;
}

function ConnectedState({ session, stats, onSignOut, t }) {
  const initialName = session.user.user_metadata?.name || '';
  const [profileName, setProfileName] = useState(initialName);
  const [newPassword, setNewPassword] = useState('');
  const [profileMessage, setProfileMessage] = useState('');
  const [profileError, setProfileError] = useState('');
  const [isSavingName, setIsSavingName] = useState(false);
  const [isSavingPassword, setIsSavingPassword] = useState(false);

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      const { data, error } = await supabase
        .from('profiles')
        .select('name')
        .eq('id', session.user.id)
        .maybeSingle();

      if (!mounted) return;
      if (!error && data?.name) setProfileName(data.name);
    }

    loadProfile();
    return () => {
      mounted = false;
    };
  }, [session.user.id]);

  async function handleNameUpdate(event) {
    event.preventDefault();
    setProfileMessage('');
    setProfileError('');
    setIsSavingName(true);

    const { error: metadataError } = await supabase.auth.updateUser({
      data: { name: profileName },
    });

    if (metadataError) {
        setProfileError(formatAuthError(metadataError.message, t));
      setIsSavingName(false);
      return;
    }

    const { error: profileSaveError } = await supabase.from('profiles').upsert(
      {
        id: session.user.id,
        name: profileName,
        email: session.user.email,
        updated_at: new Date().toISOString(),
      },
      { onConflict: 'id' },
    );

    setIsSavingName(false);
    if (profileSaveError) {
      setProfileError(formatAuthError(profileSaveError.message, t));
      return;
    }

    setProfileMessage(t('auth.nameUpdated'));
  }

  async function handlePasswordUpdate(event) {
    event.preventDefault();
    setProfileMessage('');
    setProfileError('');
    setIsSavingPassword(true);

    const { error: passwordError } = await supabase.auth.updateUser({
      password: newPassword,
    });

    setIsSavingPassword(false);
    if (passwordError) {
      setProfileError(formatAuthError(passwordError.message, t));
      return;
    }

    setNewPassword('');
    setProfileMessage(t('auth.passwordUpdated'));
  }

  return (
    <>
      <div className="authState">
        <p className="authKicker">{t('auth.connected')}</p>
        <h2>{profileName || session.user.email}</h2>
        <p>{t('auth.connectedDesc')}</p>
      </div>

      <div className="profileSummary">
        <span>{session.user.email}</span>
      </div>

      <div className="accountProgress">
        <div>
          <span>{t('auth.curriculum')}</span>
          <strong>{stats.doneTopics}/{stats.totalTopics}</strong>
        </div>
        <ProgressBar value={stats.topicPct} />
        <div>
          <span>MediTrack</span>
          <strong>{stats.doneFeatures}/{stats.totalFeatures}</strong>
        </div>
        <ProgressBar value={stats.featurePct} tone="orange" />
      </div>

      <div className="profileForms">
        <form className="authForm" onSubmit={handleNameUpdate}>
          <label>
              <span>{t('auth.displayName')}</span>
            <input
              type="text"
              value={profileName}
              onChange={(event) => setProfileName(event.target.value)}
              placeholder="Ton nom"
              required
            />
          </label>
          <button type="submit" disabled={isSavingName}>
            {isSavingName ? t('auth.saveNameLoading') : t('auth.changeName')}
          </button>
        </form>

        <form className="authForm" onSubmit={handlePasswordUpdate}>
          <label>
              <span>{t('auth.newPassword')}</span>
            <input
              type="password"
              value={newPassword}
              onChange={(event) => setNewPassword(event.target.value)}
              placeholder={t('auth.newPassword')}
              minLength={6}
              required
            />
          </label>
          <button type="submit" disabled={isSavingPassword}>
            {isSavingPassword ? t('auth.updatePasswordLoading') : t('auth.changePassword')}
          </button>
        </form>
      </div>

      {(profileMessage || profileError) && (
        <p className={`authFeedback ${profileError ? 'error' : ''}`}>{profileError || profileMessage}</p>
      )}

      <div className="authActions">
        <Link to="/curriculum">{t('auth.curriculum')}</Link>
        <Link to="/project">{t('auth.project')}</Link>
        <button type="button" className="danger" onClick={onSignOut}>{t('auth.logout')}</button>
      </div>
    </>
  );
}
