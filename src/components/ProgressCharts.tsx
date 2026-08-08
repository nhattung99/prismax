import React, { useState } from 'react';
import { TrendingUp, BarChart3, Coins, Calendar } from 'lucide-react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip
} from 'recharts';
import type { ProgressViewMode, TimeSeriesPoint } from '../types/session';

interface ProgressChartsProps {
  timeSeriesDataDaily: TimeSeriesPoint[];
  timeSeriesDataWeekly: TimeSeriesPoint[];
  timeSeriesDataMonthly: TimeSeriesPoint[];
}

export const ProgressCharts: React.FC<ProgressChartsProps> = ({
  timeSeriesDataDaily,
  timeSeriesDataWeekly,
  timeSeriesDataMonthly
}) => {
  const [viewMode, setViewMode] = useState<ProgressViewMode>('daily');
  const [activeTab, setActiveTab] = useState<'quality' | 'hours' | 'points'>('quality');

  const currentData = 
    viewMode === 'daily' 
      ? timeSeriesDataDaily 
      : viewMode === 'weekly' 
      ? timeSeriesDataWeekly 
      : timeSeriesDataMonthly;

  return (
    <div className="prisma-card p-6 space-y-6">
      
      {/* Header: Title + Mode Toggle */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[rgba(223,216,208,0.08)] pb-4">
        <div>
          <h2 className="text-lg font-semibold font-serif-editorial text-white flex items-center gap-2">
            <TrendingUp className="w-5 h-5 text-[#B87A4F]" />
            <span>Progress & Performance Telemetry</span>
          </h2>
          <p className="text-xs text-[#9A938A] mt-0.5">
            Monitor quality score trends, operating duration, and cumulative Prisma Points over time
          </p>
        </div>

        {/* View Mode Toggle (Daily / Weekly / Monthly) */}
        <div className="flex items-center gap-1 bg-[#141414] p-1 rounded-lg border border-[rgba(223,216,208,0.08)]">
          <Calendar className="w-3.5 h-3.5 text-[#9A938A] ml-2 mr-1" />
          {(['daily', 'weekly', 'monthly'] as ProgressViewMode[]).map((mode) => (
            <button
              key={mode}
              onClick={() => setViewMode(mode)}
              className={`px-3 py-1 text-xs font-medium rounded-md capitalize transition-all ${
                viewMode === mode
                  ? 'bg-[#B87A4F] text-white font-semibold shadow-sm'
                  : 'text-[#DFD8D0] hover:text-white hover:bg-[rgba(223,216,208,0.06)]'
              }`}
            >
              {mode}
            </button>
          ))}
        </div>
      </div>

      {/* Chart Selector Tabs */}
      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => setActiveTab('quality')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-lg font-medium transition-all ${
            activeTab === 'quality'
              ? 'bg-[rgba(94,140,133,0.2)] text-[#7AAEA6] border border-[rgba(94,140,133,0.4)]'
              : 'bg-[#141414] text-[#9A938A] border border-[rgba(223,216,208,0.06)] hover:text-white'
          }`}
        >
          <TrendingUp className="w-3.5 h-3.5" />
          <span>Quality Trend</span>
        </button>

        <button
          onClick={() => setActiveTab('hours')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-lg font-medium transition-all ${
            activeTab === 'hours'
              ? 'bg-[rgba(184,122,79,0.2)] text-[#C5885C] border border-[rgba(184,122,79,0.4)]'
              : 'bg-[#141414] text-[#9A938A] border border-[rgba(223,216,208,0.06)] hover:text-white'
          }`}
        >
          <BarChart3 className="w-3.5 h-3.5" />
          <span>Hours Worked</span>
        </button>

        <button
          onClick={() => setActiveTab('points')}
          className={`flex items-center gap-1.5 px-3.5 py-1.5 text-xs rounded-lg font-medium transition-all ${
            activeTab === 'points'
              ? 'bg-[rgba(225,112,50,0.2)] text-[#E17032] border border-[rgba(225,112,50,0.4)]'
              : 'bg-[#141414] text-[#9A938A] border border-[rgba(223,216,208,0.06)] hover:text-white'
          }`}
        >
          <Coins className="w-3.5 h-3.5" />
          <span>Cumulative $PIX</span>
        </button>
      </div>

      {/* Recharts Container */}
      <div className="h-72 w-full pt-2">
        {currentData.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-[#9A938A] text-xs">
            No telemetry data points available for this period.
          </div>
        ) : (
          <ResponsiveContainer width="100%" height="100%">
            
            {activeTab === 'quality' ? (
              <LineChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(223,216,208,0.06)" />
                <XAxis dataKey="period" stroke="#9A938A" tick={{ fontSize: 11 }} />
                <YAxis domain={[60, 100]} stroke="#9A938A" tick={{ fontSize: 11 }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const val = payload[0].value;
                      return (
                        <div className="bg-[#1A1A1A] border border-[rgba(223,216,208,0.15)] rounded-lg p-3 shadow-xl">
                          <p className="text-xs font-semibold text-white">{label}</p>
                          <p className="text-sm font-bold text-[#7AAEA6] mt-1">
                            Avg Quality: {val !== null ? `${val} / 100` : 'N/A'}
                          </p>
                          <p className="text-[11px] text-[#9A938A]">
                            {payload[0].payload.sessionCount} sessions
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Line
                  type="monotone"
                  dataKey="avgQualityScore"
                  name="Avg Quality Score"
                  stroke="#5E8C85"
                  strokeWidth={3}
                  dot={{ r: 4, fill: '#7AAEA6', stroke: '#202020', strokeWidth: 2 }}
                  activeDot={{ r: 6, fill: '#7AAEA6' }}
                  connectNulls
                />
              </LineChart>
            ) : activeTab === 'hours' ? (
              <BarChart data={currentData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(223,216,208,0.06)" />
                <XAxis dataKey="period" stroke="#9A938A" tick={{ fontSize: 11 }} />
                <YAxis stroke="#9A938A" tick={{ fontSize: 11 }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const val = payload[0].value;
                      return (
                        <div className="bg-[#1A1A1A] border border-[rgba(223,216,208,0.15)] rounded-lg p-3 shadow-xl">
                          <p className="text-xs font-semibold text-white">{label}</p>
                          <p className="text-sm font-bold text-[#C5885C] mt-1 font-mono-numbers">
                            {val} Teleop Hours
                          </p>
                          <p className="text-[11px] text-[#9A938A]">
                            {payload[0].payload.sessionCount} sessions logged
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Bar
                  dataKey="totalHours"
                  name="Teleop Hours"
                  fill="#B87A4F"
                  radius={[4, 4, 0, 0]}
                />
              </BarChart>
            ) : (
              <AreaChart data={currentData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
                <defs>
                  <linearGradient id="pointsGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E17032" stopOpacity={0.4} />
                    <stop offset="95%" stopColor="#E17032" stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(223,216,208,0.06)" />
                <XAxis dataKey="period" stroke="#9A938A" tick={{ fontSize: 11 }} />
                <YAxis stroke="#9A938A" tick={{ fontSize: 11 }} />
                <Tooltip
                  content={({ active, payload, label }) => {
                    if (active && payload && payload.length) {
                      const data = payload[0].payload;
                      return (
                        <div className="bg-[#1A1A1A] border border-[rgba(223,216,208,0.15)] rounded-lg p-3 shadow-xl">
                          <p className="text-xs font-semibold text-white">{label}</p>
                          <p className="text-sm font-bold text-[#E17032] mt-1 font-mono-numbers">
                            {data.cumulativePoints.toLocaleString()} $PIX (Cumulative)
                          </p>
                          <p className="text-xs text-[#DFD8D0] font-mono-numbers">
                            +{data.totalPoints.toLocaleString()} $PIX this period
                          </p>
                        </div>
                      );
                    }
                    return null;
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="cumulativePoints"
                  name="Cumulative Points"
                  stroke="#E17032"
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#pointsGrad)"
                />
              </AreaChart>
            )}

          </ResponsiveContainer>
        )}
      </div>

    </div>
  );
};
