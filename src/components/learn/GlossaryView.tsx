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

  return (
    <div className="space-y-6">
      
      {/* Header & Search Banner Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Left Column: Title, Description & Search Bar */}
        <div className="lg:col-span-5 space-y-6">
          <div>
            <h2 className="font-headline-md text-2xl sm:text-3xl font-bold font-serif-editorial text-[#FCF4EC] mb-2 flex items-center gap-2">
              <BookMarked className="w-6 h-6 text-[#B87A4F]" />
              <span>Glossary Dictionary</span>
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-[#CDC5BC] leading-relaxed">
              The definitive dictionary for PrismaX terminology, bridging mechanical engineering, physical AI telemetry, and decentralized clearing protocols.
            </p>
          </div>

          {/* Robot Mascot Card */}
          <div className="p-4 bg-[#202020] border border-[#4B463F] rounded-md flex items-center gap-4">
            <img src="/images/robot_cat.png" alt="Robot Cat Mascot" className="w-16 h-16 object-contain rounded-lg bg-[#131313] p-1 border border-[#B87A4F]/40 shrink-0" />
            <div>
              <h4 className="font-label-mono text-xs font-bold text-[#FCF4EC]">P(x) Autonomous Assistant</h4>
              <p className="text-[11px] text-[#969087] mt-0.5 leading-tight">Instant reference for technical terms, VLA pipeline tokens & physical AI roles.</p>
            </div>
          </div>

          {/* Search Bar Input */}
          <div className="relative w-full">
            <Search className="w-4 h-4 text-[#969087] absolute left-4 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search terminology..."
              value={effectiveSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-[#262626] border-b border-[#4B463F] text-[#FCF4EC] font-body-md text-xs px-12 py-3 focus:outline-none focus:border-[#DFD8D0] focus:bg-[#2A2A2A] transition-colors placeholder:text-[#969087]"
            />
          </div>

          {/* Category Filter Pills */}
          <div className="space-y-2">
            <span className="font-label-mono text-xs text-[#969087] uppercase tracking-wider block">Filter Sector:</span>
            <div className="flex flex-wrap gap-1.5">
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

        {/* Right Column: Terms List Box */}
        <div className="lg:col-span-7 bg-[#202020] border-l-4 border-l-[#4B463F] border-t border-r border-b border-[#4B463F] rounded-md overflow-hidden">
          
          <div className="px-6 py-4 bg-[#2A2A2A] border-b border-[#4B463F] flex justify-between items-center font-label-mono text-xs">
            <span className="text-[#CDC5BC] uppercase font-semibold">TERMINOLOGY DIRECTORY ({sortedTerms.length})</span>
            <span className="text-[#969087]">100% VERIFIED</span>
          </div>

          {sortedTerms.length === 0 ? (
            <div className="p-12 text-center text-[#969087]">
              <Search className="w-8 h-8 text-[#969087] mx-auto mb-2 opacity-50" />
              <p className="font-body-md text-xs font-semibold text-[#FCF4EC]">No glossary terms match your search filter.</p>
            </div>
          ) : (
            <ul className="divide-y divide-[#353534]">
              {sortedTerms.map((t, idx) => (
                <li
                  key={idx}
                  className="p-6 hover:bg-[#262626] transition-colors cursor-pointer group flex justify-between items-start"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <h4 className="font-label-mono text-base font-bold text-[#FCF4EC] group-hover:text-[#B87A4F] transition-colors">
                        {t.term}
                      </h4>
                      <span className="font-label-tag text-[10px] uppercase px-2 py-0.5 rounded bg-[#131313] text-[#B87A4F] border border-[#4B463F]">
                        {t.category}
                      </span>
                    </div>
                    <p className="font-body-md text-xs text-[#CDC5BC] leading-relaxed max-w-xl">
                      {t.shortDef}
                    </p>
                  </div>

                  <ChevronRight className="w-5 h-5 text-[#4B463F] group-hover:text-[#FCF4EC] transition-colors shrink-0 ml-4 mt-1" />
                </li>
              ))}
            </ul>
          )}

        </div>

      </div>

    </div>
  );
};
