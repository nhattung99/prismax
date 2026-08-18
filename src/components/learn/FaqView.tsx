import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, AlertTriangle, FileText, Info } from 'lucide-react';
import type { FaqCategory } from '../../types/learn';
import { FAQ_ITEMS } from '../../data/faqContent';

interface FaqViewProps {
  searchQuery: string;
}

export const FaqView: React.FC<FaqViewProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<FaqCategory | 'all'>('all');
  const [localSearch, setLocalSearch] = useState('');
  const [openIds, setOpenIds] = useState<Record<string, boolean>>({});

  const effectiveSearch = searchQuery || localSearch;

  const categories: { id: FaqCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Questions' },
    { id: 'account', label: 'Account' },
    { id: 'points', label: 'Prisma Points' },
    { id: 'teleop', label: 'Teleoperation' },
    { id: 'queue', label: 'Queue' },
    { id: 'rewards', label: 'Rewards' },
    { id: 'troubleshooting', label: 'Troubleshooting' }
  ];

  const filteredFaqs = FAQ_ITEMS.filter((item) => {
    const matchesCategory = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch =
      item.question.toLowerCase().includes(effectiveSearch.toLowerCase()) ||
      item.answer.toLowerCase().includes(effectiveSearch.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const toggleAccordion = (id: string) => {
    setOpenIds((prev) => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const getCategoryBorder = (category: FaqCategory) => {
    switch (category) {
      case 'account': return 'border-l-[#7CB88F]';
      case 'points': return 'border-l-[#D9A45C]';
      case 'teleop': return 'border-l-[#B87A4F]';
      case 'queue': return 'border-l-[#B87A4F]';
      case 'rewards': return 'border-l-[#D9A45C]';
      case 'troubleshooting': return 'border-l-[#7CB88F]';
      default: return 'border-l-[#B87A4F]';
    }
  };

  const getCategoryTagStyle = (category: FaqCategory) => {
    switch (category) {
      case 'account': return 'bg-[#7CB88F]/15 text-[#7CB88F] border-[#7CB88F]/30';
      case 'points': return 'bg-[#D9A45C]/15 text-[#D9A45C] border-[#D9A45C]/30';
      case 'teleop': return 'bg-[#B87A4F]/15 text-[#B87A4F] border-[#B87A4F]/30';
      case 'queue': return 'bg-[#B87A4F]/15 text-[#B87A4F] border-[#B87A4F]/30';
      case 'rewards': return 'bg-[#D9A45C]/15 text-[#D9A45C] border-[#D9A45C]/30';
      case 'troubleshooting': return 'bg-[#7CB88F]/15 text-[#7CB88F] border-[#7CB88F]/30';
      default: return 'bg-[#B87A4F]/15 text-[#B87A4F] border-[#B87A4F]/30';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Warning / Callout Banner: Under Construction */}
      <div className="bg-amber-500/10 border border-amber-500/30 rounded-md p-4 flex items-start gap-3 text-amber-200">
        <AlertTriangle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
        <div className="space-y-1">
          <h4 className="font-label-mono text-xs font-bold uppercase text-amber-400">
            ⚠️ This section is under construction — content pending official sync.
          </h4>
          <p className="font-body-md text-xs text-amber-200/90 leading-relaxed">
            The User Manual & FAQ skeleton UI is active (Phase 1). Official answers from the June 2026 document will be ingested in Phase 2.
          </p>
        </div>
      </div>

      {/* Top Header Banner & Filter Area */}
      <div className="bg-[#1C1C1C] border border-[#4B463F] rounded-md p-6 space-y-6">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="font-headline-md text-2xl sm:text-3xl font-bold font-serif-editorial text-[#FCF4EC] flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-[#B87A4F]" />
              <span>User Manual & FAQ</span>
            </h2>
            <p className="font-body-md text-xs sm:text-sm text-[#CDC5BC]">
              Self-service guidance for accounts, Prisma Points, teleoperation troubleshooting, queue mechanics, and rewards.
            </p>
          </div>

          {/* Document Meta Badge */}
          <div className="p-3 bg-[#202020] border border-[#4B463F] rounded-md flex items-center gap-3 shrink-0">
            <FileText className="w-8 h-8 text-[#B87A4F]" />
            <div>
              <h4 className="font-label-mono text-xs font-bold text-[#FCF4EC]">Official Manual</h4>
              <p className="text-[11px] text-[#969087]">Last updated: June 2026</p>
            </div>
          </div>
        </div>

        {/* Search Bar & Category Filter Pills */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2 border-t border-[#4B463F]">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative w-full">
            <Search className="w-4 h-4 text-[#969087] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions & answers..."
              value={effectiveSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-[#131313] border border-[#4B463F] text-[#FCF4EC] font-body-md text-xs pl-10 pr-4 py-2.5 rounded focus:outline-none focus:border-[#DFD8D0] transition-colors placeholder:text-[#969087]"
            />
          </div>

          {/* Category Filter Pills */}
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

      {/* Accordion List Container */}
      <div className="bg-[#1C1C1C] border border-[#4B463F] rounded-md p-6 space-y-4">
        
        <div className="flex items-center justify-between font-label-mono text-xs text-[#CDC5BC] border-b border-[#4B463F] pb-3">
          <span className="font-bold text-[#FCF4EC]">FREQUENTLY ASKED QUESTIONS ({filteredFaqs.length})</span>
          <span className="text-[#B87A4F]">PHASE 1 SKELETON</span>
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center text-[#969087] space-y-3">
            <Info className="w-10 h-10 text-[#B87A4F] mx-auto opacity-75" />
            <div className="space-y-1">
              <h3 className="font-serif-editorial text-lg font-bold text-[#FCF4EC]">
                Phase 1 UI Ready — Waiting for Official Content Pack
              </h3>
              <p className="font-body-md text-xs text-[#CDC5BC] max-w-md mx-auto leading-relaxed">
                The User Manual & FAQ component structure is deployed. Official questions and answers from the June 2026 manual will be loaded in Phase 2.
              </p>
            </div>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredFaqs.map((faq) => {
              const isOpen = !!openIds[faq.id];
              const borderStyle = getCategoryBorder(faq.category);
              const tagStyle = getCategoryTagStyle(faq.category);

              return (
                <div
                  key={faq.id}
                  className={`bg-[#202020] border-l-4 ${borderStyle} border-t border-r border-b border-[#4B463F] rounded-md overflow-hidden transition-all`}
                >
                  {/* Accordion Question Header (Click to Toggle) */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-[#262626] transition-colors group cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className={`font-label-tag text-[10px] uppercase px-2 py-0.5 rounded border ${tagStyle} font-semibold inline-block mb-1`}>
                        {faq.category}
                      </span>
                      <h3 className="font-serif-editorial text-base sm:text-lg font-bold text-[#FCF4EC] group-hover:text-[#B87A4F] transition-colors leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div className="p-1 bg-[#131313] border border-[#4B463F] rounded shrink-0 mt-1">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#FCF4EC]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#969087] group-hover:text-[#FCF4EC]" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Answer Content (Collapsible Body) */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-2 border-t border-[#353534] bg-[#191919] space-y-3 font-sans text-xs text-[#CDC5BC] leading-relaxed">
                      <p className="whitespace-pre-line">{faq.answer}</p>
                      
                      {faq.sourceNote && (
                        <div className="pt-2 border-t border-[#353534] font-label-mono text-[11px] text-[#969087] flex items-center justify-between">
                          <span>Source Note: <strong className="text-[#FCF4EC]">{faq.sourceNote}</strong></span>
                          <span className="text-[#7CB88F]">Verified Manual</span>
                        </div>
                      )}
                    </div>
                  )}

                </div>
              );
            })}
          </div>
        )}

      </div>

    </div>
  );
};
