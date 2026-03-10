'use client';

import { useState, Suspense, lazy } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import dynamic from 'next/dynamic';

const MatrixRain = dynamic(() => import('@/components/MatrixRain'), { ssr: false });
const LandingPage = dynamic(() => import('@/components/LandingPage'), { ssr: false });
const GlitchTransition = dynamic(() => import('@/components/GlitchTransition'), { ssr: false });
const BluePillPath = dynamic(() => import('@/components/BluePillPath'), { ssr: false });
const RedPillPath = dynamic(() => import('@/components/RedPillPath'), { ssr: false });

type Screen = 'landing' | 'glitch-red' | 'glitch-blue' | 'red' | 'blue';

export default function Home() {
  const [screen, setScreen] = useState<Screen>('landing');

  const handleChoose = (choice: 'red' | 'blue') => {
    setScreen(choice === 'red' ? 'glitch-red' : 'glitch-blue');
  };

  const handleTransitionDone = () => {
    setScreen(prev => prev === 'glitch-red' ? 'red' : 'blue');
  };

  const handleBack = () => {
    setScreen('landing');
  };

  return (
    <main style={{ position: 'relative', minHeight: '100vh', background: '#000' }}>
      {/* Always-on dim rain on landing */}
      {screen === 'landing' && <MatrixRain opacity={0.5} />}

      <AnimatePresence mode="wait">
        {screen === 'landing' && (
          <motion.div
            key="landing"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <LandingPage onChoose={handleChoose} />
          </motion.div>
        )}

        {(screen === 'glitch-red' || screen === 'glitch-blue') && (
          <GlitchTransition
            key="glitch"
            choice={screen === 'glitch-red' ? 'red' : 'blue'}
            onComplete={handleTransitionDone}
          />
        )}

        {screen === 'blue' && (
          <motion.div
            key="blue"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <BluePillPath onBack={handleBack} />
          </motion.div>
        )}

        {screen === 'red' && (
          <motion.div
            key="red"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
          >
            <RedPillPath onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
