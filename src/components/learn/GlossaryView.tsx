import React, { useState } from 'react';
import { BookMarked, Search, ChevronRight } from 'lucide-react';
import type { GlossaryCategory } from '../../types/learn';
import { GLOSSARY_TERMS } from '../../data/learnContent';

interface GlossaryViewProps {
  searchQuery: string;
}

export const GlossaryView: React.FC<GlossaryViewProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<GlossaryCategory | 'all'>('all');
  const [localSearch, setLocalSearch] = useState('');

  const effectiveSearch = searchQuery || localSearch;

  const categories: { id: GlossaryCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Terms (19)' },
    { id: 'general', label: 'General & Architecture' },
    { id: 'teleop', label: 'Teleop & Quality' },
    { id: 'token', label: 'Tokens & Settlement' },
    { id: 'hardware', label: 'Hardware & Portals' },
    { id: 'roles', label: 'Roles & Tiers' }
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
      case 'general': return 'border-l-[#7CB88F]';
      case 'teleop': return 'border-l-[#B87A4F]';
      case 'token': return 'border-l-[#D9A45C]';
      case 'hardware': return 'border-l-[#B87A4F]';
      case 'roles': return 'border-l-[#7CB88F]';
      default: return 'border-l-[#B87A4F]';
    }
  };

  const getCategoryTagStyle = (category: GlossaryCategory) => {
    switch (category) {
      case 'general': return 'bg-[#7CB88F]/15 text-[#7CB88F] border-[#7CB88F]/30';
      case 'teleop': return 'bg-[#B87A4F]/15 text-[#B87A4F] border-[#B87A4F]/30';
      case 'token': return 'bg-[#D9A45C]/15 text-[#D9A45C] border-[#D9A45C]/30';
      case 'hardware': return 'bg-[#B87A4F]/15 text-[#B87A4F] border-[#B87A4F]/30';
      case 'roles': return 'bg-[#7CB88F]/15 text-[#7CB88F] border-[#7CB88F]/30';
      default: return 'bg-[#B87A4F]/15 text-[#B87A4F] border-[#B87A4F]/30';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Banner & Control Area */}
      <div className="bg-[#1C1C1C] border border-[#4B463F] rounded-md p-6 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="font-headline-md text-2xl sm:text-3xl font-bold font-serif-editorial text-[#FCF4EC] flex items-center gap-2">
              <BookMarked className="w-6 h-6 text-[#B87A4F]" />
              <span>Glossary Dictionary</span>
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-[#CDC5BC]">
              The definitive dictionary for PrismaX terminology, bridging mechanical engineering, physical AI telemetry, and decentralized clearing protocols.
            </p>
          </div>

          {/* Robot Mascot Badge */}
          <div className="p-3 bg-[#202020] border border-[#4B463F] rounded-md flex items-center gap-3 shrink-0">
            <img src="/images/robot_cat.png" alt="Robot Cat Mascot" className="w-12 h-12 object-contain rounded-lg bg-[#131313] p-1 border border-[#B87A4F]/40" />
            <div>
              <h4 className="font-label-mono text-xs font-bold text-[#FCF4EC]">P(x) Term Assistant</h4>
              <p className="text-[11px] text-[#969087]">19 Verified Definitions</p>
            </div>
          </div>
        </div>

        {/* Search Bar & Filter Sector Pills */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2 border-t border-[#4B463F]">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative w-full">
            <Search className="w-4 h-4 text-[#969087] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search terminology..."
              value={effectiveSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-[#131313] border border-[#4B463F] text-[#FCF4EC] font-body-md text-xs pl-10 pr-4 py-2.5 rounded focus:outline-none focus:border-[#DFD8D0] transition-colors placeholder:text-[#969087]"
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
                  className={`font-label-mono text-xs px-3 py-1.5 rounded transition-all ${
                    isActive
                      ? 'bg-[#DFD8D0] text-[#131313] font-bold'
                      : 'bg-[#202020] text-[#CDC5BC] hover:text-[#FCF4EC] hover:bg-[#262626] border border-[#4B463F]'
                  }`}
                >
                  {c.label}
                </button>
              );
            })}
          </div>

        </div>

      </div>

      {/* Directory Grid: Balanced 2-Column Grid */}
      <div className="bg-[#1C1C1C] border border-[#4B463F] rounded-md p-6 space-y-4">
        <div className="flex items-center justify-between font-label-mono text-xs text-[#CDC5BC] border-b border-[#4B463F] pb-3">
          <span className="font-bold text-[#FCF4EC]">TERMINOLOGY DIRECTORY ({sortedTerms.length} TERMS)</span>
          <span className="text-[#B87A4F]">100% VERIFIED CONTENT</span>
        </div>

        {sortedTerms.length === 0 ? (
          <div className="p-12 text-center text-[#969087]">
            <Search className="w-8 h-8 text-[#969087] mx-auto mb-2 opacity-50" />
            <p className="font-body-md text-xs font-semibold text-[#FCF4EC]">No glossary terms match your search filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            {sortedTerms.map((t, idx) => {
              const borderStyle = getCategoryBorder(t.category);
              const tagStyle = getCategoryTagStyle(t.category);

              return (
                <div
                  key={idx}
                  className={`bg-[#202020] p-5 border-l-4 ${borderStyle} border-t border-r border-b border-[#4B463F] rounded-md hover:bg-[#262626] transition-all group flex flex-col justify-between`}
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between gap-2">
                      <h3 className="font-label-mono text-base font-bold text-[#FCF4EC] group-hover:text-[#B87A4F] transition-colors">
                        {t.term}
                      </h3>
                      <span className={`font-label-tag text-[10px] uppercase px-2 py-0.5 rounded border ${tagStyle} font-semibold shrink-0`}>
                        {t.category}
                      </span>
                    </div>

                    <p className="font-body-md text-xs text-[#CDC5BC] leading-relaxed">
                      {t.shortDef}
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-[#4B463F] flex items-center justify-between font-label-mono text-[11px] text-[#969087]">
                    <span>STATUS: <strong className="text-[#7CB88F]">VERIFIED</strong></span>
                    <ChevronRight className="w-4 h-4 text-[#4B463F] group-hover:text-[#FCF4EC] group-hover:translate-x-1 transition-all" />
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
