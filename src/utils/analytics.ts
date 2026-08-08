import type { AggregateStats, CustomDateRange, ProgressViewMode, RobotConfig, RobotPerformance, TeleopSession, TimeRangeOption, TimeSeriesPoint } from '../types/session';
import { OFFICIAL_ROBOTS } from '../constants/robots';

/**
 * Filter sessions by specified time range option
 */
export function filterSessionsByTimeRange(
  sessions: TeleopSession[],
  option: TimeRangeOption,
  customRange?: CustomDateRange
): TeleopSession[] {
  if (!sessions || sessions.length === 0) return [];
  if (option === 'all') return sessions;

  // Find reference date (most recent session date or today, whichever is later)
  const now = new Date();
  let refDateMs = now.getTime();

  if (option === '7d') {
    const cutoff = new Date(refDateMs - 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    return sessions.filter(s => s.date >= cutoff);
  }

  if (option === '30d') {
    const cutoff = new Date(refDateMs - 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0];
    return sessions.filter(s => s.date >= cutoff);
  }

  if (option === 'custom' && customRange?.startDate && customRange?.endDate) {
    return sessions.filter(s => s.date >= customRange.startDate && s.date <= customRange.endDate);
  }

  return sessions;
}

/**
 * Calculates active daily teleop streak
 */
export function calculateActiveStreak(sessions: TeleopSession[]): number {
  if (!sessions || sessions.length === 0) return 0;

  // Extract unique active dates sorted descending
  const uniqueDates = Array.from(new Set(sessions.map(s => s.date))).sort((a, b) => b.localeCompare(a));
  if (uniqueDates.length === 0) return 0;

  const today = new Date().toISOString().split('T')[0];
  const yesterdayDate = new Date(Date.now() - 86400000).toISOString().split('T')[0];

  // If latest session is older than yesterday, streak is broken
  const latestDate = uniqueDates[0];
  if (latestDate !== today && latestDate !== yesterdayDate) {
    return 0;
  }

  let streak = 0;
  let curr = new Date(latestDate);

  for (let i = 0; i < uniqueDates.length; i++) {
    const targetDate = uniqueDates[i];
    const currStr = curr.toISOString().split('T')[0];

    if (targetDate === currStr) {
      streak++;
      // Move to previous day
      curr.setDate(curr.getDate() - 1);
    } else {
      break;
    }
  }

  return streak;
}

/**
 * Calculates overall aggregate stats
 */
export function calculateAggregateStats(sessions: TeleopSession[]): AggregateStats {
  if (!sessions || sessions.length === 0) {
    return {
      totalSessions: 0,
      totalDurationHours: 0,
      totalPoints: 0,
      avgQualityScore: null,
      activeStreak: 0,
      longestSessionMinutes: 0,
      shortestSessionMinutes: 0
    };
  }

  const totalSessions = sessions.length;
  const totalMinutes = sessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
  const totalPoints = sessions.reduce((sum, s) => sum + (s.pointsEarned || 0), 0);

  const ratedSessions = sessions.filter(s => typeof s.qualityScore === 'number' && !isNaN(s.qualityScore));
  const avgQualityScore = ratedSessions.length > 0
    ? Number((ratedSessions.reduce((sum, s) => sum + (s.qualityScore as number), 0) / ratedSessions.length).toFixed(1))
    : null;

  const durations = sessions.map(s => s.durationMinutes || 0);
  const longestSessionMinutes = Math.max(...durations);
  const shortestSessionMinutes = Math.min(...durations);

  const activeStreak = calculateActiveStreak(sessions);

  return {
    totalSessions,
    totalDurationHours: Number((totalMinutes / 60).toFixed(1)),
    totalPoints,
    avgQualityScore,
    activeStreak,
    longestSessionMinutes,
    shortestSessionMinutes
  };
}

/**
 * Computes performance broken down per robot
 */
export function calculatePerformanceByRobot(
  sessions: TeleopSession[],
  customRobots: RobotConfig[] = []
): RobotPerformance[] {
  const allKnownRobots = [...OFFICIAL_ROBOTS, ...customRobots];
  const robotMap = new Map<string, {
    robotId: string;
    robotName: string;
    manufacturer: string;
    isOfficial: boolean;
    sessions: TeleopSession[];
  }>();

  // Initialize known official/custom robots
  allKnownRobots.forEach(r => {
    robotMap.set(r.id.toLowerCase(), {
      robotId: r.id,
      robotName: r.name,
      manufacturer: r.manufacturer,
      isOfficial: r.isOfficial,
      sessions: []
    });
  });

  // Assign sessions
  sessions.forEach(s => {
    const key = (s.robotId || s.robotName).toLowerCase();
    if (!robotMap.has(key)) {
      robotMap.set(key, {
        robotId: s.robotId || key,
        robotName: s.robotName || s.robotId,
        manufacturer: 'Custom / Other',
        isOfficial: false,
        sessions: []
      });
    }
    robotMap.get(key)!.sessions.push(s);
  });

  const totalAllMinutes = sessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);

  const performances: RobotPerformance[] = [];

  robotMap.forEach((entry) => {
    const rSessions = entry.sessions;
    if (rSessions.length === 0) return; // Only include robots with at least 1 session logged

    const rMinutes = rSessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
    const rHours = Number((rMinutes / 60).toFixed(1));
    const rPoints = rSessions.reduce((sum, s) => sum + (s.pointsEarned || 0), 0);

    const rated = rSessions.filter(s => typeof s.qualityScore === 'number' && !isNaN(s.qualityScore));
    const avgQuality = rated.length > 0
      ? Number((rated.reduce((sum, s) => sum + (s.qualityScore as number), 0) / rated.length).toFixed(1))
      : null;

    const avgPoints = rSessions.length > 0
      ? Math.round(rPoints / rSessions.length)
      : 0;

    const pct = totalAllMinutes > 0 ? Number(((rMinutes / totalAllMinutes) * 100).toFixed(1)) : 0;

    performances.push({
      robotId: entry.robotId,
      robotName: entry.robotName,
      manufacturer: entry.manufacturer,
      isOfficial: entry.isOfficial,
      totalSessions: rSessions.length,
      totalHours: rHours,
      avgQualityScore: avgQuality,
      avgPointsPerSession: avgPoints,
      totalPoints: rPoints,
      percentageOfTotalTime: pct,
      isFavorite: false
    });
  });

  // Identify favorite robot (highest total hours)
  if (performances.length > 0) {
    let maxHours = -1;
    let favIndex = -1;
    performances.forEach((p, idx) => {
      if (p.totalHours > maxHours) {
        maxHours = p.totalHours;
        favIndex = idx;
      }
    });
    if (favIndex !== -1) {
      performances[favIndex].isFavorite = true;
    }
  }

  return performances.sort((a, b) => b.totalHours - a.totalHours);
}

/**
 * Computes time-series points for progress charts (Daily, Weekly, Monthly)
 */
export function calculateTimeSeriesData(
  sessions: TeleopSession[],
  mode: ProgressViewMode = 'daily'
): TimeSeriesPoint[] {
  if (!sessions || sessions.length === 0) return [];

  // Sort sessions chronologically (oldest to newest)
  const sorted = [...sessions].sort((a, b) => a.date.localeCompare(b.date));

  const groups = new Map<string, TeleopSession[]>();

  sorted.forEach(s => {
    let key = s.date; // daily default YYYY-MM-DD

    if (mode === 'weekly') {
      key = getWeekKey(s.date);
    } else if (mode === 'monthly') {
      key = s.date.substring(0, 7); // YYYY-MM
    }

    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(s);
  });

  let runningPoints = 0;
  const timePoints: TimeSeriesPoint[] = [];

  groups.forEach((groupSessions, rawKey) => {
    const totalMins = groupSessions.reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
    const periodHours = Number((totalMins / 60).toFixed(1));
    const periodPoints = groupSessions.reduce((sum, s) => sum + (s.pointsEarned || 0), 0);
    runningPoints += periodPoints;

    const rated = groupSessions.filter(s => typeof s.qualityScore === 'number' && !isNaN(s.qualityScore));
    const avgQuality = rated.length > 0
      ? Number((rated.reduce((sum, s) => sum + (s.qualityScore as number), 0) / rated.length).toFixed(1))
      : null;

    timePoints.push({
      period: formatPeriodLabel(rawKey, mode),
      rawDate: rawKey,
      avgQualityScore: avgQuality,
      totalHours: periodHours,
      totalPoints: periodPoints,
      cumulativePoints: runningPoints,
      sessionCount: groupSessions.length
    });
  });

  return timePoints;
}

function getWeekKey(dateStr: string): string {
  const d = new Date(dateStr);
  const startOfYear = new Date(d.getFullYear(), 0, 1);
  const pastDaysOfYear = (d.getTime() - startOfYear.getTime()) / 86400000;
  const weekNum = Math.ceil((pastDaysOfYear + startOfYear.getDay() + 1) / 7);
  return `${d.getFullYear()}-W${String(weekNum).padStart(2, '0')}`;
}

function formatPeriodLabel(rawKey: string, mode: ProgressViewMode): string {
  if (mode === 'daily') {
    const parts = rawKey.split('-');
    if (parts.length === 3) {
      const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, parseInt(parts[2]));
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
    return rawKey;
  }
  if (mode === 'weekly') {
    return rawKey.replace('-W', ' W');
  }
  if (mode === 'monthly') {
    const parts = rawKey.split('-');
    if (parts.length === 2) {
      const date = new Date(parseInt(parts[0]), parseInt(parts[1]) - 1, 1);
      return date.toLocaleDateString('en-US', { month: 'short', year: '2-digit' });
    }
    return rawKey;
  }
  return rawKey;
}
