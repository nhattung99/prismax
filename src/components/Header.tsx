import React from 'react';
import { PlusCircle, Upload, RotateCcw, Bot } from 'lucide-react';

interface HeaderProps {
  onOpenAddModal: () => void;
  onOpenImportExportModal: () => void;
  onResetSeedData: () => void;
  sessionCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenAddModal,
  onOpenImportExportModal,
  onResetSeedData,
  sessionCount
}) => {
  return (
    <header className="border-b border-[rgba(223,216,208,0.1)] bg-[#1A1A1A]/80 backdrop-blur-md sticky top-0 z-30 transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          
          {/* Brand & Subtitle */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-[#B87A4F] to-[#8B5A3C] flex items-center justify-center shadow-lg shadow-[#8B5A3C]/20 border border-white/10">
              <Bot className="w-5 h-5 text-white" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl sm:text-2xl font-semibold font-serif-editorial text-white tracking-wide">
                  PrismaX Teleop
                </h1>
                <span className="px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wider bg-[rgba(184,122,79,0.15)] text-[#C5885C] border border-[rgba(184,122,79,0.3)] rounded-full">
                  Analytics
                </span>
                <span className="hidden sm:inline-flex items-center gap-1 px-2 py-0.5 text-[10px] font-medium bg-[#202020] text-[#9A938A] border border-[rgba(223,216,208,0.1)] rounded">
                  Community Tool
                </span>
              </div>
              <p className="text-xs text-[#9A938A] mt-0.5 flex items-center gap-1.5">
                <span>Personal operator performance & VLA training data telemetry</span>
                <span className="w-1 h-1 rounded-full bg-[#B87A4F]/60"></span>
                <span className="text-[#DFD8D0] font-mono-numbers">{sessionCount} sessions</span>
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center gap-2 sm:gap-3">
            <button
              onClick={onResetSeedData}
              title="Reset data to default demonstration dataset"
              className="btn-secondary text-xs sm:text-sm py-2 px-3 flex items-center gap-1.5"
            >
              <RotateCcw className="w-3.5 h-3.5 text-[#9A938A]" />
              <span className="hidden sm:inline">Reset Seed Data</span>
              <span className="sm:hidden">Reset</span>
            </button>

            <button
              onClick={onOpenImportExportModal}
              className="btn-secondary text-xs sm:text-sm py-2 px-3 flex items-center gap-1.5"
            >
              <Upload className="w-3.5 h-3.5 text-[#DFD8D0]" />
              <span>Import / Export</span>
            </button>

            <button
              onClick={onOpenAddModal}
              className="btn-primary text-xs sm:text-sm py-2 px-4 flex items-center gap-2"
            >
              <PlusCircle className="w-4 h-4" />
              <span>Log Session</span>
            </button>
          </div>

        </div>
      </div>
    </header>
  );
};
