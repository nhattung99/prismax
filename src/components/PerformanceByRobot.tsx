import React from 'react';
import { Bot, Star, ShieldCheck, PieChart as PieChartIcon } from 'lucide-react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import type { RobotPerformance } from '../types/session';
import { OFFICIAL_ROBOTS, CUSTOM_ROBOT_COLORS } from '../constants/robots';

interface PerformanceByRobotProps {
  performances: RobotPerformance[];
}

export const PerformanceByRobot: React.FC<PerformanceByRobotProps> = ({ performances }) => {
  if (!performances || performances.length === 0) {
    return (
      <div className="prisma-card p-6 text-center">
        <Bot className="w-8 h-8 text-[#9A938A] mx-auto mb-2 opacity-50" />
        <h3 className="text-sm font-semibold text-white">No Robot Data Logged</h3>
        <p className="text-xs text-[#9A938A] mt-1">Log a teleop session to unlock robot telemetry & breakdown.</p>
      </div>
    );
  }

  // Map colors for donut chart
  const chartData = performances.map((p, idx) => {
    const official = OFFICIAL_ROBOTS.find(r => r.name.toLowerCase().includes(p.robotId.toLowerCase()) || r.id === p.robotId);
    const color = official ? official.color : CUSTOM_ROBOT_COLORS[idx % CUSTOM_ROBOT_COLORS.length];

    return {
      name: p.robotName,
      value: p.totalHours,
      percentage: p.percentageOfTotalTime,
      sessions: p.totalSessions,
      color
    };
  });

  return (
    <div className="space-y-6">
      
      {/* Section Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-lg font-semibold font-serif-editorial text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#B87A4F]" />
            <span>Robot Fleet Performance</span>
          </h2>
          <p className="text-xs text-[#9A938A] mt-0.5">
            Comparative telemetry across Piper, TOK2, YAM and active devices
          </p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Robot Cards Grid (2 Cols on Large Screen) */}
        <div className="lg:col-span-2 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {performances.map((robot) => {
            const officialMatch = OFFICIAL_ROBOTS.find(
              r => r.name.toLowerCase().includes(robot.robotId.toLowerCase()) || r.id === robot.robotId
            );
            const badgeColor = officialMatch?.color || '#B87A4F';

            return (
              <div
                key={robot.robotId}
                className={`prisma-card p-5 relative overflow-hidden transition-all ${
                  robot.isFavorite ? 'border-[rgba(184,122,79,0.4)] shadow-md shadow-[#8B5A3C]/10' : ''
                }`}
              >
                {/* Top Row: Robot Name, Badges */}
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white font-serif-editorial">
                        {robot.robotName}
                      </h3>
                    </div>
                    <p className="text-xs text-[#9A938A] mt-0.5">{robot.manufacturer}</p>
                  </div>

                  <div className="flex flex-col items-end gap-1 shrink-0">
                    {robot.isOfficial && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[rgba(94,140,133,0.15)] text-[#7AAEA6] border border-[rgba(94,140,133,0.3)] rounded-full flex items-center gap-1">
                        <ShieldCheck className="w-3 h-3" />
                        <span>Validated</span>
                      </span>
                    )}

                    {robot.isFavorite && (
                      <span className="px-2 py-0.5 text-[10px] font-semibold tracking-wider bg-[rgba(184,122,79,0.2)] text-[#C5885C] border border-[rgba(184,122,79,0.4)] rounded-full flex items-center gap-1">
                        <Star className="w-3 h-3 fill-[#C5885C]" />
                        <span>Favorite Robot</span>
                      </span>
                    )}
                  </div>
                </div>

                {/* Metrics Breakdown */}
                <div className="grid grid-cols-2 gap-3 mt-4 pt-4 border-t border-[rgba(223,216,208,0.08)]">
                  <div>
                    <span className="text-[10px] font-semibold text-[#9A938A] uppercase tracking-wider block">Total Hours</span>
                    <span className="text-lg font-bold font-serif-editorial text-white">
                      {robot.totalHours} <span className="text-xs font-sans font-normal text-[#9A938A]">hrs ({robot.percentageOfTotalTime}%)</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-[#9A938A] uppercase tracking-wider block">Sessions</span>
                    <span className="text-lg font-bold font-serif-editorial text-white">
                      {robot.totalSessions} <span className="text-xs font-sans font-normal text-[#9A938A]">runs</span>
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-[#9A938A] uppercase tracking-wider block">Avg Quality</span>
                    <span className="text-lg font-bold font-serif-editorial text-[#7AAEA6]">
                      {robot.avgQualityScore !== null ? `${robot.avgQualityScore}` : 'N/A'}
                    </span>
                  </div>

                  <div>
                    <span className="text-[10px] font-semibold text-[#9A938A] uppercase tracking-wider block">Avg Points/Run</span>
                    <span className="text-lg font-bold font-serif-editorial text-[#C5885C]">
                      {robot.avgPointsPerSession.toLocaleString()} <span className="text-[10px] font-sans font-normal">$PIX</span>
                    </span>
                  </div>
                </div>

                {/* Progress bar visual for % of total time */}
                <div className="mt-4">
                  <div className="w-full bg-[#141414] h-1.5 rounded-full overflow-hidden border border-[rgba(223,216,208,0.05)]">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{ width: `${robot.percentageOfTotalTime}%`, backgroundColor: badgeColor }}
                    />
                  </div>
                </div>

              </div>
            );
          })}
        </div>

        {/* Donut Time Share Chart */}
        <div className="prisma-card p-5 flex flex-col justify-between">
          <div>
            <h3 className="text-sm font-semibold text-white font-serif-editorial flex items-center gap-2">
              <PieChartIcon className="w-4 h-4 text-[#B87A4F]" />
              <span>Time Share Distribution</span>
            </h3>
            <p className="text-xs text-[#9A938A] mt-0.5">Operating hours percentage per robot</p>
          </div>

          <div className="h-64 w-full my-2">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={chartData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={85}
                  paddingAngle={4}
                  dataKey="value"
                  stroke="#202020"
                  strokeWidth={2}
                >
                  {chartData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip
                  content={({ active, payload }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#1A1A1A] border border-[rgba(223,216,208,0.15)] rounded-lg p-3 shadow-xl">
                          <p className="text-xs font-semibold text-white">{data.name}</p>
                          <p className="text-xs text-[#C5885C] mt-1 font-mono-numbers">
                            {data.value} hrs ({data.percentage}%)
                          </p>
                          <p className="text-[11px] text-[#9A938A]">{data.sessions} sessions logged</p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Legend
                  formatter={(value) => <span className="text-xs text-[#DFD8D0]">{value}</span>}
                  layout="horizontal"
                  align="center"
                  verticalAlign="bottom"
                />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="text-[11px] text-[#9A938A] text-center pt-2 border-t border-[rgba(223,216,208,0.06)]">
            Total Teleop: <strong className="text-white font-mono-numbers">{chartData.reduce((acc, c) => acc + c.value, 0).toFixed(1)} hrs</strong>
          </div>
        </div>

      </div>

    </div>
  );
};
