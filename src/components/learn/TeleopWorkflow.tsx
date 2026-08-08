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
  Server
} from 'lucide-react';
import type { ProcessActor } from '../../types/learn';
import { TELEOP_STEPS } from '../../data/learnContent';

export const TeleopWorkflow: React.FC = () => {
  const [activeStepIndex, setActiveStepIndex] = useState<number>(0);

  const getActorBadge = (actor: ProcessActor) => {
    switch (actor) {
      case 'Operator':
        return {
          color: 'bg-[#B87A4F]/15 text-[#B87A4F] border-[#B87A4F]/30',
          icon: <User className="w-3 h-3" />
        };
      case 'Validator':
        return {
          color: 'bg-[#7CB88F]/15 text-[#7CB88F] border-[#7CB88F]/30',
          icon: <ShieldCheck className="w-3 h-3" />
        };
      case 'PrismaX Engine':
        return {
          color: 'bg-[#D9A45C]/15 text-[#D9A45C] border-[#D9A45C]/30',
          icon: <Server className="w-3 h-3" />
        };
      case 'AI Model':
        return {
          color: 'bg-blue-500/15 text-blue-300 border-blue-500/30',
          icon: <Cpu className="w-3 h-3" />
        };
    }
  };

  const getStepIcon = (name: string) => {
    switch (name) {
      case 'Bot': return <Bot className="w-5 h-5" />;
      case 'Globe': return <Globe className="w-5 h-5" />;
      case 'Video': return <Video className="w-5 h-5" />;
      case 'Upload': return <Upload className="w-5 h-5" />;
      case 'CheckSquare': return <CheckSquare className="w-5 h-5" />;
      case 'Award': return <Award className="w-5 h-5" />;
      case 'Database': return <Database className="w-5 h-5" />;
      case 'Sparkles': return <Sparkles className="w-5 h-5" />;
      case 'Cpu': return <Cpu className="w-5 h-5" />;
      default: return <Zap className="w-5 h-5" />;
    }
  };

  const currentStep = TELEOP_STEPS[activeStepIndex];
  const actorBadge = getActorBadge(currentStep.actor);

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="bg-[#1C1C1C] border border-[#4B463F] rounded-md p-5">
        <h2 className="text-xl font-bold font-serif-editorial text-[#FCF4EC] flex items-center gap-2">
          <Zap className="w-5 h-5 text-[#B87A4F]" />
          <span>How Teleop Works — 9-Step Closed-Loop Pipeline</span>
        </h2>
        <p className="font-body-md text-xs text-[#CDC5BC] mt-1 leading-relaxed">
          From physical robot arm operation to community quality scoring, consensus aggregation, and VLA model training feedback.
        </p>
      </div>

      {/* Step Indicators */}
      <div className="bg-[#202020] p-6 border-l-4 border-l-[#B87A4F] border-t border-r border-b border-[#4B463F] rounded-md overflow-x-auto">
        <div className="flex items-center gap-2 min-w-[700px] justify-between relative">
          
          {/* Connector Line */}
          <div className="absolute top-5 left-6 right-6 h-0.5 bg-[#4B463F] -z-0" />

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
                  className={`w-10 h-10 rounded flex items-center justify-center font-bold text-xs font-label-mono transition-all ${
                    isActive
                      ? 'bg-[#DFD8D0] text-[#131313] font-bold shadow-md border-2 border-white/20 scale-110'
                      : isCompleted
                      ? 'bg-[#7CB88F]/20 text-[#7CB88F] border border-[#7CB88F]/40'
                      : 'bg-[#131313] text-[#969087] border border-[#4B463F] group-hover:border-[#DFD8D0]'
                  }`}
                >
                  {s.step}
                </div>
                <span className={`font-label-mono text-[11px] font-medium max-w-[80px] text-center truncate ${
                  isActive ? 'text-[#B87A4F]' : 'text-[#969087]'
                }`}>
                  {s.title.split(' ')[0]}...
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Step Showcase Card */}
      <div className="bg-[#202020] border-l-4 border-l-[#B87A4F] border-t border-r border-b border-[#4B463F] rounded-md p-6 grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">
        
        <div className="lg:col-span-2 space-y-4">
          <div className="flex items-center gap-3">
            <span className="w-10 h-10 rounded bg-[#B87A4F]/20 text-[#B87A4F] border border-[#B87A4F]/40 flex items-center justify-center font-label-mono font-bold text-sm">
              STEP 0{currentStep.step}
            </span>

            <div>
              <div className="flex items-center gap-2">
                <span className={`font-label-tag text-[10px] uppercase px-2.5 py-0.5 rounded border flex items-center gap-1.5 ${actorBadge.color}`}>
                  {actorBadge.icon}
                  <span>Actor: {currentStep.actor}</span>
                </span>
              </div>
              <h3 className="text-xl font-bold font-serif-editorial text-[#FCF4EC] mt-1">
                {currentStep.title}
              </h3>
            </div>
          </div>

          <p className="font-body-md text-xs text-[#CDC5BC] leading-relaxed bg-[#131313] p-4 rounded border border-[#4B463F]">
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

            <span className="font-label-mono text-xs text-[#969087]">
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
        <div className="bg-[#1C1C1C] border border-[#4B463F] rounded-md p-6 text-center space-y-3 flex flex-col items-center justify-center h-full">
          <div className="w-16 h-16 rounded-full bg-[#B87A4F]/20 text-[#B87A4F] border border-[#B87A4F]/40 flex items-center justify-center">
            {getStepIcon(currentStep.iconName)}
          </div>
          <div>
            <h4 className="font-headline-md text-sm font-bold text-[#FCF4EC]">{currentStep.title}</h4>
            <p className="font-label-mono text-xs text-[#969087] mt-1">Pipeline Stage 0{currentStep.step}</p>
          </div>
        </div>

      </div>

    </div>
  );
};
