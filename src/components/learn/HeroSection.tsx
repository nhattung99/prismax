import React from 'react';
import { ArrowRight, Sparkles, Bot, Database, Brain, Heart, Star } from 'lucide-react';

interface HeroSectionProps {
  onExploreModules: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({ onExploreModules }) => {
  return (
    <section className="relative py-12 px-4 md:px-8 max-w-7xl mx-auto w-full flex flex-col items-center justify-center text-center hero-pattern border-2 border-[#FFC2D1] rounded-3xl mb-8 overflow-hidden shadow-xl shadow-pink-100/70">
      
      {/* Background Ambient Glow */}
      <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-96 h-96 bg-[#FFB3C6]/20 blur-3xl rounded-full pointer-events-none -z-10" />

      {/* Hero Content Grid: Left Text, Right Cute Robot Showcase Image */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center w-full max-w-6xl mb-10">
        
        {/* Text Area */}
        <div className="lg:col-span-7 text-left space-y-5">
          <span className="font-sans text-xs px-3.5 py-1.5 bg-white text-[#FF4D6D] border border-[#FFC2D1] rounded-full inline-flex items-center gap-1.5 font-bold shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-[#FF6B8B]" />
            <span>PrismaX Physical AI Infrastructure</span>
            <Heart className="w-3.5 h-3.5 text-[#FF4D6D] fill-[#FF4D6D]" />
          </span>

          <h1 className="font-display-lg text-3xl sm:text-4xl lg:text-5xl font-bold font-serif-editorial text-[#3A2D32] tracking-tight leading-tight">
            Master Industrial Robotics & Web3
          </h1>

          <p className="font-body-lg text-sm sm:text-base text-[#6E5762] leading-relaxed font-sans max-w-xl">
            A cute & comprehensive curriculum designed for engineers, researchers, and operators navigating autonomous systems, VLA foundation models, and decentralized robotics.
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
              <Star className="w-4 h-4 text-[#FF758F] fill-[#FF758F]" />
              <span>OPERATE REAL ROBOTS</span>
            </a>
          </div>
        </div>

        {/* Hero Featured Cute Robot Showcase Image */}
        <div className="lg:col-span-5 relative group flex items-center justify-center">
          <div className="relative rounded-3xl overflow-hidden border-2 border-[#FFC2D1] bg-white shadow-2xl hover:border-[#FF758F] transition-all p-2">
            <img
              src="/images/robot_robopay.png"
              alt="PrismaX RoboPay Humanoid Robot"
              className="w-full h-auto object-cover max-h-[300px] rounded-2xl group-hover:scale-105 transition-transform duration-500"
            />
            
            {/* Cute Sticker Overlay */}
            <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-md px-3 py-1 rounded-full border border-[#FFC2D1] shadow-md flex items-center gap-1 font-sans text-xs font-bold text-[#FF4D6D]">
              <Heart className="w-3.5 h-3.5 fill-[#FF4D6D]" />
              <span>Cute VLA Robot</span>
            </div>

            <div className="p-3 bg-[#FFF5F8] rounded-xl mt-2 flex items-center justify-between font-sans text-xs border border-[#FFD6E0]">
              <span className="text-[#3A2D32] font-bold">PrismaX RoboPay Humanoid</span>
              <span className="px-2.5 py-0.5 rounded-full bg-[#FF758F]/20 text-[#FF4D6D] border border-[#FF758F]/40 font-extrabold">VLA Validated</span>
            </div>
          </div>
        </div>

      </div>

      {/* 3 Pillar Diagram Grid with Clean Glowing Category Icons */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full max-w-6xl mt-4 relative">
        
        {/* Desktop Connector Line */}
        <div className="hidden md:block absolute top-1/2 left-[12%] right-[12%] h-0.5 bg-[#FFC2D1] -z-10" />

        {/* Pillar 1: Robotics */}
        <div className="bg-white p-6 border-l-4 border-l-[#FF6B8B] border-t border-r border-b border-[#FFC2D1] rounded-2xl flex flex-col items-center text-center group hover:bg-[#FFF5F8] transition-all relative overflow-hidden shadow-md shadow-pink-100/50">
          <div className="w-16 h-16 rounded-2xl mb-4 border-2 border-[#FF6B8B]/40 bg-[#FF6B8B]/15 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-pink-200/50">
            <Bot className="w-8 h-8 text-[#FF6B8B]" />
          </div>
          <h3 className="font-headline-md text-xl font-bold font-serif-editorial text-[#3A2D32] mb-2">
            Robotics
          </h3>
          <p className="font-body-md text-xs text-[#6E5762] leading-relaxed font-sans">
            Hardware interfacing, physical kinematics, remote teleoperation & execution layers.
          </p>
        </div>

        {/* Pillar 2: Data */}
        <div className="bg-white p-6 border-l-4 border-l-[#52B788] border-t border-r border-b border-[#FFC2D1] rounded-2xl flex flex-col items-center text-center group hover:bg-[#FFF5F8] transition-all relative overflow-hidden shadow-md shadow-pink-100/50">
          <div className="w-16 h-16 rounded-2xl mb-4 border-2 border-[#52B788]/40 bg-[#52B788]/15 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-emerald-200/50">
            <Database className="w-8 h-8 text-[#52B788]" />
          </div>
          <h3 className="font-headline-md text-xl font-bold font-serif-editorial text-[#3A2D32] mb-2">
            Data
          </h3>
          <p className="font-body-md text-xs text-[#6E5762] leading-relaxed font-sans">
            Telemetry streaming, MCAP episode logging, Verify Quality consensus & VLA Foundry datasets.
          </p>
        </div>

        {/* Pillar 3: Intelligence */}
        <div className="bg-white p-6 border-l-4 border-l-[#FFB703] border-t border-r border-b border-[#FFC2D1] rounded-2xl flex flex-col items-center text-center group hover:bg-[#FFF5F8] transition-all relative overflow-hidden shadow-md shadow-pink-100/50">
          <div className="w-16 h-16 rounded-2xl mb-4 border-2 border-[#FFB703]/40 bg-[#FFB703]/15 flex items-center justify-center group-hover:scale-110 transition-transform shadow-md shadow-amber-200/50">
            <Brain className="w-8 h-8 text-[#FFB703]" />
          </div>
          <h3 className="font-headline-md text-xl font-bold font-serif-editorial text-[#3A2D32] mb-2">
            Intelligence
          </h3>
          <p className="font-body-md text-xs text-[#6E5762] leading-relaxed font-sans">
            Multimodal VLA foundation models, edge decision execution & closed-loop benchmark feedback.
          </p>
        </div>

      </div>

    </section>
  );
};
