import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const Logo: React.FC<LogoProps> = ({ className = '', size = 'md' }) => {
  return (
    <div className={`flex items-center gap-2.5 select-none ${className}`}>
      {/* Sleek minimal badge */}
      <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-white/[0.06] border border-white/10 text-white font-mono text-xs font-semibold tracking-wider">
        <span className="text-neutral-400">&lt;</span>
        <span className="text-white font-bold">CIT</span>
        <span className="text-neutral-400">&gt;</span>
      </div>

      <div className="flex flex-col">
        <div className="flex items-center gap-1.5 leading-none">
          <span className="font-bold text-white tracking-tight text-base font-['Clash_Display',sans-serif]">
            DevHub
          </span>
          <span className="text-[10px] text-neutral-400 font-mono tracking-wide px-1.5 py-0.5 rounded bg-white/[0.05] border border-white/[0.08]">
            CIT Mandya
          </span>
        </div>
        <span className="text-[10px] text-neutral-400 font-medium tracking-wider mt-0.5">
          Learn · Code · Share
        </span>
      </div>
    </div>
  );
};
