'use client';

import { motion } from 'framer-motion';
import styles from './ProjectCard.module.css';

export interface Project {
    title: string;
    genre: string;
    year: number;
    thumbnail: string;
    bitrate: string;
    resolution: string;
    role: string;
    description: string;
    status: string;
}

interface ProjectCardProps {
    project: Project;
    index: number;
}

export default function ProjectCard({ project, index }: ProjectCardProps) {
    return (
        <motion.div
            className={styles.card}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.6, ease: 'easeOut' }}
            whileHover="hover"
        >
            {/* Thumbnail */}
            <div className={styles.thumbWrap}>
                <div className={styles.thumb} style={{ background: project.thumbnail }} />
                <div className={styles.thumbOverlay} />
                <div className={styles.noise} />

                {/* System Data Overlay */}
                <motion.div
                    className={styles.sysData}
                    variants={{
                        hover: { opacity: 1, y: 0 },
                    }}
                    initial={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.25 }}
                >
                    <div className={styles.sysHeader}>// SYSTEM DATA</div>
                    <div className={styles.sysRow}><span>BITRATE</span><span>{project.bitrate}</span></div>
                    <div className={styles.sysRow}><span>RESOLUTION</span><span>{project.resolution}</span></div>
                    <div className={styles.sysRow}><span>ROLE</span><span>{project.role}</span></div>
                    <div className={styles.sysRow}><span>STATUS</span><span className={styles.statusOk}>{project.status}</span></div>
                </motion.div>

                {/* Year badge */}
                <div className={styles.year}>{project.year}</div>
            </div>

            {/* Card Info */}
            <div className={styles.info}>
                <div className={styles.genre}>{project.genre}</div>
                <h3 className={styles.title}>{project.title}</h3>
                <p className={styles.desc}>{project.description}</p>
                <motion.div
                    className={styles.viewBtn}
                    variants={{ hover: { color: '#00b4ff', borderColor: '#00b4ff' } }}
                >
                    VIEW PROJECT &rarr;
                </motion.div>
            </div>

            {/* Glowing border on hover */}
            <motion.div
                className={styles.border}
                variants={{ hover: { opacity: 1 } }}
                initial={{ opacity: 0 }}
            />
        </motion.div>
    );
}
