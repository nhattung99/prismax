import React, { useState } from 'react';
import { BookOpen, AlertTriangle, ArrowRight, ShieldAlert, Sparkles, X, Info, Clock } from 'lucide-react';
import type { OnboardingTopic, TopicCategory } from '../../types/learn';
import { ONBOARDING_TOPICS } from '../../data/learnContent';

interface OnboardingGridProps {
  searchQuery: string;
}

export const OnboardingGrid: React.FC<OnboardingGridProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory | 'all'>('all');
  const [activeTopic, setActiveTopic] = useState<OnboardingTopic | null>(null);

  const categories: { id: TopicCategory | 'all'; label: string }[] = [
    { id: 'all', label: 'All Modules (12)' },
    { id: 'core', label: 'Core Concepts' },
    { id: 'teleop', label: 'Teleop & Quality' },
    { id: 'tokens', label: 'Tokens & Rewards' },
    { id: 'hardware', label: 'Hardware & Fleet' }
  ];

  const filteredTopics = ONBOARDING_TOPICS.filter((topic) => {
    const matchesCategory = selectedCategory === 'all' || topic.category === selectedCategory;
    const matchesSearch =
      topic.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      topic.definition.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  const getBorderColor = (category: TopicCategory) => {
    switch (category) {
      case 'core': return 'border-l-[#7CB88F]';
      case 'teleop': return 'border-l-[#B87A4F]';
      case 'tokens': return 'border-l-[#D9A45C]';
      case 'hardware': return 'border-l-[#9B6B9E]';
    }
  };

  const getTagStyle = (category: TopicCategory) => {
    switch (category) {
      case 'core': return 'bg-[#7CB88F]/15 text-[#7CB88F] border-[#7CB88F]/30';
      case 'teleop': return 'bg-[#B87A4F]/15 text-[#B87A4F] border-[#B87A4F]/30';
      case 'tokens': return 'bg-[#D9A45C]/15 text-[#D9A45C] border-[#D9A45C]/30';
      case 'hardware': return 'bg-[#9B6B9E]/15 text-[#9B6B9E] border-[#9B6B9E]/30';
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#1C1C1C] border border-[#4B463F] rounded-md p-4">
        <div>
          <h2 className="text-xl font-bold font-serif-editorial text-[#FCF4EC] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#B87A4F]" />
            <span>Onboarding 101 — Curriculum</span>
          </h2>
          <p className="font-body-md text-xs text-[#CDC5BC] mt-0.5">
            Core modules to master physical AI infrastructure, teleoperation, and VLA datasets
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#131313] p-1 rounded border border-[#4B463F]">
          {categories.map((c) => {
            const isActive = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`font-label-mono text-xs px-3 py-1.5 rounded transition-all ${
                  isActive
                    ? 'bg-[#DFD8D0] text-[#131313] font-bold'
                    : 'text-[#CDC5BC] hover:text-[#FCF4EC] hover:bg-[#202020]'
                }`}
              >
                {c.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Grid of 12 Module Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredTopics.map((topic) => {
          const borderColor = getBorderColor(topic.category);
          const tagStyle = getTagStyle(topic.category);

          // Assign robot avatar thumbnail per category
          const robotThumb =
            topic.category === 'teleop'
              ? '/images/robot_torso.png'
              : topic.category === 'hardware'
              ? '/images/robot_quadruped.png'
              : topic.category === 'tokens'
              ? '/images/robot_cat.png'
              : '/images/robot_humanoid.png';

          return (
            <div
              key={topic.id}
              onClick={() => setActiveTopic(topic)}
              className={`bg-[#202020] p-6 border-l-4 ${borderColor} border-t border-r border-b border-[#4B463F] rounded-md flex flex-col justify-between hover:bg-[#262626] transition-all group cursor-pointer relative overflow-hidden`}
            >
              <div>
                {/* Module Tag Pill & Robot Thumbnail Avatar */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-label-tag text-xs px-2.5 py-1 rounded border ${tagStyle} font-semibold`}>
                    MODULE {String(topic.number).padStart(2, '0')}
                  </span>

                  <div className="flex items-center gap-2">
                    <img src={robotThumb} alt="Robot Avatar" className="w-8 h-8 rounded-full bg-[#131313] p-0.5 border border-[#4B463F] object-contain" />
                    <span className="font-label-mono text-[11px] text-[#969087] uppercase tracking-wider">
                      {topic.category}
                    </span>
                  </div>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-headline-md text-xl font-bold font-serif-editorial text-[#FCF4EC] group-hover:text-[#B87A4F] transition-colors mb-1">
                  {topic.title}
                </h3>
                <p className="font-body-md text-xs text-[#B87A4F] font-medium mb-3">
                  {topic.subtitle}
                </p>

                {/* Definition Snippet */}
                <p className="font-body-md text-xs text-[#CDC5BC] line-clamp-3 leading-relaxed">
                  {topic.definition}
                </p>

                {/* Unannounced Notice Warning Indicator */}
                {topic.unannouncedWarning && (
                  <div className="mt-3 p-2 rounded bg-amber-500/10 border border-amber-500/25 text-amber-400 font-label-mono text-[11px] flex items-center gap-1.5 font-medium">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-400" />
                    <span className="truncate">Unannounced Notice</span>
                  </div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-[#4B463F] flex items-center justify-between font-label-mono text-xs text-[#FCF4EC]">
                <div className="flex items-center gap-1.5 text-[#969087]">
                  <Clock className="w-3.5 h-3.5 text-[#969087]" />
                  <span>REF #{topic.number}</span>
                </div>

                <span className="text-[#B87A4F] font-semibold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                  <span>READ MODULE</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </span>
              </div>

            </div>
          );
        })}
      </div>

      {/* Slide-over Detail Drawer Modal */}
      {activeTopic && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fade-in">
          <div className="bg-[#202020] border-l-4 border-l-[#B87A4F] border-t border-r border-b border-[#4B463F] rounded-md w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#4B463F] bg-[#1C1C1C] flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-label-tag text-xs px-2.5 py-0.5 bg-[#B87A4F]/20 text-[#B87A4F] border border-[#B87A4F]/40 rounded font-semibold">
                    MODULE {String(activeTopic.number).padStart(2, '0')}
                  </span>
                  <span className="font-label-mono text-xs text-[#969087] uppercase">
                    {activeTopic.category}
                  </span>
                </div>

                <h2 className="text-2xl font-bold font-serif-editorial text-[#FCF4EC]">
                  {activeTopic.title}
                </h2>
                <p className="text-xs text-[#B87A4F] font-medium mt-0.5">
                  {activeTopic.subtitle}
                </p>
              </div>

              <button
                onClick={() => setActiveTopic(null)}
                className="p-1.5 text-[#969087] hover:text-[#FCF4EC] rounded hover:bg-[#262626] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#CDC5BC] leading-relaxed">
              
              {/* Definition */}
              <div className="space-y-2">
                <h3 className="font-label-mono text-xs font-semibold text-[#969087] uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#B87A4F]" />
                  <span>Official Specification & Definition</span>
                </h3>
                <div className="p-4 bg-[#131313] border border-[#4B463F] rounded text-[#FCF4EC] text-xs leading-relaxed">
                  {activeTopic.definition}
                </div>
              </div>

              {/* Why It Matters */}
              <div className="space-y-2">
                <h3 className="font-label-mono text-xs font-semibold text-[#969087] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#7CB88F]" />
                  <span>Strategic Importance</span>
                </h3>
                <div className="p-4 bg-[#131313] border border-[#7CB88F]/30 rounded text-[#CDC5BC] text-xs leading-relaxed">
                  {activeTopic.whyItMatters}
                </div>
              </div>

              {/* Unannounced Notice Warning */}
              {activeTopic.unannouncedWarning && (
                <div className="p-4 bg-amber-500/10 border border-amber-500/30 rounded space-y-1">
                  <div className="flex items-center gap-2 text-amber-400 font-semibold font-label-mono text-xs">
                    <ShieldAlert className="w-4 h-4 shrink-0" />
                    <span>Unannounced Specifications Notice</span>
                  </div>
                  <p className="text-xs text-amber-200/90 leading-relaxed font-sans">
                    {activeTopic.unannouncedWarning}
                  </p>
                </div>
              )}

              {/* Source Citation */}
              <div className="pt-3 border-t border-[#4B463F] flex items-center justify-between font-label-mono text-xs text-[#969087]">
                <span>Verified Source: <strong className="text-[#FCF4EC]">{activeTopic.source}</strong></span>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#1C1C1C] border-t border-[#4B463F] flex justify-end">
              <button
                onClick={() => setActiveTopic(null)}
                className="btn-editorial-primary"
              >
                CLOSE MODULE
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
