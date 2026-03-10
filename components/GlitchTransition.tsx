'use client';

import { motion } from 'framer-motion';
import MatrixRain from './MatrixRain';
import styles from './GlitchTransition.module.css';

interface GlitchTransitionProps {
    choice: 'red' | 'blue';
    onComplete: () => void;
}

export default function GlitchTransition({ choice, onComplete }: GlitchTransitionProps) {
    const color = choice === 'red' ? '#ff003c' : '#00b4ff';

    return (
        <motion.div
            className={styles.overlay}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
            onAnimationComplete={() => {
                setTimeout(onComplete, 2600);
            }}
        >
            {/* Full-intensity Matrix rain during transition */}
            <MatrixRain opacity={1} color={choice === 'red' ? '#ff003c' : '#00ff41'} />

            {/* Glitch text layers */}
            <div className={styles.center}>
                <div className={styles.glitchWrap}>
                    <div className={styles.glitchBase} style={{ color }}>
                        {choice === 'red' ? 'JACK IN...' : 'LOADING CONSTRUCT...'}
                    </div>
                    <div className={styles.glitch1} style={{ color }}>
                        {choice === 'red' ? 'JACK IN...' : 'LOADING CONSTRUCT...'}
                    </div>
                    <div className={styles.glitch2} style={{ color }}>
                        {choice === 'red' ? 'JACK IN...' : 'LOADING CONSTRUCT...'}
                    </div>
                </div>
                <div className={styles.subtext}>
                    {choice === 'red'
                        ? 'Follow the white rabbit...'
                        : 'There is no spoon...'}
                </div>

                {/* Progress bar */}
                <div className={styles.progressBar}>
                    <motion.div
                        className={styles.progressFill}
                        style={{ background: color, boxShadow: `0 0 10px ${color}` }}
                        initial={{ width: '0%' }}
                        animate={{ width: '100%' }}
                        transition={{ duration: 2.4, ease: 'linear' }}
                    />
                </div>
            </div>

            {/* Scanline effect */}
            <div className={styles.scanline} />

            {/* Fade out vignette */}
            <motion.div
                className={styles.fadeOut}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 2.2, duration: 0.5 }}
                style={{ background: `radial-gradient(ellipse at center, transparent 0%, ${choice === 'red' ? '#0a0000' : '#00000a'} 100%)` }}
            />
        </motion.div>
    );
}
