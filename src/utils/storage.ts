import type { RobotConfig, StorageDataV1, TeleopSession } from '../types/session';
import { INITIAL_SEED_SESSIONS, OFFICIAL_ROBOTS } from '../constants/robots';

const STORAGE_KEY = 'prismax_teleop_dashboard_v1';
const CURRENT_VERSION = 1;

export function getInitialStorageData(): StorageDataV1 {
  return {
    version: CURRENT_VERSION,
    sessions: INITIAL_SEED_SESSIONS,
    customRobots: [],
    lastUpdated: new Date().toISOString()
  };
}

export function loadStorageData(): StorageDataV1 {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const initial = getInitialStorageData();
      saveStorageData(initial);
      return initial;
    }

    const parsed: StorageDataV1 = JSON.parse(raw);
    
    // Schema version check & migration fallback
    if (!parsed || typeof parsed.version !== 'number' || parsed.version < CURRENT_VERSION) {
      console.warn('Storage schema version mismatch, upgrading/migrating...');
      const migrated: StorageDataV1 = {
        version: CURRENT_VERSION,
        sessions: Array.isArray(parsed?.sessions) ? parsed.sessions : INITIAL_SEED_SESSIONS,
        customRobots: Array.isArray(parsed?.customRobots) ? parsed.customRobots : [],
        lastUpdated: new Date().toISOString()
      };
      saveStorageData(migrated);
      return migrated;
    }

    return parsed;
  } catch (err) {
    console.error('Failed to parse localStorage data, restoring initial seed:', err);
    const initial = getInitialStorageData();
    saveStorageData(initial);
    return initial;
  }
}

export function saveStorageData(data: StorageDataV1): boolean {
  try {
    data.lastUpdated = new Date().toISOString();
    localStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    return true;
  } catch (err) {
    console.error('Failed to save to localStorage:', err);
    return false;
  }
}

export function saveSession(
  data: StorageDataV1, 
  newSession: Omit<TeleopSession, 'id' | 'createdAt' | 'updatedAt'>
): StorageDataV1 {
  const id = 'sess_' + Date.now() + '_' + Math.random().toString(36).substring(2, 7);
  const now = new Date().toISOString();

  const sessionRecord: TeleopSession = {
    ...newSession,
    id,
    createdAt: now,
    updatedAt: now
  };

  const updatedData: StorageDataV1 = {
    ...data,
    sessions: [sessionRecord, ...data.sessions]
  };

  saveStorageData(updatedData);
  return updatedData;
}

export function updateSession(
  data: StorageDataV1,
  id: string,
  updates: Partial<Omit<TeleopSession, 'id' | 'createdAt'>>
): StorageDataV1 {
  const updatedSessions = data.sessions.map((sess) => {
    if (sess.id === id) {
      return {
        ...sess,
        ...updates,
        updatedAt: new Date().toISOString()
      };
    }
    return sess;
  });

  const updatedData: StorageDataV1 = {
    ...data,
    sessions: updatedSessions
  };

  saveStorageData(updatedData);
  return updatedData;
}

export function deleteSession(data: StorageDataV1, id: string): StorageDataV1 {
  const updatedSessions = data.sessions.filter((sess) => sess.id !== id);
  const updatedData: StorageDataV1 = {
    ...data,
    sessions: updatedSessions
  };

  saveStorageData(updatedData);
  return updatedData;
}

export function resetToSeedData(): StorageDataV1 {
  const initial = getInitialStorageData();
  saveStorageData(initial);
  return initial;
}

export function clearAllSessions(data: StorageDataV1): StorageDataV1 {
  const emptyData: StorageDataV1 = {
    ...data,
    sessions: []
  };
  saveStorageData(emptyData);
  return emptyData;
}

export function addCustomRobot(data: StorageDataV1, newRobot: RobotConfig): StorageDataV1 {
  // Check if robot already exists (by name or id)
  const exists = [...OFFICIAL_ROBOTS, ...data.customRobots].some(
    r => r.id.toLowerCase() === newRobot.id.toLowerCase() || r.name.toLowerCase() === newRobot.name.toLowerCase()
  );

  if (exists) return data;

  const updatedData: StorageDataV1 = {
    ...data,
    customRobots: [...data.customRobots, newRobot]
  };

  saveStorageData(updatedData);
  return updatedData;
}
