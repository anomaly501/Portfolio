'use client';

import { motion } from 'framer-motion';
import MatrixRain from './MatrixRain';
import ProjectCard, { Project } from './ProjectCard';
import styles from './BluePillPath.module.css';

const PROJECTS: Project[] = [
    {
        title: 'Echoes of Silence',
        genre: 'Drama / Thriller',
        year: 2024,
        thumbnail: 'linear-gradient(135deg, #0d1b2a 0%, #1b2838 30%, #0f3460 60%, #16213e 100%)',
        bitrate: '150 Mb/s',
        resolution: '4K UHD',
        role: 'Director, Editor',
        description: 'A haunting exploration of memory and identity through fragmented timelines.',
        status: 'RELEASED',
    },
    {
        title: 'Neon Requiem',
        genre: 'Sci-Fi / Noir',
        year: 2024,
        thumbnail: 'linear-gradient(135deg, #0d0221 0%, #190d35 30%, #2d1b69 60%, #11052c 100%)',
        bitrate: '200 Mb/s',
        resolution: '4K HDR',
        role: 'Cinematographer',
        description: 'A cyberpunk detective story set in a city where light never reaches the ground.',
        status: 'RELEASED',
    },
    {
        title: 'The Last Signal',
        genre: 'Documentary',
        year: 2023,
        thumbnail: 'linear-gradient(135deg, #0a1628 0%, #1a2744 30%, #0e3b52 60%, #071322 100%)',
        bitrate: '80 Mb/s',
        resolution: '2K DCI',
        role: 'Producer, Director',
        description: 'Following three radio astronomers listening for the first sign of alien life.',
        status: 'FESTIVAL RUN',
    },
    {
        title: 'Fracture Lines',
        genre: 'Action / Drama',
        year: 2023,
        thumbnail: 'linear-gradient(135deg, #0d1117 0%, #161b22 30%, #0d2137 60%, #010409 100%)',
        bitrate: '220 Mb/s',
        resolution: '4K IMAX',
        role: 'VFX Supervisor',
        description: 'When the fault lines shift, every choice becomes a matter of survival.',
        status: 'POST-PRODUCTION',
    },
    {
        title: 'Meridian',
        genre: 'Experimental',
        year: 2022,
        thumbnail: 'linear-gradient(135deg, #001e3c 0%, #00264d 30%, #003a75 60%, #001020 100%)',
        bitrate: '90 Mb/s',
        resolution: '1080p',
        role: 'Writer, Director',
        description: 'A dreamlike journey through the liminal spaces between waking and sleep.',
        status: 'ARCHIVED',
    },
    {
        title: 'Project Helix',
        genre: 'Short Film',
        year: 2022,
        thumbnail: 'linear-gradient(135deg, #050d18 0%, #0a1929 30%, #0e2840 60%, #020810 100%)',
        bitrate: '120 Mb/s',
        resolution: '2.35:1 Anamorphic',
        role: 'Full Production',
        description: 'A 12-minute meditation on genetic memory and what we inherit from the past.',
        status: 'RELEASED',
    },
];

const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.05 } },
};

interface BluePillPathProps {
    onBack: () => void;
}

export default function BluePillPath({ onBack }: BluePillPathProps) {
    return (
        <motion.div
            className={styles.page}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <MatrixRain opacity={0.15} color="#00b4ff" />
            <div className={styles.scanlines} />

            {/* Header */}
            <div className={styles.header}>
                <button className={styles.backBtn} onClick={onBack}>
                    &larr; GO BACK
                </button>
                <motion.div
                    className={styles.headerContent}
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                >
                    <p className={styles.eyebrow}>// SIMULATION PROTOCOL ACTIVE</p>
                    <h1 className={styles.title}>The Illusion of Reality</h1>
                    <p className={styles.subtitle}>
                        You chose the blue pill. Welcome to the construct — a curated simulation of work and craft.
                    </p>
                </motion.div>

                {/* Stats bar */}
                <motion.div
                    className={styles.statsBar}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5 }}
                >
                    <div className={styles.stat}><span>PROJECTS</span><span className={styles.statVal}>06</span></div>
                    <div className={styles.statDiv} />
                    <div className={styles.stat}><span>YEARS ACTIVE</span><span className={styles.statVal}>05</span></div>
                    <div className={styles.statDiv} />
                    <div className={styles.stat}><span>STATUS</span><span className={styles.statValGreen}>ONLINE</span></div>
                </motion.div>
            </div>

            {/* Grid */}
            <div className={styles.grid}>
                {PROJECTS.map((project, i) => (
                    <ProjectCard key={project.title} project={project} index={i} />
                ))}
            </div>

            {/* Footer */}
            <div className={styles.footer}>
                <p>// END OF SIMULATION // RETURN TO CHOICE?</p>
                <button className={styles.footerBtn} onClick={onBack}>TAKE THE RED PILL INSTEAD</button>
            </div>
        </motion.div>
    );
}
