'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import dynamic from 'next/dynamic';
import styles from './RedPillPath.module.css';

const MatrixRain = dynamic(() => import('./MatrixRain'), { ssr: false });

interface RedPillPathProps {
    onBack: () => void;
}

const BOOT_LINES = [
    '> INITIALIZING CONSTRUCT...',
    '> LOADING OPERATOR INTERFACE...',
    '> ESTABLISHING SECURE CHANNEL...',
    '> CONNECTION ESTABLISHED.',
    '> OPERATOR ONLINE.',
    '',
    '  "I can only show you the door.',
    '   You\'re the one that has to walk through it."',
    '',
    '> READY FOR INPUT.',
];

export default function RedPillPath({ onBack }: RedPillPathProps) {
    const [bootLines, setBootLines] = useState<string[]>([]);
    const [bootDone, setBootDone] = useState(false);
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [activeField, setActiveField] = useState<string | null>(null);
    const [submitted, setSubmitted] = useState(false);
    const [submitLines, setSubmitLines] = useState<string[]>([]);
    const terminalRef = useRef<HTMLDivElement>(null);

    // Boot sequence
    useEffect(() => {
        let i = 0;
        const addLine = () => {
            if (i >= BOOT_LINES.length) {
                setBootDone(true);
                return;
            }
            setBootLines(prev => [...prev, BOOT_LINES[i]]);
            i++;
            setTimeout(addLine, i < 5 ? 220 : 80);
        };
        const t = setTimeout(addLine, 300);
        return () => clearTimeout(t);
    }, []);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [bootLines, submitLines]);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!formData.name || !formData.email || !formData.message) return;

        const lines = [
            '',
            `> TRANSMITTING TO: ${formData.email}`,
            `> PAYLOAD: "${formData.message.slice(0, 40)}..."`,
            '> ENCRYPTING WITH RSA-2048...',
            '> ROUTING THROUGH PROXY NODES...',
            '> SIGNAL ACQUIRED.',
            '> TRANSMISSION COMPLETE.',
            '',
            '  "The Matrix cannot tell you who you are."',
            '  An operator will find you.',
            '',
        ];

        let i = 0;
        const add = () => {
            if (i >= lines.length) { setSubmitted(true); return; }
            setSubmitLines(prev => [...prev, lines[i]]);
            i++;
            setTimeout(add, 120);
        };
        add();
    };

    return (
        <div className={styles.page}>
            <MatrixRain opacity={0.3} color="#00ff41" />
            <div className={styles.scanlines} />

            <div className={styles.layout}>
                {/* Left Panel — Terminal */}
                <div className={styles.leftPanel}>
                    <button className={styles.backBtn} onClick={onBack}>
                        &larr; ABORT MISSION
                    </button>

                    <motion.div
                        className={styles.terminal}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                    >
                        {/* Terminal Chrome */}
                        <div className={styles.termChrome}>
                            <div className={styles.chromeDots}>
                                <span className={styles.dot} style={{ background: '#ff5f57' }} />
                                <span className={styles.dot} style={{ background: '#febc2e' }} />
                                <span className={styles.dot} style={{ background: '#28c840' }} />
                            </div>
                            <span className={styles.chromeTitle}>OPERATOR_TERMINAL v2.34 — root@matrix</span>
                        </div>

                        {/* Terminal Body */}
                        <div className={styles.termBody} ref={terminalRef}>
                            {/* Boot lines */}
                            {bootLines.map((line, i) => (
                                <div key={i} className={`${styles.termLine} ${(line ?? '').startsWith('>') ? styles.cmd : styles.echo}`}>
                                    {line}
                                </div>
                            ))}

                            {/* Main prompt after boot */}
                            <AnimatePresence>
                                {bootDone && !submitted && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.4 }}
                                    >
                                        <div className={styles.termPromptLine}>
                                            <span className={styles.promptSymbol}>$</span>
                                            <span className={styles.promptText}> Operator, I need an exit.</span>
                                        </div>
                                        <div className={styles.termLine}>&nbsp;</div>

                                        <form onSubmit={handleSubmit} className={styles.form}>
                                            {/* Name field */}
                                            <div className={styles.fieldRow}>
                                                <span className={styles.fieldLabel}>NAME</span>
                                                <span className={styles.fieldSep}>::</span>
                                                <input
                                                    className={`${styles.fieldInput} ${activeField === 'name' ? styles.fieldActive : ''}`}
                                                    type="text"
                                                    value={formData.name}
                                                    onChange={e => setFormData(p => ({ ...p, name: e.target.value }))}
                                                    onFocus={() => setActiveField('name')}
                                                    onBlur={() => setActiveField(null)}
                                                    placeholder="enter_identifier"
                                                    autoComplete="off"
                                                    spellCheck={false}
                                                />
                                            </div>

                                            {/* Email field */}
                                            <div className={styles.fieldRow}>
                                                <span className={styles.fieldLabel}>CHANNEL</span>
                                                <span className={styles.fieldSep}>::</span>
                                                <input
                                                    className={`${styles.fieldInput} ${activeField === 'email' ? styles.fieldActive : ''}`}
                                                    type="email"
                                                    value={formData.email}
                                                    onChange={e => setFormData(p => ({ ...p, email: e.target.value }))}
                                                    onFocus={() => setActiveField('email')}
                                                    onBlur={() => setActiveField(null)}
                                                    placeholder="signal@frequency.net"
                                                    autoComplete="off"
                                                    spellCheck={false}
                                                />
                                            </div>

                                            {/* Message field */}
                                            <div className={`${styles.fieldRow} ${styles.fieldRowTextarea}`}>
                                                <span className={styles.fieldLabel}>PAYLOAD</span>
                                                <span className={styles.fieldSep}>::</span>
                                                <textarea
                                                    className={`${styles.fieldInput} ${styles.fieldTextarea} ${activeField === 'message' ? styles.fieldActive : ''}`}
                                                    value={formData.message}
                                                    onChange={e => setFormData(p => ({ ...p, message: e.target.value }))}
                                                    onFocus={() => setActiveField('message')}
                                                    onBlur={() => setActiveField(null)}
                                                    placeholder="describe_your_exit_request..."
                                                    rows={4}
                                                    spellCheck={false}
                                                />
                                            </div>

                                            <div className={styles.termLine}>&nbsp;</div>

                                            <button
                                                type="submit"
                                                className={styles.submitBtn}
                                                disabled={!formData.name || !formData.email || !formData.message}
                                            >
                                                <span className={styles.submitBracket}>[</span>
                                                EXECUTE TRANSMISSION
                                                <span className={styles.submitBracket}>]</span>
                                            </button>
                                        </form>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* Submit response lines */}
                            {submitLines.map((line, i) => (
                                <div key={`s-${i}`} className={`${styles.termLine} ${(line ?? '').startsWith('>') ? styles.cmd : styles.echo}`}>
                                    {line}
                                </div>
                            ))}

                            {/* Blinking cursor */}
                            <span className={styles.cursor}>_</span>
                        </div>
                    </motion.div>
                </div>

                {/* Right Panel — Info */}
                <motion.div
                    className={styles.rightPanel}
                    initial={{ opacity: 0, x: 30 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.4, duration: 0.8 }}
                >
                    <div className={styles.rightHeader}>
                        <p className={styles.eyebrow}>// THE CONSTRUCT</p>
                        <h1 className={styles.title}>Welcome to<br />the Real World.</h1>
                        <p className={styles.desc}>
                            You took the red pill. There is no simulation here — only signal and noise.
                            Send a transmission through the operator terminal to establish a connection.
                        </p>
                    </div>

                    <div className={styles.infoCards}>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>◈</div>
                            <div>
                                <div className={styles.infoTitle}>RESPONSE TIME</div>
                                <div className={styles.infoVal}>{'< 24 HOURS'}</div>
                            </div>
                        </div>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>◉</div>
                            <div>
                                <div className={styles.infoTitle}>ENCRYPTION</div>
                                <div className={styles.infoVal}>RSA-2048</div>
                            </div>
                        </div>
                        <div className={styles.infoCard}>
                            <div className={styles.infoIcon}>⬡</div>
                            <div>
                                <div className={styles.infoTitle}>OPERATOR STATUS</div>
                                <div className={styles.infoValGreen}>ONLINE</div>
                            </div>
                        </div>
                    </div>

                    <div className={styles.quote}>
                        <blockquote>
                            &ldquo;The answer is out there, Neo, and it&apos;s looking for you.&rdquo;
                        </blockquote>
                        <cite>— Trinity</cite>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
