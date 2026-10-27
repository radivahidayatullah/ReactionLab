/**
 * Storage utility with safe try/catch error handling and fallback defaults
 * Follows AGENT.md specification for ReactionLab 11
 */

const STORAGE_KEYS = {
  PROGRESS: 'reactionlab11_progress_v1',
  QUIZ_HISTORY: 'reactionlab11_quiz_history_v1',
  LAB_STATE: 'reactionlab11_lab_state_v1',
  USER_SETTINGS: 'reactionlab11_user_settings_v1'
};

export function getStoredData(key, fallbackValue = null) {
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return fallbackValue;
    return JSON.parse(raw);
  } catch (err) {
    console.warn(`[ReactionLab Storage] Failed to read key "${key}":`, err);
    return fallbackValue;
  }
}

export function setStoredData(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
    return true;
  } catch (err) {
    console.warn(`[ReactionLab Storage] Failed to write key "${key}":`, err);
    return false;
  }
}

export function clearStoredData(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    console.warn(`[ReactionLab Storage] Failed to clear key "${key}":`, err);
  }
}

export { STORAGE_KEYS };
