import React from 'react';
import { ArrowRight, Sparkles } from 'lucide-react';

interface HeroSectionProps {
  onExploreModules: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreModules }) => {
  return (
    <section className="relative py-12 px-4 md:px-8 max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center hero-pattern border-b border-[#4B463F] rounded-2xl mb-8 overflow-hidden">
      
      {/* Background Ambient Glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#B87A4F]/10 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Hero Content Grid: Left Text, Right Robot Showcase Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl mb-10">
        
        {/* Text Area */}
        <div className="lg:col-span-7 text-left space-y-5">
          <span className="font-label-mono text-xs px-3 py-1 bg-[#202020] text-[#B87A4F] border border-[#B87A4F]/30 rounded inline-flex items-center gap-1.5 tracking-wider uppercase">
            <Sparkles className="w-3.5 h-3.5" />
            <span>PrismaX Physical AI Infrastructure</span>
          </span>

          <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-editorial text-[#FCF4EC] tracking-tight leading-tight">
            Master Industrial Robotics & Web3
          </h1>

          <p className="font-body-lg text-sm sm:text-base text-[#CDC5BC] leading-relaxed font-sans max-w-xl">
            A comprehensive curriculum designed for engineers, researchers, and operators navigating the convergence of autonomous systems, VLA foundation models, and decentralized robotics.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={onExploreModules}
              className="btn-editorial-primary flex items-center gap-2"
            >
              <span>EXPLORE MODULES</span>
              <ArrowRight className="w-4 h-4" />
            </button>

            <a
              href="https://gateway.prismax.ai"
              target="_blank"
              rel="noreferrer"
              className="btn-editorial-secondary flex items-center gap-2"
            >
              <span>OPERATE REAL ROBOTS</span>
            </a>
          </div>
        </div>

        {/* Hero Featured Robot Showcase Image */}
        <div className="lg:col-span-5 relative group flex items-center justify-center">
          <div className="relative rounded-2xl overflow-hidden border border-[#4B463F] bg-[#202020] shadow-2xl hover:border-[#B87A4F] transition-all">
            <img
              src="/images/robot_robopay.png"
              alt="PrismaX RoboPay Humanoid Robot"
              className="w-full h-auto object-cover max-h-[320px] rounded-2xl group-hover:scale-105 transition-transform duration-500"
            />
            <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-[#131313] via-[#131313]/80 to-transparent flex items-center justify-between font-label-mono text-xs">
              <span className="text-[#FCF4EC] font-semibold">PrismaX RoboPay Humanoid</span>
              <span className="px-2 py-0.5 rounded bg-[#B87A4F]/20 text-[#B87A4F] border border-[#B87A4F]/40">VLA Validated</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3 Pillar Diagram Grid with Real Robot Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-4 relative">
        
        {/* Desktop Connector Line */}
        <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] h-px bg-[#4B463F] -z-10" />

        {/* Pillar 1: Robotics */}
        <div className="bg-[#202020] p-6 border-l-4 border-l-[#B87A4F] border-t border-r border-b border-[#4B463F] rounded-md flex flex-col items-center text-center group hover:bg-[#262626] transition-all relative overflow-hidden">
          <div className="w-20 h-20 rounded-xl overflow-hidden mb-4 border border-[#B87A4F]/40 bg-[#B87A4F]/15 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
            <img src="/images/robot_torso.png" alt="Robotics Hardware" className="w-full h-full object-contain" />
          </div>
          <h3 className="font-headline-md text-xl font-bold font-serif-editorial text-[#FCF4EC] mb-2">
            Robotics
          </h3>
          <p className="font-body-md text-xs text-[#CDC5BC] leading-relaxed">
            Hardware interfacing, physical kinematics, remote teleoperation & execution layers.
          </p>
        </div>

        {/* Pillar 2: Data */}
        <div className="bg-[#202020] p-6 border-l-4 border-l-[#7CB88F] border-t border-r border-b border-[#4B463F] rounded-md flex flex-col items-center text-center group hover:bg-[#262626] transition-all relative overflow-hidden">
          <div className="w-20 h-20 rounded-xl overflow-hidden mb-4 border border-[#7CB88F]/40 bg-[#7CB88F]/15 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
            <img src="/images/robot_quadruped.png" alt="Robot Telemetry Data" className="w-full h-full object-contain" />
          </div>
          <h3 className="font-headline-md text-xl font-bold font-serif-editorial text-[#FCF4EC] mb-2">
            Data
          </h3>
          <p className="font-body-md text-xs text-[#CDC5BC] leading-relaxed">
            Telemetry streaming, MCAP episode logging, Verify Quality consensus & VLA Foundry datasets.
          </p>
        </div>

        {/* Pillar 3: Intelligence */}
        <div className="bg-[#202020] p-6 border-l-4 border-l-[#D9A45C] border-t border-r border-b border-[#4B463F] rounded-md flex flex-col items-center text-center group hover:bg-[#262626] transition-all relative overflow-hidden">
          <div className="w-20 h-20 rounded-xl overflow-hidden mb-4 border border-[#D9A45C]/40 bg-[#D9A45C]/15 flex items-center justify-center p-1 group-hover:scale-105 transition-transform">
            <img src="/images/robot_humanoid.png" alt="Physical AI Intelligence" className="w-full h-full object-contain" />
          </div>
          <h3 className="font-headline-md text-xl font-bold font-serif-editorial text-[#FCF4EC] mb-2">
            Intelligence
          </h3>
          <p className="font-body-md text-xs text-[#CDC5BC] leading-relaxed">
            Multimodal VLA foundation models, edge decision execution & closed-loop benchmark feedback.
          </p>
        </div>

      </div>

    </section>
  );
};
