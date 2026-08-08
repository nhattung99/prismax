export interface TeleopSession {
  id: string;
  date: string; // YYYY-MM-DD format
  time?: string; // HH:mm format optional
  robotId: string; // e.g. 'piper', 'tok2', 'yam', or custom
  robotName: string; // e.g. 'Piper (Agilex Robotics)'
  durationMinutes: number; // decimal e.g. 45 or 90.5
  qualityScore?: number | null; // 0 - 100 or null if unverified
  pointsEarned: number; // Prisma Points ($PIX)
  note?: string;
  createdAt: string;
  updatedAt: string;
}

export interface RobotConfig {
  id: string;
  name: string;
  manufacturer: string;
  isOfficial: boolean;
  badge?: string; // "Validated"
  color: string; // Chart stroke/fill color
}

export type TimeRangeOption = '7d' | '30d' | 'all' | 'custom';

export interface CustomDateRange {
  startDate: string; // YYYY-MM-DD
  endDate: string;   // YYYY-MM-DD
}

export interface AggregateStats {
  totalSessions: number;
  totalDurationHours: number;
  totalPoints: number;
  avgQualityScore: number | null;
  activeStreak: number;
  longestSessionMinutes: number;
  shortestSessionMinutes: number;
}

export interface RobotPerformance {
  robotId: string;
  robotName: string;
  manufacturer: string;
  isOfficial: boolean;
  totalSessions: number;
  totalHours: number;
  avgQualityScore: number | null;
  avgPointsPerSession: number;
  totalPoints: number;
  percentageOfTotalTime: number;
  isFavorite: boolean;
}

export interface TimeSeriesPoint {
  period: string; // formatted label (e.g. 'Aug 01', 'W31', 'Aug 2026')
  rawDate: string; // for sorting
  avgQualityScore: number | null;
  totalHours: number;
  totalPoints: number;
  cumulativePoints: number;
  sessionCount: number;
}

export type ProgressViewMode = 'daily' | 'weekly' | 'monthly';

export interface ImportPreviewRow {
  date: string;
  robot: string;
  duration_minutes: number;
  quality_score?: number | null;
  points: number;
  note?: string;
  isValid: boolean;
  errorMessage?: string;
}

export interface StorageDataV1 {
  version: number; // 1
  sessions: TeleopSession[];
  customRobots: RobotConfig[];
  lastUpdated: string;
}
