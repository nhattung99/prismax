import React, { useState } from 'react';
import { HelpCircle, Search, ChevronDown, ChevronUp, FileText, CheckCircle2, Heart } from 'lucide-react';
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

  const categories: { id: FaqCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: `All Questions (${FAQ_ITEMS.length})`, icon: '✨' },
    { id: 'teleop', label: 'Teleoperation & Queue', icon: '⚡' },
    { id: 'points', label: 'Points & Rewards', icon: '🎁' },
    { id: 'account', label: 'Account & Login', icon: '🔑' },
    { id: 'payment', label: 'Membership & Payment', icon: '💳' },
    { id: 'validation', label: 'Validation Guide', icon: '✅' },
    { id: 'troubleshooting', label: 'Support & Tickets', icon: '💬' },
    { id: 'owner_operator', label: 'Owner-Operator & Fleet', icon: '🤖' }
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
      case 'teleop': return 'border-l-[#FF6B8B]';
      case 'points': return 'border-l-[#FFB703]';
      case 'account': return 'border-l-[#52B788]';
      case 'payment': return 'border-l-[#FFB703]';
      case 'validation': return 'border-l-[#52B788]';
      case 'troubleshooting': return 'border-l-[#FF6B8B]';
      case 'owner_operator': return 'border-l-[#FF6B8B]';
      default: return 'border-l-[#FF6B8B]';
    }
  };

  const getCategoryTagStyle = (category: FaqCategory) => {
    switch (category) {
      case 'teleop': return 'bg-[#FF6B8B]/15 text-[#E0527F] border-[#FF6B8B]/40';
      case 'points': return 'bg-[#FFB703]/20 text-[#B58200] border-[#FFB703]/40';
      case 'account': return 'bg-[#52B788]/15 text-[#2D6A4F] border-[#52B788]/40';
      case 'payment': return 'bg-[#FFB703]/20 text-[#B58200] border-[#FFB703]/40';
      case 'validation': return 'bg-[#52B788]/15 text-[#2D6A4F] border-[#52B788]/40';
      case 'troubleshooting': return 'bg-[#FF6B8B]/15 text-[#E0527F] border-[#FF6B8B]/40';
      case 'owner_operator': return 'bg-[#FF6B8B]/15 text-[#E0527F] border-[#FF6B8B]/40';
      default: return 'bg-[#FF6B8B]/15 text-[#E0527F] border-[#FF6B8B]/40';
    }
  };

  const getCategoryLabel = (category: FaqCategory) => {
    switch (category) {
      case 'teleop': return 'Teleoperation & Queue';
      case 'points': return 'Points & Rewards';
      case 'account': return 'Account & Login';
      case 'payment': return 'Membership & Payment';
      case 'validation': return 'Validation Guide';
      case 'troubleshooting': return 'Support & Tickets';
      case 'owner_operator': return 'Owner-Operator & Fleet';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Top Header Banner & Filter Area */}
      <div className="bg-white border-2 border-[#FFC2D1] rounded-3xl p-6 space-y-6 shadow-sm">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="font-headline-md text-2xl sm:text-3xl font-bold font-serif-editorial text-[#3A2D32] flex items-center gap-2">
              <HelpCircle className="w-6 h-6 text-[#FF6B8B]" />
              <span>User Manual & FAQ</span>
              <Heart className="w-4 h-4 text-[#FF4D6D] fill-[#FF4D6D]" />
            </h2>
            <p className="font-sans text-xs sm:text-sm text-[#6E5762]">
              The official self-check reference guide for accounts, Prisma Points, teleoperation, validation, queue rules, rewards, and support tickets.
            </p>
          </div>

          {/* Document Meta Badge */}
          <div className="p-3 bg-[#FFF5F8] border border-[#FFC2D1] rounded-2xl flex items-center gap-3 shrink-0 shadow-2xs">
            <FileText className="w-8 h-8 text-[#FF6B8B]" />
            <div>
              <h4 className="font-sans text-xs font-bold text-[#3A2D32] flex items-center gap-1">
                <span>Official User Manual</span>
                <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788]" />
              </h4>
              <p className="text-[11px] text-[#8F727D] font-medium">Updated: June 2026</p>
            </div>
          </div>
        </div>

        {/* Search Bar & Category Filter Pills */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-center pt-2 border-t border-[#FFC2D1]">
          
          {/* Search Input */}
          <div className="md:col-span-5 relative w-full">
            <Search className="w-4 h-4 text-[#9E838F] absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search questions & answers..."
              value={effectiveSearch}
              onChange={(e) => setLocalSearch(e.target.value)}
              className="w-full bg-[#FFF5F8] border border-[#FFC2D1] text-[#3A2D32] font-sans text-xs pl-10 pr-4 py-2.5 rounded-full focus:outline-none focus:border-[#FF758F] focus:ring-1 focus:ring-[#FF758F] transition-colors placeholder:text-[#9E838F]"
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

      {/* Accordion List Container */}
      <div className="bg-white border-2 border-[#FFC2D1] rounded-3xl p-6 space-y-4 shadow-sm">
        
        <div className="flex items-center justify-between font-sans text-xs text-[#6E5762] border-b border-[#FFC2D1] pb-3">
          <span className="font-bold text-[#3A2D32]">USER MANUAL & FAQ DIRECTORY ({filteredFaqs.length} QUESTIONS)</span>
          <span className="text-[#52B788] font-bold flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5 text-[#52B788]" />
            <span>100% VERIFIED DOCUMENT</span>
          </span>
        </div>

        {filteredFaqs.length === 0 ? (
          <div className="p-12 text-center text-[#8F727D] space-y-2">
            <Search className="w-8 h-8 text-[#FFB3C6] mx-auto opacity-50" />
            <p className="font-sans text-xs font-bold text-[#3A2D32]">
              No FAQ questions match your search filter.
            </p>
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
                  className={`bg-[#FFF8FA] border-l-4 ${borderStyle} border-t border-r border-b border-[#FFC2D1] rounded-2xl overflow-hidden transition-all shadow-xs`}
                >
                  {/* Accordion Question Header (Click to Toggle) */}
                  <button
                    onClick={() => toggleAccordion(faq.id)}
                    className="w-full p-5 text-left flex items-start justify-between gap-4 hover:bg-[#FFF0F5] transition-colors group cursor-pointer"
                  >
                    <div className="space-y-1">
                      <span className={`font-sans text-[10px] uppercase px-2.5 py-0.5 rounded-full border ${tagStyle} font-bold inline-block mb-1`}>
                        {getCategoryLabel(faq.category)}
                      </span>
                      <h3 className="font-serif-editorial text-base sm:text-lg font-bold text-[#3A2D32] group-hover:text-[#FF4D6D] transition-colors leading-snug">
                        {faq.question}
                      </h3>
                    </div>

                    <div className="p-1.5 bg-white border border-[#FFC2D1] rounded-full shrink-0 mt-1 shadow-2xs">
                      {isOpen ? (
                        <ChevronUp className="w-4 h-4 text-[#FF4D6D]" />
                      ) : (
                        <ChevronDown className="w-4 h-4 text-[#8F727D] group-hover:text-[#FF4D6D]" />
                      )}
                    </div>
                  </button>

                  {/* Accordion Answer Content (Collapsible Body) */}
                  {isOpen && (
                    <div className="px-5 pb-5 pt-3 border-t border-[#FFD6E0] bg-white space-y-3 font-sans text-xs text-[#6E5762] leading-relaxed">
                      <div className="whitespace-pre-line leading-relaxed text-[#3A2D32] font-medium">
                        {faq.answer}
                      </div>
                      
                      {faq.sourceNote && (
                        <div className="pt-2 border-t border-[#FFD6E0] font-sans text-[11px] text-[#8F727D] flex items-center justify-between">
                          <span>Source: <strong className="text-[#3A2D32] font-bold">{faq.sourceNote}</strong></span>
                          <span className="text-[#52B788] font-bold">Official Sync</span>
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
