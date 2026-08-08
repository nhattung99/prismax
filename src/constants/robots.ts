import type { RobotConfig, TeleopSession } from '../types/session';

export const OFFICIAL_ROBOTS: RobotConfig[] = [
  {
    id: 'piper',
    name: 'Piper',
    manufacturer: 'Agilex Robotics',
    isOfficial: true,
    badge: 'Validated',
    color: '#B87A4F' // Terracotta accent
  },
  {
    id: 'tok2',
    name: 'TOK2',
    manufacturer: 'Airbot',
    isOfficial: true,
    badge: 'Validated',
    color: '#DFD8D0' // Cream accent
  },
  {
    id: 'yam',
    name: 'YAM',
    manufacturer: 'I2rt Robotics',
    isOfficial: true,
    badge: 'Validated',
    color: '#5E8C85' // Slate teal accent
  }
];

export const CUSTOM_ROBOT_COLORS = [
  '#9B6B9E', // Lavender purple
  '#5B86B8', // Steel blue
  '#C87A5E', // Warm copper
  '#7A9B6B', // Sage green
  '#B85B7A'  // Rose oxide
];

// Seed data simulating 30+ days of teleop history ending in August 2026
export const INITIAL_SEED_SESSIONS: TeleopSession[] = [
  {
    id: 'seed-01',
    date: '2026-08-08',
    robotId: 'piper',
    robotName: 'Piper (Agilex Robotics)',
    durationMinutes: 90,
    qualityScore: 96.5,
    pointsEarned: 2450,
    note: 'Precision pick-and-place task for VLA training dataset v4. Smooth trajectory.',
    createdAt: '2026-08-08T09:15:00Z',
    updatedAt: '2026-08-08T09:15:00Z'
  },
  {
    id: 'seed-02',
    date: '2026-08-07',
    robotId: 'tok2',
    robotName: 'TOK2 (Airbot)',
    durationMinutes: 60,
    qualityScore: 92.0,
    pointsEarned: 1600,
    note: 'Bimanual assembly test session. Clean execution.',
    createdAt: '2026-08-07T14:30:00Z',
    updatedAt: '2026-08-07T14:30:00Z'
  },
  {
    id: 'seed-03',
    date: '2026-08-06',
    robotId: 'piper',
    robotName: 'Piper (Agilex Robotics)',
    durationMinutes: 120,
    qualityScore: 98.0,
    pointsEarned: 3200,
    note: 'High-speed object tracking teleop. Zero frame drop.',
    createdAt: '2026-08-06T11:00:00Z',
    updatedAt: '2026-08-06T11:00:00Z'
  },
  {
    id: 'seed-04',
    date: '2026-08-05',
    robotId: 'yam',
    robotName: 'YAM (I2rt Robotics)',
    durationMinutes: 45,
    qualityScore: 89.5,
    pointsEarned: 1150,
    note: 'Tactile force feedback tuning & initial dataset collection.',
    createdAt: '2026-08-05T16:20:00Z',
    updatedAt: '2026-08-05T16:20:00Z'
  },
  {
    id: 'seed-05',
    date: '2026-08-04',
    robotId: 'piper',
    robotName: 'Piper (Agilex Robotics)',
    durationMinutes: 75,
    qualityScore: 94.0,
    pointsEarned: 1950,
    note: 'Multi-object sorting task.',
    createdAt: '2026-08-04T10:00:00Z',
    updatedAt: '2026-08-04T10:00:00Z'
  },
  {
    id: 'seed-06',
    date: '2026-08-03',
    robotId: 'tok2',
    robotName: 'TOK2 (Airbot)',
    durationMinutes: 90,
    qualityScore: 91.5,
    pointsEarned: 2200,
    note: 'Cabinet opening and grasping sequence.',
    createdAt: '2026-08-03T15:45:00Z',
    updatedAt: '2026-08-03T15:45:00Z'
  },
  {
    id: 'seed-07',
    date: '2026-08-02',
    robotId: 'yam',
    robotName: 'YAM (I2rt Robotics)',
    durationMinutes: 60,
    qualityScore: 87.0,
    pointsEarned: 1400,
    note: 'Compliance control test under light payload.',
    createdAt: '2026-08-02T13:10:00Z',
    updatedAt: '2026-08-02T13:10:00Z'
  },
  {
    id: 'seed-08',
    date: '2026-08-01',
    robotId: 'piper',
    robotName: 'Piper (Agilex Robotics)',
    durationMinutes: 105,
    qualityScore: 97.2,
    pointsEarned: 2850,
    note: 'Fine motor control demo session.',
    createdAt: '2026-08-01T09:00:00Z',
    updatedAt: '2026-08-01T09:00:00Z'
  },
  {
    id: 'seed-09',
    date: '2026-07-30',
    robotId: 'tok2',
    robotName: 'TOK2 (Airbot)',
    durationMinutes: 80,
    qualityScore: 88.5,
    pointsEarned: 1900,
    note: 'Dual arm coordination test.',
    createdAt: '2026-07-30T14:00:00Z',
    updatedAt: '2026-07-30T14:00:00Z'
  },
  {
    id: 'seed-10',
    date: '2026-07-28',
    robotId: 'piper',
    robotName: 'Piper (Agilex Robotics)',
    durationMinutes: 110,
    qualityScore: 95.0,
    pointsEarned: 2900,
    note: 'Extended data harvest run.',
    createdAt: '2026-07-28T10:30:00Z',
    updatedAt: '2026-07-28T10:30:00Z'
  },
  {
    id: 'seed-11',
    date: '2026-07-25',
    robotId: 'yam',
    robotName: 'YAM (I2rt Robotics)',
    durationMinutes: 50,
    qualityScore: 86.0,
    pointsEarned: 1200,
    note: 'Calibration session after firmware update.',
    createdAt: '2026-07-25T16:00:00Z',
    updatedAt: '2026-07-25T16:00:00Z'
  },
  {
    id: 'seed-12',
    date: '2026-07-22',
    robotId: 'piper',
    robotName: 'Piper (Agilex Robotics)',
    durationMinutes: 90,
    qualityScore: 93.5,
    pointsEarned: 2300,
    note: 'Standard VLA dataset gathering.',
    createdAt: '2026-07-22T11:20:00Z',
    updatedAt: '2026-07-22T11:20:00Z'
  },
  {
    id: 'seed-13',
    date: '2026-07-18',
    robotId: 'tok2',
    robotName: 'TOK2 (Airbot)',
    durationMinutes: 70,
    qualityScore: 90.0,
    pointsEarned: 1750,
    note: 'Object stacking benchmark.',
    createdAt: '2026-07-18T15:00:00Z',
    updatedAt: '2026-07-18T15:00:00Z'
  },
  {
    id: 'seed-14',
    date: '2026-07-14',
    robotId: 'piper',
    robotName: 'Piper (Agilex Robotics)',
    durationMinutes: 85,
    qualityScore: 92.0,
    pointsEarned: 2100,
    note: 'Trajectory smoothing optimization.',
    createdAt: '2026-07-14T09:40:00Z',
    updatedAt: '2026-07-14T09:40:00Z'
  },
  {
    id: 'seed-15',
    date: '2026-07-10',
    robotId: 'yam',
    robotName: 'YAM (I2rt Robotics)',
    durationMinutes: 65,
    qualityScore: 88.0,
    pointsEarned: 1500,
    note: 'End-effector pressure sensitivity trial.',
    createdAt: '2026-07-10T13:15:00Z',
    updatedAt: '2026-07-10T13:15:00Z'
  }
];
