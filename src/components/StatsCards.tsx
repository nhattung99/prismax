import React from 'react';
import { Clock, Layers, Award, Flame, Sparkles, Timer } from 'lucide-react';
import type { AggregateStats } from '../types/session';

interface StatsCardsProps {
  stats: AggregateStats;
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
      
      {/* 1. Total Hours */}
      <div className="prisma-card p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#9A938A] uppercase tracking-wider">Total Teleop</span>
          <div className="p-2 rounded-lg bg-[rgba(184,122,79,0.12)] text-[#C5885C] border border-[rgba(184,122,79,0.2)]">
            <Clock className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold font-serif-editorial text-white tracking-tight">
            {stats.totalDurationHours} <span className="text-sm font-normal text-[#DFD8D0] font-sans">hrs</span>
          </div>
          <p className="text-[11px] text-[#9A938A] mt-1">Cumulative operating time</p>
        </div>
      </div>

      {/* 2. Total Sessions */}
      <div className="prisma-card p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#9A938A] uppercase tracking-wider">Sessions</span>
          <div className="p-2 rounded-lg bg-[#2A2A2A] text-[#DFD8D0] border border-[rgba(223,216,208,0.1)]">
            <Layers className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold font-serif-editorial text-white tracking-tight">
            {stats.totalSessions}
          </div>
          <p className="text-[11px] text-[#9A938A] mt-1">Completed teleop runs</p>
        </div>
      </div>

      {/* 3. Average Quality Score */}
      <div className="prisma-card p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#9A938A] uppercase tracking-wider">Avg Quality</span>
          <div className="p-2 rounded-lg bg-[rgba(94,140,133,0.15)] text-[#7AAEA6] border border-[rgba(94,140,133,0.25)]">
            <Award className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold font-serif-editorial text-white tracking-tight flex items-baseline gap-1">
            {stats.avgQualityScore !== null ? (
              <>
                {stats.avgQualityScore} <span className="text-sm text-[#9A938A] font-sans font-normal">/ 100</span>
              </>
            ) : (
              <span className="text-base text-[#9A938A] font-sans italic font-normal">Unrated</span>
            )}
          </div>
          <p className="text-[11px] text-[#9A938A] mt-1">Verify Quality telemetry index</p>
        </div>
      </div>

      {/* 4. Active Streak */}
      <div className="prisma-card p-4 flex flex-col justify-between relative overflow-hidden">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#9A938A] uppercase tracking-wider">Active Streak</span>
          <div className="p-2 rounded-lg bg-[rgba(225,112,50,0.15)] text-[#E17032] border border-[rgba(225,112,50,0.25)]">
            <Flame className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold font-serif-editorial text-[#E17032] tracking-tight flex items-center gap-1.5">
            {stats.activeStreak} <span className="text-sm font-normal text-[#DFD8D0] font-sans">days</span>
          </div>
          <p className="text-[11px] text-[#9A938A] mt-1">
            {stats.activeStreak > 0 ? 'Consecutive daily activity 🔥' : 'Log a session today to start'}
          </p>
        </div>
      </div>

      {/* 5. Total Prisma Points */}
      <div className="prisma-card p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#9A938A] uppercase tracking-wider">Prisma Points</span>
          <div className="p-2 rounded-lg bg-[rgba(184,122,79,0.12)] text-[#C5885C] border border-[rgba(184,122,79,0.2)]">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-2xl sm:text-3xl font-bold font-serif-editorial text-white tracking-tight">
            {stats.totalPoints.toLocaleString()} <span className="text-xs font-normal text-[#C5885C] font-mono-numbers">$PIX</span>
          </div>
          <p className="text-[11px] text-[#9A938A] mt-1">Training rewards earned</p>
        </div>
      </div>

      {/* 6. Session Duration Extremes */}
      <div className="prisma-card p-4 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold text-[#9A938A] uppercase tracking-wider">Duration Range</span>
          <div className="p-2 rounded-lg bg-[#2A2A2A] text-[#DFD8D0] border border-[rgba(223,216,208,0.1)]">
            <Timer className="w-4 h-4" />
          </div>
        </div>
        <div className="mt-3">
          <div className="text-lg font-bold font-serif-editorial text-white tracking-tight flex items-center justify-between">
            <span>Max: <strong className="font-mono-numbers font-semibold text-[#C5885C]">{stats.longestSessionMinutes}m</strong></span>
          </div>
          <div className="text-xs text-[#9A938A] mt-0.5 flex items-center justify-between">
            <span>Min: <strong className="font-mono-numbers text-[#DFD8D0]">{stats.shortestSessionMinutes}m</strong></span>
          </div>
          <p className="text-[11px] text-[#9A938A] mt-1">Session length boundaries</p>
        </div>
      </div>

    </div>
  );
};
