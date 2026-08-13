import React from 'react';
import { Search, ExternalLink } from 'lucide-react';

export type LearnTab = 'onboarding' | 'glossary' | 'workflow' | 'ecosystem' | 'timeline';

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
  const tabs: { id: LearnTab; label: string }[] = [
    { id: 'onboarding', label: 'Learn 101' },
    { id: 'glossary', label: 'Glossary' },
    { id: 'workflow', label: 'How Teleop Works' },
    { id: 'ecosystem', label: 'Ecosystem' },
    { id: 'timeline', label: 'Timeline' }
  ];

  return (
    <nav className="fixed top-0 w-full z-50 flex flex-col md:flex-row items-center justify-between px-4 md:px-8 py-3 bg-[#131313]/95 backdrop-blur-md border-b border-[#4B463F] transition-all">
      
      {/* Brand Title */}
      <div className="flex items-center gap-3 w-full md:w-auto justify-between md:justify-start">
        <a href="#" className="font-headline-md text-xl md:text-2xl font-bold font-serif-editorial text-[#FCF4EC] tracking-tight hover:opacity-90">
          PrismaX Learn
        </a>

        {/* Mobile Search input */}
        <div className="relative md:hidden w-36">
          <Search className="w-3.5 h-3.5 text-[#969087] absolute left-2.5 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#202020] text-[#FCF4EC] text-xs pl-8 pr-2 py-1 rounded border border-[#4B463F] focus:outline-none focus:border-[#DFD8D0]"
          />
        </div>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center gap-4 sm:gap-6 overflow-x-auto py-2 md:py-0 w-full md:w-auto justify-center">
        {tabs.map((t) => {
          const isActive = activeTab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => onSelectTab(t.id)}
              className={`font-label-mono text-xs font-medium transition-all py-1 whitespace-nowrap ${
                isActive
                  ? 'text-[#FCF4EC] border-b-2 border-[#FCF4EC] font-semibold'
                  : 'text-[#CDC5BC] hover:text-[#FFFFFF]'
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      {/* Desktop Search & Portal Button */}
      <div className="hidden md:flex items-center gap-4">
        
        {/* Search input */}
        <div className="relative w-52">
          <Search className="w-3.5 h-3.5 text-[#969087] absolute left-3 top-1/2 -translate-y-1/2" />
          <input
            type="text"
            placeholder="Search terminology..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full bg-[#202020] text-[#FCF4EC] font-label-mono text-xs pl-9 pr-3 py-1.5 rounded border border-[#4B463F] focus:outline-none focus:border-[#DFD8D0]"
          />
        </div>

        <a
          href="https://app.prismax.ai"
          target="_blank"
          rel="noreferrer"
          className="btn-editorial-primary flex items-center gap-1.5 shrink-0"
        >
          <span>OPEN APP</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>

      </div>

    </nav>
  );
};
