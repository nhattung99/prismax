import React from 'react';
import { Search, ExternalLink, Heart, Sparkles } from 'lucide-react';

export type LearnTab = 'onboarding' | 'glossary' | 'workflow' | 'ecosystem' | 'timeline' | 'faq';

interface HeaderProps {
  activeTab: LearnTab;
  onSelectTab: (tab: LearnTab) => void;
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  onSelectTab,
  searchQuery,
  onSearchChange
}) => {
  const tabs: { id: LearnTab; label: string; icon: string }[] = [
    { id: 'onboarding', label: 'Learn 101', icon: '✨' },
    { id: 'glossary', label: 'Glossary', icon: '📖' },
    { id: 'workflow', label: 'How Teleop Works', icon: '⚡' },
    { id: 'ecosystem', label: 'Ecosystem', icon: '🌐' },
    { id: 'timeline', label: 'Timeline', icon: '🗓️' },
    { id: 'faq', label: 'FAQ', icon: '💬' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 bg-[#FFF0F5]/90 backdrop-blur-md border-b-2 border-[#FFC2D1] transition-all shadow-sm">
      
      {/* Brand Title with Cute Mascot */}
      <div className="flex items-center gap-2.5 w-full md:w-auto justify-between md:justify-start">
        <a href="#" className="font-headline-md text-xl md:text-2xl font-bold font-serif-editorial text-[#3A2D32] tracking-tight hover:text-[#FF4D6D] transition-colors flex items-center gap-2">
          <span>PrismaX Learn</span>
          <Heart className="w-4 h-4 text-[#FF4D6D] fill-[#FF4D6D] animate-pulse" />
        </a>

        {/* Mobile Search input */}
        <div className="relative md:hidden w-36">
          <Search className="w-3.5 h-3.5 text-[#9E838F] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white text-[#3A2D32] text-xs pl-8 pr-2 py-1.5 rounded-full border border-[#FFC2D1] focus:outline-none focus:border-[#FF758F] focus:ring-1 focus:ring-[#FF758F]"
          />
        </div>
      </div>

      {/* Navigation Links with Cute Badges */}
      <div className="flex items-center gap-3 sm:gap-5 overflow-x-auto py-2 md:py-0 w-full md:w-auto justify-center">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectTab(t.id)}
              className={`font-sans text-xs font-bold transition-all py-1.5 px-3 rounded-full whitespace-nowrap flex items-center gap-1.5 ${
                isActive
                  ? 'bg-[#FF4D6D] text-white shadow-md shadow-pink-200 font-extrabold'
                  : 'text-[#6E5762] hover:text-[#FF4D6D] hover:bg-[#FFF0F3]'
              }`}
            >
              <span>{t.icon}</span>
              <span>{t.label}</span>
            </button>
          );
        })}
      </div>

      {/* Desktop Search & Portal Button */}
      <div className="hidden md:flex items-center gap-4">
        
        {/* Search input */}
        <div className="relative w-52">
          <Search className="w-3.5 h-3.5 text-[#9E838F] absolute left-3.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search terminology..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-white text-[#3A2D32] font-sans text-xs pl-9 pr-3 py-2 rounded-full border border-[#FFC2D1] focus:outline-none focus:border-[#FF758F] focus:ring-1 focus:ring-[#FF758F] shadow-inner"
          />
        </div>

        <a
          href="https://app.prismax.ai"
          target="_blank"
          rel="noreferrer"
          className="btn-editorial-primary flex items-center gap-1.5 shrink-0"
        >
          <Sparkles className="w-3.5 h-3.5" />
          <span>OPEN APP</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

      </div>

    </nav>
  );
};
