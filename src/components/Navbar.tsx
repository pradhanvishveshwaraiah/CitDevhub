import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';
import { Logo } from './Logo';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const scrollTo = (id: string) => {
    setMobileMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="fixed top-4 left-1/2 -translate-x-1/2 w-[92%] max-w-3xl z-50">
      <nav className="glass rounded-full px-6 py-2.5 flex items-center justify-between shadow-2xl backdrop-blur-xl">
        {/* Clean Logo */}
        <div
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="cursor-pointer"
        >
          <Logo />
        </div>

        {/* The 4 requested navbar links: Hackathon, Ideathon, Workshop, Others */}
        <div className="hidden sm:flex items-center gap-7 text-sm text-neutral-400 font-medium">
          <button
            onClick={() => scrollTo('hackathon')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Hackathon
          </button>
          <button
            onClick={() => scrollTo('ideathon')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Ideathon
          </button>
          <button
            onClick={() => scrollTo('workshop')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Workshop
          </button>
          <button
            onClick={() => scrollTo('others')}
            className="hover:text-white transition-colors cursor-pointer"
          >
            Others
          </button>
        </div>

        {/* Mobile menu trigger */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="sm:hidden p-1.5 text-neutral-400 hover:text-white"
        >
          {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileMenuOpen && (
        <div className="sm:hidden mt-2 glass rounded-2xl p-4 flex flex-col gap-3 text-sm text-neutral-300 shadow-2xl">
          <button
            onClick={() => scrollTo('hackathon')}
            className="text-left py-1 hover:text-white"
          >
            Hackathon
          </button>
          <button
            onClick={() => scrollTo('ideathon')}
            className="text-left py-1 hover:text-white"
          >
            Ideathon
          </button>
          <button
            onClick={() => scrollTo('workshop')}
            className="text-left py-1 hover:text-white"
          >
            Workshop
          </button>
          <button
            onClick={() => scrollTo('others')}
            className="text-left py-1 hover:text-white"
          >
            Others
          </button>
        </div>
      )}
    </header>
  );
};
