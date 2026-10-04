import React from 'react';
import { MessageSquare, CheckCircle2 } from 'lucide-react';

export const OthersSection: React.FC = () => {
  return (
    <section id="others" className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/[0.08]">
      <div className="mb-8">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
          Club Activities
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Clash_Display',sans-serif]">
          Others
        </h2>
        <p className="text-neutral-300 text-sm mt-1">
          Past initiatives, technical panels, and student forums.
        </p>
      </div>

      {/* Debate Card showing it has been ended with bright glass contrast matching hero */}
      <div className="glass p-8 sm:p-10 rounded-3xl border border-white/20 shadow-xl bg-black/60 backdrop-blur-xl relative overflow-hidden">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-white/10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/20 flex items-center justify-center text-white shrink-0 shadow-md">
              <MessageSquare className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white font-['Clash_Display',sans-serif]">
                The Great Tech Debate
              </h3>
              <p className="text-xs font-mono text-neutral-400 mt-0.5">Inter-branch Dialectic Discourse</p>
            </div>
          </div>

          {/* Ended Badge as explicitly requested */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.08] border border-white/15 text-xs font-mono text-neutral-200 self-start sm:self-auto shadow-sm">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
            <span>Debate has been ended</span>
          </div>
        </div>

        <div className="mt-6 space-y-4">
          <div className="text-base font-semibold text-white">
            Topic: &ldquo;Code vs. Cognitive Machines: Will AI Render Computer Science Degrees Obsolete?&rdquo;
          </div>

          <p className="text-neutral-300 text-sm leading-relaxed max-w-3xl">
            A spirited debate competition featuring student debaters tackling the ramifications of LLMs, 
            algorithmic automation, and whether traditional collegiate curricula remain pivotal in modern tech.
          </p>

          <div className="flex flex-wrap items-center gap-6 pt-2 text-xs font-mono text-neutral-300">
            <div>
              <span className="text-neutral-400">Status: </span>
              <span className="text-white font-medium">Successfully Concluded</span>
            </div>
            <div>
              <span className="text-neutral-400">Venue: </span>
              <span className="text-white font-medium">Seminar Hall · CIT Mandya</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
