import React from 'react';
import { Clock, Sparkles } from 'lucide-react';

export const HackathonSection: React.FC = () => {
  return (
    <section id="hackathon" className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/[0.08]">
      <div className="mb-8">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
          Coding Competitions
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Clash_Display',sans-serif]">
          Hackathons
        </h2>
        <p className="text-neutral-300 text-sm mt-1 max-w-lg">
          Competitive build sprints solving real problems under intense time constraints.
        </p>
      </div>

      {/* Luminous container matching the hero card brightness and contrast */}
      <div className="glass rounded-3xl p-10 sm:p-14 text-center border border-white/20 shadow-2xl relative overflow-hidden bg-black/60 backdrop-blur-xl">
        {/* Soft subtle starlight aura */}
        <div className="absolute -top-20 left-1/2 -translate-x-1/2 w-80 h-80 bg-white/[0.04] rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 flex flex-col items-center justify-center">
          <div className="w-14 h-14 rounded-2xl bg-white/[0.08] border border-white/20 flex items-center justify-center text-white mb-4 shadow-lg">
            <Clock className="w-6 h-6 text-white" />
          </div>

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/[0.08] border border-white/15 text-xs font-mono text-neutral-200 mb-3">
            <Sparkles className="w-3.5 h-3.5 text-amber-200" />
            <span>CIT DEVHUB SPRINT #1</span>
          </div>

          <h3 className="text-2xl sm:text-3xl font-bold text-white font-['Clash_Display',sans-serif] tracking-tight mb-2">
            Coming Soon
          </h3>

          <p className="text-neutral-300 text-sm sm:text-base max-w-md mx-auto leading-relaxed">
            Hackathon themes, problem statements, and prize pools will be unveiled shortly. 
            Stay tuned for the official countdown!
          </p>
        </div>
      </div>
    </section>
  );
};
