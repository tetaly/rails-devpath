import { supabase } from './supabase';

const TOPIC_KEY = 'rdp-done-v3';
const FEATURE_KEY = 'rdp-features-v3';

function readLocal(key) {
  return JSON.parse(localStorage.getItem(key) || '[]');
}

function writeLocal(key, values) {
  localStorage.setItem(key, JSON.stringify([...values]));
}

export async function loadProgress(userId) {
  if (!supabase || !userId) {
    return {
      topicIds: new Set(readLocal(TOPIC_KEY)),
      featureIds: new Set(readLocal(FEATURE_KEY)),
    };
  }

  const [{ data: topicRows, error: topicError }, { data: featureRows, error: featureError }] = await Promise.all([
    supabase.from('topic_progress').select('topic_key').eq('user_id', userId),
    supabase.from('feature_progress').select('feature_id').eq('user_id', userId),
  ]);

  if (topicError || featureError) {
    throw topicError || featureError;
  }

  return {
    topicIds: new Set(topicRows.map((row) => row.topic_key)),
    featureIds: new Set(featureRows.map((row) => row.feature_id)),
  };
}

export async function setTopicProgress({ userId, topicKey, completed, current }) {
  const next = new Set(current);
  completed ? next.add(topicKey) : next.delete(topicKey);

  if (!supabase || !userId) {
    writeLocal(TOPIC_KEY, next);
    return next;
  }

  if (completed) {
    const { error } = await supabase
      .from('topic_progress')
      .upsert(
        {
          user_id: userId,
          topic_key: topicKey,
          completed_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,topic_key' },
      );
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('topic_progress')
      .delete()
      .eq('user_id', userId)
      .eq('topic_key', topicKey);
    if (error) throw error;
  }

  return next;
}

export async function setFeatureProgress({ userId, featureId, completed, current }) {
  const next = new Set(current);
  completed ? next.add(featureId) : next.delete(featureId);

  if (!supabase || !userId) {
    writeLocal(FEATURE_KEY, next);
    return next;
  }

  if (completed) {
    const { error } = await supabase
      .from('feature_progress')
      .upsert(
        {
          user_id: userId,
          feature_id: featureId,
          completed_at: new Date().toISOString(),
        },
        { onConflict: 'user_id,feature_id' },
      );
    if (error) throw error;
  } else {
    const { error } = await supabase
      .from('feature_progress')
      .delete()
      .eq('user_id', userId)
      .eq('feature_id', featureId);
    if (error) throw error;
  }

  return next;
}

export function clearLocalProgress() {
  localStorage.removeItem(TOPIC_KEY);
  localStorage.removeItem(FEATURE_KEY);
}
