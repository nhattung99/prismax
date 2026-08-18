import { useState } from 'react';
import { Header, type LearnTab } from './components/learn/Header';
import { HeroSection } from './components/learn/HeroSection';
import { OnboardingGrid } from './components/learn/OnboardingGrid';
import { GlossaryView } from './components/learn/GlossaryView';
import { TeleopWorkflow } from './components/learn/TeleopWorkflow';
import { EcosystemMap } from './components/learn/EcosystemMap';
import { TimelineView } from './components/learn/TimelineView';
import { FaqView } from './components/learn/FaqView';
import { ExternalLink, Heart, Sparkles } from 'lucide-react';

export function App() {
  const [activeTab, setActiveTab] = useState<LearnTab>('onboarding');
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <div className="min-h-screen bg-[#FFF0F5] text-[#3A2D32] flex flex-col font-sans selection:bg-[#FF85A1] selection:text-white pt-16">
      
      {/* App Header Navigation Bar */}
      <Header
        activeTab={activeTab}
        onSelectTab={setActiveTab}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Main Knowledge Hub Body */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full space-y-8">
        
        {activeTab === 'onboarding' && (
          <>
            <HeroSection onExploreModules={() => {
              const element = document.getElementById('curriculum-grid');
              if (element) element.scrollIntoView({ behavior: 'smooth' });
            }} />
            <section id="curriculum-grid" className="bg-[#FFF8FA] p-6 sm:p-8 rounded-3xl border-2 border-[#FFC2D1] shadow-xl shadow-pink-100/60">
              <OnboardingGrid searchQuery={searchQuery} />
            </section>
          </>
        )}

        {activeTab === 'glossary' && (
          <section className="bg-[#FFF8FA] p-6 sm:p-8 rounded-3xl border-2 border-[#FFC2D1] shadow-xl shadow-pink-100/60">
            <GlossaryView searchQuery={searchQuery} />
          </section>
        )}

        {activeTab === 'workflow' && (
          <section className="bg-[#FFF8FA] p-6 sm:p-8 rounded-3xl border-2 border-[#FFC2D1] shadow-xl shadow-pink-100/60">
            <TeleopWorkflow />
          </section>
        )}

        {activeTab === 'ecosystem' && (
          <section className="bg-[#FFF8FA] p-6 sm:p-8 rounded-3xl border-2 border-[#FFC2D1] shadow-xl shadow-pink-100/60">
            <EcosystemMap searchQuery={searchQuery} />
          </section>
        )}

        {activeTab === 'timeline' && (
          <section className="bg-[#FFF8FA] p-6 sm:p-8 rounded-3xl border-2 border-[#FFC2D1] shadow-xl shadow-pink-100/60">
            <TimelineView searchQuery={searchQuery} />
          </section>
        )}

        {activeTab === 'faq' && (
          <section className="bg-[#FFF8FA] p-6 sm:p-8 rounded-3xl border-2 border-[#FFC2D1] shadow-xl shadow-pink-100/60">
            <FaqView searchQuery={searchQuery} />
          </section>
        )}

      </main>

      {/* Cute Pastel Footer */}
      <footer className="w-full py-8 px-4 md:px-8 bg-[#FFEBF0] border-t-2 border-[#FFC2D1] font-label-mono text-xs text-[#8F727D] mt-12">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-4">
          
          <div className="flex items-center gap-3">
            <div className="relative">
              <img src="/images/robot_cat.png" alt="PrismaX Cute Mascot" className="w-9 h-9 object-contain rounded-full bg-white p-1 border-2 border-[#FF758F] shadow-sm animate-bounce-slow" />
              <Heart className="w-3.5 h-3.5 text-[#FF4D6D] fill-[#FF4D6D] absolute -top-1 -right-1" />
            </div>
            <div className="flex items-center gap-2 font-sans">
              <span className="font-bold text-[#3A2D32] flex items-center gap-1 text-sm">
                <span>PrismaX Learn Engine</span>
                <Sparkles className="w-3.5 h-3.5 text-[#FF6B8B]" />
              </span>
              <span className="text-[#FFC2D1]">•</span>
              <span className="text-[#8F727D] font-medium">Cute Pastel Edition</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-4 font-sans">
            {/* Official Website */}
            <a
              href="https://prismax.ai"
              target="_blank"
              rel="noreferrer"
              className="text-[#8F727D] hover:text-[#FF4D6D] flex items-center gap-1 font-semibold transition-colors bg-white px-3 py-1.5 rounded-full border border-[#FFC2D1] shadow-sm"
            >
              <span>prismax.ai</span>
              <ExternalLink className="w-3 h-3" />
            </a>

            {/* X (Twitter) Link */}
            <a
              href="https://x.com/PrismaXai"
              target="_blank"
              rel="noreferrer"
              className="text-[#FF4D6D] hover:text-[#E0527F] flex items-center gap-1.5 font-bold transition-colors bg-white px-3.5 py-1.5 rounded-full border border-[#FFC2D1] shadow-sm hover:bg-[#FFF0F3]"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
              </svg>
              <span>X (@PrismaXai)</span>
            </a>

            {/* Discord Link */}
            <a
              href="https://discord.gg/QNe7DZbBg"
              target="_blank"
              rel="noreferrer"
              className="text-[#52B788] hover:text-[#2D6A4F] flex items-center gap-1.5 font-bold transition-colors bg-white px-3.5 py-1.5 rounded-full border border-[#B7E4C7] shadow-sm hover:bg-[#F0FDF4]"
            >
              <svg className="w-3.5 h-3.5 fill-current" viewBox="0 0 24 24">
                <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0 12.64 12.64 0 0 0-.617-1.25.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057 19.9 19.9 0 0 0 5.993 3.03.078.078 0 0 0 .084-.028c.462-.63.874-1.295 1.226-1.994.021-.041.001-.09-.041-.106a13.107 13.107 0 0 1-1.872-.892.077.077 0 0 1-.008-.128 10.2 10.2 0 0 0 .372-.292.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.061 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127 12.299 12.299 0 0 1-1.873.892.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028 19.839 19.839 0 0 0 6.002-3.03.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.028zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.956-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419 0-1.333.955-2.419 2.157-2.419 1.21 0 2.176 1.096 2.157 2.42 0 1.333-.946 2.418-2.157 2.418z" />
              </svg>
              <span>Discord</span>
            </a>
          </div>

        </div>
      </footer>

    </div>
  );
}

export default App;
