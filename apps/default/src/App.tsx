import { useEffect } from 'react';
import Navbar from '@/components/Navbar';
import HeroSection from '@/components/HeroSection';
import ScheduleSection from '@/components/ScheduleSection';
import PrizeSection from '@/components/PrizeSection';
import RulesSection from '@/components/RulesSection';
import ChatPanel from '@/components/ChatPanel';

export default function App() {
  useEffect(() => {
    document.documentElement.classList.add('dark');
  }, []);

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      {/* Ambient background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-amber-500/3 rounded-full blur-[160px]" />
        <div className="absolute bottom-1/4 right-0 w-[400px] h-[400px] bg-violet-500/3 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-0 w-[300px] h-[300px] bg-emerald-500/2 rounded-full blur-[100px]" />
      </div>

      <div className="relative z-10">
        <Navbar />
        <HeroSection />

        {/* Divider */}
        <div className="max-w-5xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <ScheduleSection />

        <div className="max-w-5xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <PrizeSection />

        <div className="max-w-5xl mx-auto px-4">
          <div className="h-px bg-gradient-to-r from-transparent via-border to-transparent" />
        </div>

        <RulesSection />

        {/* Footer */}
        <footer className="border-t border-border bg-card/30 py-8 mt-16">
          <div className="max-w-5xl mx-auto px-4 text-center">
            <p className="text-sm text-muted-foreground">
              BSC 2026 Guide · Based on Official Rulebook v1.3 (Mar 6, 2026)
            </p>
            <p className="text-xs text-muted-foreground/60 mt-2">
              This is an unofficial guide. Brawl Stars and BSC are trademarks of Supercell Oy.
              <br />
              Contact: brawl@blast.tv · © {new Date().getFullYear()}
            </p>
          </div>
        </footer>
      </div>

      {/* AI Chat */}
      <ChatPanel />
    </div>
  );
}
