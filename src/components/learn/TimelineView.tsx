import React from 'react';
import { Calendar, CheckCircle2 } from 'lucide-react';
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
    <div className="space-y-6 max-w-4xl mx-auto">
      
      {/* Header Banner */}
      <div className="bg-[#1C1C1C] border border-[#4B463F] rounded-md p-5 text-center sm:text-left">
        <h2 className="text-xl font-bold font-serif-editorial text-[#FCF4EC] flex items-center justify-center sm:justify-start gap-2">
          <Calendar className="w-5 h-5 text-[#B87A4F]" />
          <span>Verified Network Milestones & Roadmap</span>
        </h2>
        <p className="font-body-md text-xs text-[#CDC5BC] mt-1">
          Chronological record of official public disclosures, funding milestones, and product releases
        </p>
      </div>

      {/* Timeline List */}
      <div className="relative border-l-2 border-[#4B463F] ml-4 sm:ml-8 pl-6 sm:pl-8 space-y-8 py-2">
        {filteredEvents.map((evt, idx) => (
          <div key={idx} className="relative group">
            
            {/* Timeline Circle Bullet */}
            <div className="absolute -left-[31px] sm:-left-[39px] top-1.5 w-6 h-6 rounded-full bg-[#131313] border-2 border-[#B87A4F] flex items-center justify-center text-[#B87A4F] group-hover:bg-[#B87A4F] group-hover:text-[#131313] transition-colors">
              <CheckCircle2 className="w-3.5 h-3.5" />
            </div>

            {/* Content Card */}
            <div className="bg-[#202020] border-l-4 border-l-[#B87A4F] border-t border-r border-b border-[#4B463F] rounded-md p-5 space-y-2 hover:bg-[#262626] transition-all">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <span className="font-label-mono text-xs font-bold text-[#B87A4F]">
                  {evt.date}
                </span>

                {evt.badge && (
                  <span className="font-label-tag text-[10px] uppercase px-2 py-0.5 rounded bg-[#7CB88F]/15 text-[#7CB88F] border border-[#7CB88F]/30 font-semibold">
                    {evt.badge}
                  </span>
                )}
              </div>

              <h3 className="font-headline-md text-lg font-bold font-serif-editorial text-[#FCF4EC]">
                {evt.title}
              </h3>

              <p className="font-body-md text-xs text-[#CDC5BC] leading-relaxed">
                {evt.description}
              </p>

              <div className="pt-2 border-t border-[#4B463F] font-label-mono text-[11px] text-[#969087]">
                Verified Source: <strong className="text-[#FCF4EC]">{evt.source}</strong>
              </div>
            </div>

          </div>
        ))}
      </div>

    </div>
  );
};
