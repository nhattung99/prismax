import React, { useState } from 'react';
import {
  Zap,
  Bot,
  Globe,
  Video,
  Upload,
  CheckSquare,
  Award,
  Database,
  Sparkles,
  Cpu,
  ArrowRight,
  User,
  ShieldCheck,
  Server,
  Heart
} from 'lucide-react';
import type { ProcessActor } from '../../types/learn';
import { TELEOP_STEPS } from '../../data/learnContent';

export const TeleopWorkflow: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const getActorBadge = (actor: ProcessActor) => {
    switch (actor) {
      case 'Operator':
        return {
          color: 'bg-[#FF6B8B]/15 text-[#E0527F] border-[#FF6B8B]/40',
          icon: <User className="w-3 h-3 text-[#FF6B8B]" />
        };
      case 'Validator':
        return {
          color: 'bg-[#52B788]/15 text-[#2D6A4F] border-[#52B788]/40',
          icon: <ShieldCheck className="w-3 h-3 text-[#52B788]" />
        };
      case 'PrismaX Engine':
        return {
          color: 'bg-[#FFB703]/20 text-[#B58200] border-[#FFB703]/40',
          icon: <Server className="w-3 h-3 text-[#FFB703]" />
        };
      case 'AI Model':
        return {
          color: 'bg-[#B388FF]/20 text-[#7C4DFF] border-[#B388FF]/40',
          icon: <Cpu className="w-3 h-3 text-[#B388FF]" />
        };
    }
  };

  const getStepIcon = (name: string) => {
    switch (name) {
      case 'Bot': return <Bot className="w-5 h-5 text-[#FF6B8B]" />;
      case 'Globe': return <Globe className="w-5 h-5 text-[#FF6B8B]" />;
      case 'Video': return <Video className="w-5 h-5 text-[#FF6B8B]" />;
      case 'Upload': return <Upload className="w-5 h-5 text-[#FF6B8B]" />;
      case 'CheckSquare': return <CheckSquare className="w-5 h-5 text-[#FF6B8B]" />;
      case 'Award': return <Award className="w-5 h-5 text-[#FF6B8B]" />;
      case 'Database': return <Database className="w-5 h-5 text-[#52B788]" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5 text-[#FFB703]" />;
      case 'Cpu': return <Cpu className="w-5 h-5 text-[#B388FF]" />;
      default: return <Zap className="w-5 h-5 text-[#FF6B8B]" />;
    }
  };

  const currentStep = TELEOP_STEPS[activeStepIndex];
  const actorBadge = getActorBadge(currentStep.actor);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-white border-2 border-[#FFC2D1] rounded-3xl p-6 shadow-sm">
        <h2 className="text-xl sm:text-2xl font-bold font-serif-editorial text-[#3A2D32] flex items-center gap-2">
          <Zap className="w-6 h-6 text-[#FF6B8B]" />
          <span>How Teleop Works — 9-Step Closed-Loop Pipeline</span>
          <Heart className="w-4 h-4 text-[#FF4D6D] fill-[#FF4D6D]" />
        </h2>
        <p className="font-sans text-xs sm:text-sm text-[#6E5762] mt-1 leading-relaxed">
          From physical robot arm operation to community quality scoring, consensus aggregation, and VLA model training feedback.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="bg-white p-6 border-l-4 border-l-[#FF6B8B] border-2 border-[#FFC2D1] rounded-3xl overflow-x-auto shadow-sm">
        <div className="flex items-center gap-2 min-w-[700px] justify-between relative">
          
          {/* Connector Line */}
          <div className="absolute top-5 left-6 right-6 h-1 bg-[#FFD6E0] -z-0" />

          {TELEOP_STEPS.map((s, idx) => {
            const isActive = idx === activeStepIndex;
            const isCompleted = idx < activeStepIndex;

            return (
              <button
                key={s.step}
                onClick={() => setActiveStepIndex(idx)}
                className="flex flex-col items-center gap-2 group z-10 focus:outline-none"
              >
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-xs font-sans transition-all ${
                    isActive
                      ? 'bg-[#FF4D6D] text-white font-extrabold shadow-md shadow-pink-200 scale-110'
                      : isCompleted
                      ? 'bg-[#52B788]/20 text-[#2D6A4F] border-2 border-[#52B788]/50'
                      : 'bg-white text-[#8F727D] border-2 border-[#FFC2D1] group-hover:border-[#FF758F]'
                  }`}
                >
                  {s.step}
                </div>
                <span className={`font-sans text-[11px] font-bold max-w-[80px] text-center truncate ${
                  isActive ? 'text-[#FF4D6D]' : 'text-[#8F727D]'
                }`}>
                  {s.title.split(' ')[0]}...
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Showcase Card */}
      <div className="bg-white border-l-4 border-l-[#FF6B8B] border-2 border-[#FFC2D1] rounded-3xl p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center shadow-sm">
        
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded-2xl bg-[#FF4D6D]/15 text-[#FF4D6D] border border-[#FF4D6D]/30 flex items-center justify-center font-sans font-extrabold text-sm shadow-2xs">
              STEP 0{currentStep.step}
            </span>

            <div>
              <div className="flex items-center gap-2">
                <span className={`font-sans text-[10px] uppercase px-3 py-0.5 rounded-full border font-bold flex items-center gap-1.5 ${actorBadge.color}`}>
                  {actorBadge.icon}
                  <span>Actor: {currentStep.actor}</span>
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif-editorial text-[#3A2D32] mt-1">
                {currentStep.title}
              </h3>
            </div>
          </div>

          <p className="font-sans text-xs text-[#3A2D32] leading-relaxed bg-[#FFF5F8] p-4 rounded-2xl border border-[#FFC2D1] font-medium">
            {currentStep.description}
          </p>

          {/* Navigation Controls */}
          <div className="flex items-center justify-between pt-2">
            <button
              disabled={activeStepIndex === 0}
              onClick={() => setActiveStepIndex((p) => Math.max(0, p - 1))}
              className="btn-editorial-secondary disabled:opacity-40"
            >
              PREVIOUS STEP
            </button>

            <span className="font-sans text-xs font-bold text-[#8F727D]">
              STAGE {activeStepIndex + 1} OF {TELEOP_STEPS.length}
            </span>

            <button
              disabled={activeStepIndex === TELEOP_STEPS.length - 1}
              onClick={() => setActiveStepIndex((p) => Math.min(TELEOP_STEPS.length - 1, p + 1))}
              className="btn-editorial-primary flex items-center gap-1.5 disabled:opacity-40"
            >
              <span>NEXT STEP</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Visual Box */}
        <div className="bg-[#FFF5F8] border-2 border-[#FFC2D1] rounded-2xl p-6 text-center space-y-3 flex flex-col items-center justify-center h-full shadow-2xs">
          <div className="w-16 h-16 rounded-2xl bg-white text-[#FF6B8B] border border-[#FFC2D1] flex items-center justify-center shadow-sm">
            {getStepIcon(currentStep.iconName)}
          </div>
          <div>
            <h4 className="font-serif-editorial text-base font-bold text-[#3A2D32]">{currentStep.title}</h4>
            <p className="font-sans text-xs font-bold text-[#8F727D] mt-1">Pipeline Stage 0{currentStep.step}</p>
          </div>
        </div>

      </div>

    </div>
  );
};
