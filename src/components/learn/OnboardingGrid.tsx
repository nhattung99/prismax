import React, { useState } from 'react';
import {
  BookOpen, AlertTriangle, ArrowRight, ShieldAlert, Sparkles, X, Info, Clock,
  Layers, Shapes, Eye, Building2, Gamepad2, CheckSquare, Award, Coins,
  CircleDollarSign, Globe, Bot, ShieldCheck, Heart
} from 'lucide-react';
import type { OnboardingTopic, TopicCategory } from '../../types/learn';
import { ONBOARDING_TOPICS } from '../../data/learnContent';

interface OnboardingGridProps {
  searchQuery: string;
}

export const OnboardingGrid: React.FC<OnboardingGridProps> = ({ searchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<TopicCategory | 'all'>('all');
  const [activeTopic, setActiveTopic] = useState<OnboardingTopic | null>(null);

  const categories: { id: TopicCategory | 'all'; label: string; icon: string }[] = [
    { id: 'all', label: 'All Modules (12)', icon: '✨' },
    { id: 'core', label: 'Core Concepts', icon: '🌱' },
    { id: 'teleop', label: 'Teleop & Quality', icon: '⚡' },
    { id: 'tokens', label: 'Tokens & Rewards', icon: '🎁' },
    { id: 'hardware', label: 'Hardware & Fleet', icon: '🤖' }
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
      case 'core': return 'border-l-[#52B788]';
      case 'teleop': return 'border-l-[#FF6B8B]';
      case 'tokens': return 'border-l-[#FFB703]';
      case 'hardware': return 'border-l-[#FF6B8B]';
    }
  };

  const getTagStyle = (category: TopicCategory) => {
    switch (category) {
      case 'core': return 'bg-[#52B788]/15 text-[#2D6A4F] border-[#52B788]/40';
      case 'teleop': return 'bg-[#FF6B8B]/15 text-[#E0527F] border-[#FF6B8B]/40';
      case 'tokens': return 'bg-[#FFB703]/20 text-[#B58200] border-[#FFB703]/40';
      case 'hardware': return 'bg-[#FF6B8B]/15 text-[#E0527F] border-[#FF6B8B]/40';
    }
  };

  const getTopicIcon = (topicId: string) => {
    switch (topicId) {
      case 'what-is-prismax': return <Layers className="w-4 h-4 text-[#52B788]" />;
      case 'three-pillars': return <Shapes className="w-4 h-4 text-[#52B788]" />;
      case 'vla': return <Eye className="w-4 h-4 text-[#52B788]" />;
      case 'vla-foundry': return <Building2 className="w-4 h-4 text-[#52B788]" />;
      case 'teleoperation': return <Gamepad2 className="w-4 h-4 text-[#FF6B8B]" />;
      case 'verify-quality': return <CheckSquare className="w-4 h-4 text-[#FF6B8B]" />;
      case 'the-first-100': return <Award className="w-4 h-4 text-[#FF6B8B]" />;
      case 'prisma-points': return <Coins className="w-4 h-4 text-[#FFB703]" />;
      case 'pix-token': return <CircleDollarSign className="w-4 h-4 text-[#FFB703]" />;
      case 'gateway': return <Globe className="w-4 h-4 text-[#FF6B8B]" />;
      case 'robot-fleet': return <Bot className="w-4 h-4 text-[#FF6B8B]" />;
      case 'membership-tiers': return <ShieldCheck className="w-4 h-4 text-[#FF6B8B]" />;
      default: return <BookOpen className="w-4 h-4 text-[#FF6B8B]" />;
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header & Filter Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-white border-2 border-[#FFC2D1] rounded-2xl p-4 shadow-sm">
        <div>
          <h2 className="text-xl font-bold font-serif-editorial text-[#3A2D32] flex items-center gap-2">
            <BookOpen className="w-5 h-5 text-[#FF6B8B]" />
            <span>Onboarding 101 — Curriculum</span>
            <Heart className="w-4 h-4 text-[#FF4D6D] fill-[#FF4D6D]" />
          </h2>
          <p className="font-sans text-xs text-[#6E5762] mt-0.5 font-medium">
            Core modules to master physical AI infrastructure, teleoperation, and VLA datasets
          </p>
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap items-center gap-1.5 bg-[#FFF0F5] p-1.5 rounded-full border border-[#FFC2D1]">
          {categories.map((c) => {
            const isActive = selectedCategory === c.id;
            return (
              <button
                key={c.id}
                onClick={() => setSelectedCategory(c.id)}
                className={`font-sans text-xs px-3.5 py-1.5 rounded-full transition-all font-bold flex items-center gap-1.5 ${
                  isActive
                    ? 'bg-[#FF4D6D] text-white shadow-sm'
                    : 'text-[#6E5762] hover:text-[#FF4D6D] hover:bg-white'
                }`}
              >
                <span>{c.icon}</span>
                <span>{c.label}</span>
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

          return (
            <div
              key={topic.id}
              onClick={() => setActiveTopic(topic)}
              className={`bg-white p-6 border-l-4 ${borderColor} border-t border-r border-b border-[#FFC2D1] rounded-2xl flex flex-col justify-between hover:bg-[#FFF5F8] transition-all group cursor-pointer relative overflow-hidden shadow-md shadow-pink-100/40 hover:shadow-lg hover:shadow-pink-200/50`}
            >
              <div>
                {/* Module Tag Pill & Concept Icon */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`font-sans text-xs px-3 py-1 rounded-full border ${tagStyle} font-bold flex items-center gap-1.5 shadow-2xs`}>
                    {getTopicIcon(topic.id)}
                    <span>MODULE {String(topic.number).padStart(2, '0')}</span>
                  </span>

                  <span className="font-label-mono text-[11px] text-[#9E838F] uppercase tracking-wider font-semibold">
                    {topic.category}
                  </span>
                </div>

                {/* Title & Subtitle */}
                <h3 className="font-headline-md text-xl font-bold font-serif-editorial text-[#3A2D32] group-hover:text-[#FF4D6D] transition-colors mb-1">
                  {topic.title}
                </h3>
                <p className="font-sans text-xs text-[#FF6B8B] font-bold mb-3">
                  {topic.subtitle}
                </p>

                {/* Definition Snippet */}
                <p className="font-sans text-xs text-[#6E5762] line-clamp-3 leading-relaxed">
                  {topic.definition}
                </p>

                {/* Unannounced Notice Warning Indicator */}
                {topic.unannouncedWarning && (
                  <div className="mt-3 p-2.5 rounded-xl bg-amber-500/10 border border-amber-400/30 text-amber-700 font-sans text-[11px] flex items-center gap-1.5 font-bold">
                    <AlertTriangle className="w-3.5 h-3.5 shrink-0 text-amber-500" />
                    <span className="truncate">Unannounced Notice</span>
                  </div>
                )}
              </div>

              {/* Bottom Card Footer */}
              <div className="mt-6 pt-4 border-t border-[#FFD6E0] flex items-center justify-between font-sans text-xs text-[#3A2D32]">
                <div className="flex items-center gap-1.5 text-[#9E838F] font-semibold">
                  <Clock className="w-3.5 h-3.5 text-[#9E838F]" />
                  <span>REF #{topic.number}</span>
                </div>

                <span className="text-[#FF4D6D] font-extrabold flex items-center gap-1 group-hover:translate-x-1 transition-transform">
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="bg-white border-l-4 border-l-[#FF6B8B] border-2 border-[#FFC2D1] rounded-3xl w-full max-w-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col">
            
            {/* Modal Header */}
            <div className="px-6 py-5 border-b border-[#FFC2D1] bg-[#FFF5F8] flex items-start justify-between gap-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-sans text-xs px-3 py-0.5 bg-[#FF4D6D]/15 text-[#FF4D6D] border border-[#FF4D6D]/30 rounded-full font-bold">
                    MODULE {String(activeTopic.number).padStart(2, '0')}
                  </span>
                  <span className="font-label-mono text-xs text-[#8F727D] uppercase font-semibold">
                    {activeTopic.category}
                  </span>
                </div>

                <h2 className="text-2xl font-bold font-serif-editorial text-[#3A2D32]">
                  {activeTopic.title}
                </h2>
                <p className="text-xs text-[#FF4D6D] font-bold mt-0.5">
                  {activeTopic.subtitle}
                </p>
              </div>

              <button
                onClick={() => setActiveTopic(null)}
                className="p-1.5 text-[#8F727D] hover:text-[#FF4D6D] rounded-full hover:bg-[#FFEBF0] transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto space-y-6 text-xs text-[#6E5762] leading-relaxed font-sans">
              
              {/* Definition */}
              <div className="space-y-2">
                <h3 className="font-sans text-xs font-bold text-[#8F727D] uppercase tracking-wider flex items-center gap-1.5">
                  <Info className="w-4 h-4 text-[#FF4D6D]" />
                  <span>Official Specification & Definition</span>
                </h3>
                <div className="p-4 bg-[#FFF5F8] border border-[#FFC2D1] rounded-2xl text-[#3A2D32] text-xs leading-relaxed font-medium">
                  {activeTopic.definition}
                </div>
              </div>

              {/* Why It Matters */}
              <div className="space-y-2">
                <h3 className="font-sans text-xs font-bold text-[#8F727D] uppercase tracking-wider flex items-center gap-1.5">
                  <Sparkles className="w-4 h-4 text-[#52B788]" />
                  <span>Strategic Importance</span>
                </h3>
                <div className="p-4 bg-emerald-50/60 border border-emerald-200 rounded-2xl text-[#2D6A4F] text-xs leading-relaxed font-medium">
                  {activeTopic.whyItMatters}
                </div>
              </div>

              {/* Unannounced Notice Warning */}
              {activeTopic.unannouncedWarning && (
                <div className="p-4 bg-amber-500/10 border border-amber-400/30 rounded-2xl space-y-1">
                  <div className="flex items-center gap-2 text-amber-700 font-bold font-sans text-xs">
                    <ShieldAlert className="w-4 h-4 shrink-0 text-amber-600" />
                    <span>Unannounced Specifications Notice</span>
                  </div>
                  <p className="text-xs text-amber-800 leading-relaxed font-sans">
                    {activeTopic.unannouncedWarning}
                  </p>
                </div>
              )}

              {/* Source Citation */}
              <div className="pt-3 border-t border-[#FFC2D1] flex items-center justify-between font-sans text-xs text-[#8F727D]">
                <span>Verified Source: <strong className="text-[#3A2D32]">{activeTopic.source}</strong></span>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="px-6 py-4 bg-[#FFF5F8] border-t border-[#FFC2D1] flex justify-end">
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
