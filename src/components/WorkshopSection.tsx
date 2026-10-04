import React from 'react';
import { Linkedin, Bot, ArrowRight, Calendar, MapPin } from 'lucide-react';

interface WorkshopSectionProps {
  onOpenRSVP: (title: string) => void;
}

export const WorkshopSection: React.FC<WorkshopSectionProps> = () => {
  const linkedInGoogleFormUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSd0GyOSRtrc7U0RiMWtCBs9yGqfOafBrJV6aU_7vKxZLlwa6Q/viewform?usp=publish-editor';

  const genAIGoogleFormUrl =
    'https://docs.google.com/forms/d/e/1FAIpQLSdZPLOSMiaajMmZPMxUJ6nO256tYtC7TvEN98vGI9bo9IEhYQ/viewform?usp=publish-editor';

  return (
    <section id="workshop" className="py-20 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/[0.08]">
      <div className="mb-8">
        <span className="text-xs font-mono text-neutral-400 uppercase tracking-widest block mb-2">
          Technical Sessions
        </span>
        <h2 className="text-3xl sm:text-4xl font-bold text-white font-['Clash_Display',sans-serif]">
          Workshops
        </h2>
        <p className="text-neutral-300 text-sm mt-1">
          Hands-on peer-led technical masterclasses designed for student builders.
        </p>
      </div>

      {/* Two workshops in one row with bright glass contrast matching hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Card 1: LinkedIn Workshop */}
        <div className="glass glass-hover p-8 rounded-3xl flex flex-col justify-between border border-white/20 shadow-xl bg-black/60 backdrop-blur-xl relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-white/[0.08] text-white border border-white/15">
                Upcoming
              </span>
              <span className="text-neutral-300">Next Session</span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/20 flex items-center justify-center text-white shrink-0 shadow-md">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-['Clash_Display',sans-serif]">
                  LinkedIn Workshop
                </h3>
                <p className="text-xs font-mono text-neutral-400">Career &amp; Personal Branding</p>
              </div>
            </div>

            <p className="text-neutral-300 text-sm leading-relaxed">
              Learn how to optimize your technical profile, connect with engineering recruiters, 
              and showcase your coding projects effectively to land opportunities.
            </p>

            <div className="pt-2 space-y-2 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-300" />
                <span>Coming Wednesday</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-300" />
                <span>Cauvery Institute of Technology Campus</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 relative z-10">
            <a
              href={linkedInGoogleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01]"
            >
              <span>Click to register</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>

        {/* Card 2: Generative AI Workshop */}
        <div className="glass glass-hover p-8 rounded-3xl flex flex-col justify-between border border-white/20 shadow-xl bg-black/60 backdrop-blur-xl relative overflow-hidden">
          <div className="space-y-4 relative z-10">
            <div className="flex items-center justify-between text-xs font-mono">
              <span className="px-3 py-1 rounded-full bg-white/[0.08] text-white border border-white/15">
                Episode #1
              </span>
              <span className="text-neutral-300">Hands-on AI Lab</span>
            </div>

            <div className="flex items-center gap-3 pt-1">
              <div className="w-12 h-12 rounded-2xl bg-white/[0.08] border border-white/20 flex items-center justify-center text-white shrink-0 shadow-md">
                <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-white font-['Clash_Display',sans-serif]">
                  Generative AI Workshop
                </h3>
                <p className="text-xs font-mono text-neutral-400">LLMs &amp; Prompt Engineering</p>
              </div>
            </div>

            <p className="text-neutral-300 text-sm leading-relaxed">
              Explore foundational generative AI paradigms, fine-tuning, embeddings, and prompt engineering 
              with practical live code implementations.
            </p>

            <div className="pt-2 space-y-2 text-xs font-mono text-neutral-300">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-neutral-300" />
                <span>This Month</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 text-neutral-300" />
                <span>Cauvery Institute of Technology Campus</span>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-4 border-t border-white/10 relative z-10">
            <a
              href={genAIGoogleFormUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="w-full py-3.5 rounded-full bg-white text-black font-bold text-sm hover:bg-neutral-200 transition-all cursor-pointer flex items-center justify-center gap-2 shadow-xl hover:scale-[1.01]"
            >
              <span>Click to register</span>
              <ArrowRight className="w-4 h-4 text-black" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
