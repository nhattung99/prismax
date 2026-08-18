import React from 'react';
import { Calendar, Heart, CheckCircle2 } from 'lucide-react';
import { TIMELINE_EVENTS } from '../../data/learnContent';

interface TimelineViewProps {
  searchQuery: string;
}

export const TimelineView: React.FC<TimelineViewProps> = ({ searchQuery }) => {
  const filteredEvents = TIMELINE_EVENTS.filter((e) =>
    e.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
    e.date.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border-2 border-[#FFC2D1] rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#3A2D32] flex items-center gap-2">
          <Calendar className="w-6 h-6 text-[#FF6B8B]" />
          <span>PrismaX Roadmap & Milestone History</span>
          <Heart className="w-4 h-4 text-[#FF4D6D] fill-[#FF4D6D]" />
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#6E5762] mt-0.5 font-medium">
          Chronological milestone log documenting teleop cup launches, verify quality announcements, and product updates
        </p>
      </div>

      {/* Vertical Timeline Container */}
      <div className="bg-white border-2 border-[#FFC2D1] rounded-3xl p-6 relative shadow-sm">
        
        {/* Center/Left Vertical Line */}
        <div className="absolute top-8 bottom-8 left-8 w-1 bg-[#FFD6E0] rounded-full" />

        <div className="space-y-8 relative pl-10">
          {filteredEvents.map((evt, idx) => (
            <div key={idx} className="relative group">
              
              {/* Timeline Dot */}
              <div className="absolute -left-10 top-1.5 w-6 h-6 rounded-full bg-white border-2 border-[#FF4D6D] flex items-center justify-center shadow-md">
                <div className="w-2.5 h-2.5 rounded-full bg-[#FF4D6D]" />
              </div>

              {/* Event Card */}
              <div className="bg-[#FFF8FA] p-5 border-l-4 border-l-[#FF6B8B] border-t border-r border-b border-[#FFC2D1] rounded-2xl hover:bg-[#FFF0F5] transition-all shadow-xs space-y-2">
                <div className="flex items-center justify-between gap-2">
                  <span className="font-sans text-xs px-3 py-1 bg-[#FF4D6D]/15 text-[#FF4D6D] border border-[#FF4D6D]/30 rounded-full font-extrabold">
                    {evt.date}
                  </span>

                  {evt.badge && (
                    <span className="font-sans text-[10px] uppercase px-2.5 py-0.5 rounded-full bg-emerald-50 text-[#2D6A4F] border border-emerald-200 font-bold flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-[#52B788]" />
                      <span>{evt.badge}</span>
                    </span>
                  )}
                </div>

                <h3 className="font-serif-editorial text-lg font-bold text-[#3A2D32]">
                  {evt.title}
                </h3>

                <p className="font-sans text-xs text-[#6E5762] leading-relaxed font-medium">
                  {evt.description}
                </p>

                <div className="pt-2 border-t border-[#FFD6E0] font-sans text-[11px] text-[#8F727D]">
                  Verified Source: <strong className="text-[#3A2D32]">{evt.source}</strong>
                </div>
              </div>

            </div>
          ))}
        </div>

      </div>

    </div>
  );
};
