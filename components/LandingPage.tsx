'use client';

import { motion } from 'framer-motion';
import styles from './LandingPage.module.css';

interface LandingPageProps {
    onChoose: (choice: 'red' | 'blue') => void;
}

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.3 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: 'easeOut' } },
};

export default function LandingPage({ onChoose }: LandingPageProps) {
    return (
        <motion.div
            className={styles.container}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Scanlines overlay */}
            <div className={styles.scanlines} />

            {/* Header text */}
            <motion.div className={styles.headerBlock} variants={itemVariants}>
                <p className={styles.eyebrow}>SYSTEM MESSAGE // PRIORITY ALPHA</p>
                <h1 className={styles.headline}>
                    This is your last chance.
                    <br />
                    After this, there is no turning back.
                </h1>
                <p className={styles.sub}>
                    You take the blue pill — the story ends. You wake up in your bed and believe whatever you want to believe.
                    <br />
                    You take the red pill — you stay in Wonderland, and I show you how deep the rabbit hole goes.
                </p>
            </motion.div>

            {/* Pills */}
            <motion.div className={styles.pillsRow} variants={itemVariants}>
                {/* Blue Pill */}
                <motion.button
                    className={`${styles.pill} ${styles.bluePill}`}
                    onClick={() => onChoose('blue')}
                    whileHover={{ scale: 1.08, rotateY: 10 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <div className={styles.pillInner}>
                        <div className={styles.pillShape}>
                            <div className={styles.pillGloss} />
                        </div>
                        <span className={styles.pillLabel}>BLUE PILL</span>
                        <span className={styles.pillSub}>The Portfolio</span>
                    </div>
                </motion.button>

                {/* Divider */}
                <div className={styles.orDivider}>
                    <span className={styles.orLine} />
                    <span className={styles.orText}>OR</span>
                    <span className={styles.orLine} />
                </div>

                {/* Red Pill */}
                <motion.button
                    className={`${styles.pill} ${styles.redPill}`}
                    onClick={() => onChoose('red')}
                    whileHover={{ scale: 1.08, rotateY: -10 }}
                    whileTap={{ scale: 0.95 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 20 }}
                >
                    <div className={styles.pillInner}>
                        <div className={styles.pillShape}>
                            <div className={styles.pillGloss} />
                        </div>
                        <span className={styles.pillLabel}>RED PILL</span>
                        <span className={styles.pillSub}>The Truth</span>
                    </div>
                </motion.button>
            </motion.div>

            {/* Footer */}
            <motion.p className={styles.footer} variants={itemVariants}>
                Remember, all I&apos;m offering is the truth. Nothing more.
            </motion.p>
        </motion.div>
    );
}
