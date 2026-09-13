/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Navbar } from './components/Navbar';
import { InteractiveCursor } from './components/InteractiveCursor';
import { BackgroundDust } from './components/3d/BackgroundDust';
import { AudioBar } from './components/AudioBar';
import { CinematicEntryModal } from './components/CinematicEntryModal';
import { EasterEggs } from './components/EasterEggs';
import { audioEngine } from './utils/audioEngine';
import { EasterEggNotification } from './types';

// Sections
import { HeroSection } from './sections/HeroSection';
import { IdentitySection } from './sections/IdentitySection';
import { PersonalitySection } from './sections/PersonalitySection';
import { WhyStarboySection } from './sections/WhyStarboySection';
import { MusicSection } from './sections/MusicSection';
import { BooksSection } from './sections/BooksSection';
import { FashionSection } from './sections/FashionSection';
import { TechLabSection } from './sections/TechLabSection';
import { Super60Section } from './sections/Super60Section';
import { AthletesGridSection } from './sections/AthletesGridSection';
import { TravelSection } from './sections/TravelSection';
import { BeliefSection } from './sections/BeliefSection';
import { PhilosophySection } from './sections/PhilosophySection';
import { SocialSection } from './sections/SocialSection';
import { FinalScreen } from './sections/FinalScreen';

export default function App() {
  const [hasEntered, setHasEntered] = useState<boolean>(false);
  const [isAudioPlaying, setIsAudioPlaying] = useState<boolean>(false);
  const [externalEgg, setExternalEgg] = useState<EasterEggNotification | null>(null);

  // Sync audio state with audioEngine and handle auto-play
  useEffect(() => {
    const unsubscribe = audioEngine.onStateChange((playing) => {
      setIsAudioPlaying(playing);
    });

    const sessionEntered = sessionStorage.getItem('starboy_entered');
    if (sessionEntered === 'true') {
      setHasEntered(true);
      // Attempt auto-play for returning visitors
      audioEngine.play();
    }

    return () => {
      unsubscribe();
    };
  }, []);

  const handleEnterUniverse = (withSound: boolean) => {
    setHasEntered(true);
    sessionStorage.setItem('starboy_entered', 'true');
    if (withSound) {
      audioEngine.play();
    } else {
      audioEngine.pause();
    }
  };

  const handleToggleAudio = () => {
    audioEngine.toggle();
  };

  const handleTriggerStarboyEgg = () => {
    setExternalEgg({
      id: 'egg-starboy-logo-clicks',
      title: 'YOU FOUND SOMETHING.',
      message: 'Triple resonance detected on STARBOY insignia. You possess the observant eye.',
      badge: 'ARCHIVE 01',
    });
  };

  const handleBirthdayEgg = () => {
    setExternalEgg({
      id: 'egg-birthday-hover',
      title: 'CHRONOLOGY ALIGNED.',
      message: '06.07.2008 — Origin timestamp confirmed. The constellations shine on Nagina.',
      badge: 'STELLAR CHRONOLOGY',
    });
  };

  const scrollToSection = (sectionId: string) => {
    const el = document.getElementById(sectionId);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-[#050505] text-[#F5F5F5] selection:bg-[#B9974A] selection:text-black font-sans">
      {/* Cinematic First-Visit Entry Overlay */}
      {!hasEntered && (
        <CinematicEntryModal onEnter={handleEnterUniverse} />
      )}

      {/* Interactive Cursor with Particle Follow System */}
      <InteractiveCursor />

      {/* Ambient Stardust Background */}
      <BackgroundDust />

      {/* Persistent Audio Visualizer Controller */}
      <AudioBar
        isPlaying={isAudioPlaying}
        onTogglePlay={handleToggleAudio}
      />

      {/* Top Floating Navbar & Fullscreen Overlay */}
      <Navbar
        onTriggerStarboyEgg={handleTriggerStarboyEgg}
        onNavigate={scrollToSection}
      />

      {/* Secret Easter Egg Manager */}
      <EasterEggs
        externalTrigger={externalEgg}
        onClearTrigger={() => setExternalEgg(null)}
      />

      {/* Main Experience Stream */}
      <main className="relative z-10 w-full overflow-x-hidden">
        <HeroSection />
        <IdentitySection onBirthdayEggTrigger={handleBirthdayEgg} />
        <PersonalitySection />
        <WhyStarboySection />
        <MusicSection
          isAudioPlaying={isAudioPlaying}
          onToggleAudio={handleToggleAudio}
        />
        <BooksSection />
        <FashionSection />
        <TechLabSection />
        <Super60Section />
        <AthletesGridSection />
        <TravelSection />
        <BeliefSection />
        <PhilosophySection />
        <SocialSection />
        <FinalScreen onReturnToTop={scrollToTop} />
      </main>
    </div>
  );
}
