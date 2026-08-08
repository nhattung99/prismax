import React from 'react';
import { Calendar, Filter } from 'lucide-react';
import type { CustomDateRange, TimeRangeOption } from '../types/session';

interface TimeFilterBarProps {
  selectedOption: TimeRangeOption;
  onSelectOption: (option: TimeRangeOption) => void;
  customRange: CustomDateRange;
  onCustomRangeChange: (range: CustomDateRange) => void;
}

export const TimeFilterBar: React.FC<TimeFilterBarProps> = ({
  selectedOption,
  onSelectOption,
  customRange,
  onCustomRangeChange
}) => {
  const options: { id: TimeRangeOption; label: string }[] = [
    { id: '7d', label: 'Last 7 Days' },
    { id: '30d', label: 'Last 30 Days' },
    { id: 'all', label: 'All Time' },
    { id: 'custom', label: 'Custom Range' }
  ];

  return (
    <div className="bg-[#202020] border border-[rgba(223,216,208,0.1)] rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-sm">
      
      {/* Label & Preset Buttons */}
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <div className="flex items-center gap-1.5 text-xs font-semibold text-[#9A938A] uppercase tracking-wider mr-1">
          <Filter className="w-3.5 h-3.5 text-[#B87A4F]" />
          <span>Period:</span>
        </div>

        <div className="flex flex-wrap items-center gap-1.5 bg-[#141414] p-1 rounded-lg border border-[rgba(223,216,208,0.06)]">
          {options.map((opt) => {
            const isActive = selectedOption === opt.id;
            return (
              <button
                key={opt.id}
                onClick={() => onSelectOption(opt.id)}
                className={`px-3 py-1.5 text-xs font-medium rounded-md transition-all ${
                  isActive
                    ? 'bg-[#B87A4F] text-white shadow-sm font-semibold'
                    : 'text-[#DFD8D0] hover:text-white hover:bg-[rgba(223,216,208,0.08)]'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Custom Date Range Picker */}
      {selectedOption === 'custom' && (
        <div className="flex items-center gap-2 text-xs w-full sm:w-auto animate-fade-in bg-[#141414] p-2 rounded-lg border border-[rgba(223,216,208,0.1)]">
          <Calendar className="w-3.5 h-3.5 text-[#B87A4F] shrink-0" />
          <div className="flex items-center gap-1.5">
            <input
              type="date"
              value={customRange.startDate}
              onChange={(e) => onCustomRangeChange({ ...customRange, startDate: e.target.value })}
              className="bg-[#202020] text-[#DFD8D0] text-xs px-2 py-1 rounded border border-[rgba(223,216,208,0.15)] focus:outline-none focus:border-[#B87A4F]"
            />
            <span className="text-[#9A938A]">to</span>
            <input
              type="date"
              value={customRange.endDate}
              onChange={(e) => onCustomRangeChange({ ...customRange, endDate: e.target.value })}
              className="bg-[#202020] text-[#DFD8D0] text-xs px-2 py-1 rounded border border-[rgba(223,216,208,0.15)] focus:outline-none focus:border-[#B87A4F]"
            />
          </div>
        </div>
      )}

    </div>
  );
};
