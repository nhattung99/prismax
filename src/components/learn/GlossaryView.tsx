import React, { useState } from 'react';
import { BookMarked, Search, ChevronRight, Heart } from 'lucide-react';
import type { GlossaryCategory } from '../../types/learn';
import { GLOSSARY_TERMS } from '../../data/learnContent';

interface GlossaryViewProps {
  searchQuery: string;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | 'all'>('all');
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = searchQuery || localSearch;

  const categories: { id: GlossaryCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Terms (19)', icon: '📖' },
    { id: 'general', label: 'General & Architecture', icon: '🌱' },
    { id: 'teleop', label: 'Teleop & Quality', icon: '⚡' },
    { id: 'token', label: 'Tokens & Settlement', icon: '🎁' },
    { id: 'hardware', label: 'Hardware & Portals', icon: '🤖' },
    { id: 'roles', label: 'Roles & Tiers', icon: '👑' }
  ];

  const filteredTerms = GLOSSARY_TERMS.filter((term) => {
    const matchesCategory = selectedCategory === 'all' || term.category === selectedCategory;
    const matchesSearch =
      term.term.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      term.shortDef.toLowerCase().includes(effectiveSearch.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const sortedTerms = [...filteredTerms].sort((a, b) => a.term.localeCompare(b.term));

  const getCategoryBorder = (category: GlossaryCategory) => {
    switch (category) {
      case 'general': return 'border-l-[#52B788]';
      case 'teleop': return 'border-l-[#FF6B8B]';
      case 'token': return 'border-l-[#FFB703]';
      case 'hardware': return 'border-l-[#FF6B8B]';
      case 'roles': return 'border-l-[#52B788]';
      default: return 'border-l-[#FF6B8B]';
    }
  };

  const getCategoryTagStyle = (category: GlossaryCategory) => {
    switch (category) {
      case 'general': return 'bg-[#52B788]/15 text-[#2D6A4F] border-[#52B788]/40';
      case 'teleop': return 'bg-[#FF6B8B]/15 text-[#E0527F] border-[#FF6B8B]/40';
      case 'token': return 'bg-[#FFB703]/20 text-[#B58200] border-[#FFB703]/40';
      case 'hardware': return 'bg-[#FF6B8B]/15 text-[#E0527F] border-[#FF6B8B]/40';
      case 'roles': return 'bg-[#52B788]/15 text-[#2D6A4F] border-[#52B788]/40';
      default: return 'bg-[#FF6B8B]/15 text-[#E0527F] border-[#FF6B8B]/40';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Control Area */}
      <div className="bg-white border-2 border-[#FFC2D1] rounded-3xl p-6 space-y-6 shadow-sm">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="font-headline-md text-2xl sm:text-3xl font-bold font-serif-editorial text-[#3A2D32] flex items-center gap-2">
              <BookMarked className="w-6 h-6 text-[#FF6B8B]" />
              <span>Glossary Dictionary</span>
              <Heart className="w-4 h-4 text-[#FF4D6D] fill-[#FF4D6D]" />
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#6E5762]">
              The definitive dictionary for PrismaX terminology, bridging mechanical engineering, physical AI telemetry, and decentralized clearing protocols.
            </p>
          </div>

          {/* Robot Mascot Badge */}
          <div className="p-3 bg-[#FFF5F8] border border-[#FFC2D1] rounded-2xl flex items-center gap-3 shrink-0 shadow-2xs">
            <img src="/images/robot_cat.png" alt="Robot Cat Mascot" className="w-12 h-12 object-contain rounded-xl bg-white p-1 border border-[#FF758F]" />
            <div>
              <h4 className="font-sans text-xs font-bold text-[#3A2D32]">P(x) Term Assistant</h4>
              <p className="text-[11px] text-[#8F727D] font-medium">19 Verified Definitions</p>
            </div>
          </div>
        </div>

        {/* Search Bar & Filter Sector Pills */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2 border-t border-[#FFC2D1]">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative w-full">
            <Search className="w-4 h-4 text-[#9E838F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search terminology..."
              value={effectiveSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-[#FFF5F8] border border-[#FFC2D1] text-[#3A2D32] font-sans text-xs pl-10 pr-4 py-2.5 rounded-full focus:outline-none focus:border-[#FF758F] focus:ring-1 focus:ring-[#FF758F] transition-colors placeholder:text-[#9E838F]"
            />
          </div>

          {/* Sector Pills */}
          <div className="md:col-span-7 flex flex-wrap items-center gap-1.5 justify-start md:justify-end">
            {categories.map((c) => {
              const isActive = selectedCategory === c.id;
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedCategory(c.id)}
                  className={`font-sans text-xs px-3.5 py-1.5 rounded-full transition-all font-bold flex items-center gap-1 ${
                    isActive
                      ? 'bg-[#FF4D6D] text-white shadow-sm'
                      : 'bg-[#FFF0F3] text-[#6E5762] hover:text-[#FF4D6D] hover:bg-white border border-[#FFC2D1]'
                  }`}
                >
                  <span>{c.icon}</span>
                  <span>{c.label}</span>
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* Directory Grid: Balanced 2-Column Grid */}
      <div className="bg-white border-2 border-[#FFC2D1] rounded-3xl p-6 space-y-4 shadow-sm">
        <div className="flex items-center justify-between font-sans text-xs text-[#6E5762] border-b border-[#FFC2D1] pb-3">
          <span className="font-bold text-[#3A2D32]">TERMINOLOGY DIRECTORY ({sortedTerms.length} TERMS)</span>
          <span className="text-[#FF6B8B] font-extrabold flex items-center gap-1">
            <Heart className="w-3.5 h-3.5 fill-[#FF6B8B]" />
            <span>100% VERIFIED CONTENT</span>
          </span>
        </div>

        {sortedTerms.length === 0 ? (
          <div className="p-12 text-center text-[#8F727D]">
            <Search className="w-8 h-8 text-[#FFB3C6] mx-auto mb-2" />
            <p className="font-sans text-xs font-bold text-[#3A2D32]">No glossary terms match your search filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {sortedTerms.map((t, idx) => {
              const borderStyle = getCategoryBorder(t.category);
              const tagStyle = getCategoryTagStyle(t.category);

              return (
                <div
                  key={idx}
                  className={`bg-[#FFF8FA] p-5 border-l-4 ${borderStyle} border-t border-r border-b border-[#FFC2D1] rounded-2xl hover:bg-[#FFF0F5] transition-all group flex flex-col justify-between shadow-xs`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-sans text-base font-bold text-[#3A2D32] group-hover:text-[#FF4D6D] transition-colors">
                        {t.term}
                      </h3>
                      <span className={`font-sans text-[10px] uppercase px-2.5 py-0.5 rounded-full border ${tagStyle} font-bold shrink-0`}>
                        {t.category}
                      </span>
                    </div>

                    <p className="font-sans text-xs text-[#6E5762] leading-relaxed font-medium">
                      {t.shortDef}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#FFD6E0] flex items-center justify-between font-sans text-[11px] text-[#8F727D]">
                    <span>STATUS: <strong className="text-[#52B788] font-bold">VERIFIED</strong></span>
                    <ChevronRight className="w-4 h-4 text-[#FFB3C6] group-hover:text-[#FF4D6D] group-hover:translate-x-1 transition-all" />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

    </div>
  );
};
