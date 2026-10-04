/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { CosmicHero } from './components/CosmicHero';
import { HackathonSection } from './components/HackathonSection';
import { IdeathonSection } from './components/IdeathonSection';
import { WorkshopSection } from './components/WorkshopSection';
import { OthersSection } from './components/OthersSection';
import { TeamSection } from './components/TeamSection';
import { Footer } from './components/Footer';
import { RSVPModal } from './components/Modals';

export default function App() {
  const [rsvpEventTitle, setRsvpEventTitle] = useState<string | null>(null);

  const handleOpenRSVP = (title: string) => {
    setRsvpEventTitle(title);
  };

  const handleCloseRSVP = () => {
    setRsvpEventTitle(null);
  };

  const handleScrollToWorkshop = () => {
    const el = document.getElementById('workshop');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#ffffff] font-sans antialiased overflow-x-hidden selection:bg-white/20 selection:text-white">
      {/* Background subtle ambient blobs matching Pradhan's portfolio */}
      <div className="blob blob-1" />
      <div className="blob blob-2" />

      {/* Clean Navbar: Hackathon, Ideathon, Workshop, Others */}
      <Navbar />

      <main>
        {/* Clean Hero: No Mandya badge, circularly moving Milky Way galaxy canvas */}
        <CosmicHero onExploreWorkshops={handleScrollToWorkshop} />

        {/* 1. Hackathon section (shows Coming Soon container) */}
        <HackathonSection />

        {/* 2. Ideathon section (shows Coming Soon container) */}
        <IdeathonSection />

        {/* 3. Workshop section (LinkedIn Workshop & Generative AI Workshop Episode #1) */}
        <WorkshopSection onOpenRSVP={handleOpenRSVP} />

        {/* 4. Others section (Debate: Debate has been ended) */}
        <OthersSection />

        {/* Founder Members Section (Before Footer) */}
        <TeamSection />
      </main>

      {/* Footer with email citdevhub@gmail.com and Insta ID citdevhub */}
      <Footer />

      {/* Registration Modal for Workshops */}
      <RSVPModal
        isOpen={rsvpEventTitle !== null}
        onClose={handleCloseRSVP}
        eventTitle={rsvpEventTitle || ''}
      />
    </div>
  );
}
