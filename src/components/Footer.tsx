import React, { useState } from 'react';
import { Mail, Instagram, ArrowUp, Check, ExternalLink } from 'lucide-react';
import { Logo } from './Logo';

export const Footer: React.FC = () => {
  const [copied, setCopied] = useState(false);

  const email = 'citdevhub@gmail.com';
  const instaHandle = 'citdevhub';
  const instaUrl = 'https://www.instagram.com/citdevhub';

  const copyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer id="contact" className="py-16 px-6 md:px-12 max-w-6xl mx-auto border-t border-white/[0.08] text-neutral-300 font-sans">
      {/* Luminous container enclosing the brand & social connect section matching hero brightness */}
      <div className="glass rounded-3xl p-8 sm:p-10 border border-white/20 shadow-2xl relative overflow-hidden bg-black/60 backdrop-blur-xl mb-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
          {/* Brand info */}
          <div className="md:col-span-6 space-y-3">
            <Logo />
            <p className="text-neutral-300 text-xs sm:text-sm leading-relaxed max-w-sm">
              Student developer club at Cauvery Institute of Technology, Mandya. Fostering peer-to-peer engineering, hackathon culture, and technical portfolios.
            </p>
            <div className="text-xs font-mono text-neutral-400">
              Learn · Code · Share · Cauvery Institute of Technology, Mandya
            </div>
          </div>

          {/* Contact & Socials: Email & Insta ID */}
          <div className="md:col-span-6 space-y-3 md:text-right flex flex-col md:items-end">
            <div className="text-xs font-mono uppercase tracking-widest text-white">
              Connect With CIT DevHub
            </div>

            {/* Email pill */}
            <div className="flex items-center gap-3 glass px-4 py-2.5 rounded-full self-start md:self-auto border border-white/20 bg-white/[0.06] shadow-sm">
              <Mail className="w-4 h-4 text-neutral-200" />
              <a
                href={`mailto:${email}`}
                className="text-xs font-mono text-white hover:underline"
              >
                {email}
              </a>
              <button
                onClick={copyEmail}
                className="text-[11px] font-mono text-neutral-300 hover:text-white transition-colors cursor-pointer pl-2 border-l border-white/20 flex items-center gap-1"
                title="Copy Email"
              >
                {copied ? (
                  <>
                    <Check className="w-3 h-3 text-emerald-400" />
                    <span>Copied</span>
                  </>
                ) : (
                  <span>Copy</span>
                )}
              </button>
            </div>

            {/* Instagram pill */}
            <a
              href={instaUrl}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2.5 glass glass-hover px-4 py-2.5 rounded-full self-start md:self-auto text-xs font-mono text-white border border-white/20 bg-white/[0.06] shadow-sm"
            >
              <Instagram className="w-4 h-4 text-neutral-200" />
              <span>@{instaHandle}</span>
              <ExternalLink className="w-3 h-3 text-neutral-400" />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-neutral-400">
        <div>© 2026 CIT DevHub · Cauvery Institute of Technology, Mandya</div>
        <button
          onClick={scrollToTop}
          className="flex items-center gap-1 text-neutral-300 hover:text-white transition-colors cursor-pointer"
        >
          <span>Back to Top</span>
          <ArrowUp className="w-3.5 h-3.5" />
        </button>
      </div>
    </footer>
  );
};
