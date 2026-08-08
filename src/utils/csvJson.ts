import Papa from 'papaparse';
import type { ImportPreviewRow, TeleopSession } from '../types/session';

/**
 * Standard headers for CSV export/import
 */
export const CSV_HEADERS = [
  'date',
  'robot',
  'duration_minutes',
  'quality_score',
  'points',
  'note'
];

/**
 * Parses raw CSV string or File into validated preview rows
 */
export function parseCSVContent(csvText: string): ImportPreviewRow[] {
  const result = Papa.parse<Record<string, string>>(csvText, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase()
  });

  if (result.errors.length > 0 && (!result.data || result.data.length === 0)) {
    throw new Error('Malformed CSV file structure: ' + result.errors[0].message);
  }

  return result.data.map((row) => validateAndNormalizeRow(row));
}

/**
 * Parses raw JSON string into validated preview rows
 */
export function parseJSONContent(jsonText: string): ImportPreviewRow[] {
  let parsed: unknown;
  try {
    parsed = JSON.parse(jsonText);
  } catch {
    throw new Error('Invalid JSON syntax in file.');
  }

  let items: unknown[] = [];
  if (Array.isArray(parsed)) {
    items = parsed;
  } else if (parsed && typeof parsed === 'object' && 'sessions' in parsed && Array.isArray((parsed as { sessions: unknown[] }).sessions)) {
    items = (parsed as { sessions: unknown[] }).sessions;
  } else {
    throw new Error('JSON structure must be an array of sessions or an object containing a "sessions" array.');
  }

  return items.map((item) => {
    if (typeof item !== 'object' || item === null) {
      return {
        date: '',
        robot: 'Unknown',
        duration_minutes: 0,
        points: 0,
        isValid: false,
        errorMessage: 'Invalid row format'
      };
    }
    const record = item as Record<string, unknown>;
    return validateAndNormalizeRow({
      date: String(record.date || record.Date || ''),
      robot: String(record.robot || record.robotName || record.robot_name || ''),
      duration_minutes: String(record.durationMinutes || record.duration_minutes || record.duration || ''),
      quality_score: record.qualityScore !== undefined ? String(record.qualityScore) : String(record.quality_score || ''),
      points: String(record.pointsEarned || record.points || record.points_earned || record.prisma_points || ''),
      note: String(record.note || record.notes || '')
    });
  });
}

function validateAndNormalizeRow(row: Record<string, string>): ImportPreviewRow {
  // Normalize Keys
  const dateRaw = row['date'] || row['Date'] || row['created_at'] || '';
  const robotRaw = row['robot'] || row['robot_name'] || row['device'] || row['robotname'] || '';
  const durationRaw = row['duration_minutes'] || row['duration'] || row['duration_mins'] || row['minutes'] || '';
  const qualityRaw = row['quality_score'] || row['quality'] || row['verify_quality'] || row['score'] || '';
  const pointsRaw = row['points'] || row['prisma_points'] || row['points_earned'] || row['pix'] || '';
  const noteRaw = row['note'] || row['notes'] || row['comment'] || '';

  const errors: string[] = [];

  // Validate Date
  let cleanDate = dateRaw.trim();
  if (!cleanDate) {
    errors.push('Missing date');
  } else {
    // Attempt date normalization (e.g. YYYY-MM-DD)
    const d = new Date(cleanDate);
    if (isNaN(d.getTime())) {
      errors.push(`Invalid date standard "${cleanDate}"`);
    } else {
      cleanDate = d.toISOString().split('T')[0];
    }
  }

  // Validate Robot
  const cleanRobot = robotRaw.trim() || 'Piper (Agilex Robotics)';

  // Validate Duration
  const durationNum = parseFloat(durationRaw);
  if (isNaN(durationNum) || durationNum <= 0) {
    errors.push('Duration must be a positive number');
  }

  // Validate Quality Score (Optional)
  let qualityNum: number | null = null;
  if (qualityRaw !== undefined && qualityRaw !== null && qualityRaw.trim() !== '') {
    const parsedQuality = parseFloat(qualityRaw);
    if (!isNaN(parsedQuality)) {
      qualityNum = Math.min(100, Math.max(0, parsedQuality));
    }
  }

  // Validate Points
  const pointsNum = parseFloat(pointsRaw) || 0;

  return {
    date: cleanDate,
    robot: cleanRobot,
    duration_minutes: isNaN(durationNum) ? 0 : durationNum,
    quality_score: qualityNum,
    points: pointsNum,
    note: noteRaw.trim(),
    isValid: errors.length === 0,
    errorMessage: errors.length > 0 ? errors.join(', ') : undefined
  };
}

/**
 * Downloads current sessions as CSV
 */
export function exportSessionsToCSV(sessions: TeleopSession[], filename = 'prismax_teleop_sessions.csv') {
  const data = sessions.map(s => ({
    date: s.date,
    robot: s.robotName,
    duration_minutes: s.durationMinutes,
    quality_score: s.qualityScore !== null && s.qualityScore !== undefined ? s.qualityScore : '',
    points: s.pointsEarned,
    note: s.note || ''
  }));

  const csv = Papa.unparse(data);
  const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  triggerFileDownload(blob, filename);
}

/**
 * Downloads current sessions as JSON
 */
export function exportSessionsToJSON(sessions: TeleopSession[], filename = 'prismax_teleop_sessions.json') {
  const payload = {
    version: 1,
    exportedAt: new Date().toISOString(),
    totalSessions: sessions.length,
    sessions: sessions.map(s => ({
      date: s.date,
      robot: s.robotName,
      robotId: s.robotId,
      durationMinutes: s.durationMinutes,
      qualityScore: s.qualityScore,
      pointsEarned: s.pointsEarned,
      note: s.note
    }))
  };

  const json = JSON.stringify(payload, null, 2);
  const blob = new Blob([json], { type: 'application/json;charset=utf-8;' });
  triggerFileDownload(blob, filename);
}

function triggerFileDownload(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = filename;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
