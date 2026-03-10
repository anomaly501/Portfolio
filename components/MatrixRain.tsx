'use client';

import { useEffect, useRef } from 'react';

interface MatrixRainProps {
    opacity?: number;
    color?: string;
}

const CHARS = 'アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホマミムメモヤユヨラリルレロワヲン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&';

export default function MatrixRain({ opacity = 0.85, color = '#00ff41' }: MatrixRainProps) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const fontSize = 14;
        let cols = Math.floor(window.innerWidth / fontSize);
        let drops: number[] = Array(cols).fill(1);

        const resize = () => {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;
            cols = Math.floor(window.innerWidth / fontSize);
            drops = Array(cols).fill(1);
        };
        resize();

        let frameId: number;
        let lastTime = 0;
        const interval = 45; // ms between frames

        const draw = (timestamp: number) => {
            if (timestamp - lastTime < interval) {
                frameId = requestAnimationFrame(draw);
                return;
            }
            lastTime = timestamp;

            ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
            ctx.fillRect(0, 0, canvas.width, canvas.height);

            ctx.fillStyle = color;
            ctx.font = `${fontSize}px 'Share Tech Mono', monospace`;

            for (let i = 0; i < drops.length; i++) {
                const char = CHARS[Math.floor(Math.random() * CHARS.length)];
                const x = i * fontSize;
                const y = drops[i] * fontSize;

                // Brightest char at the front
                if (drops[i] * fontSize > canvas.height * 0.9 || Math.random() > 0.985) {
                    ctx.fillStyle = '#ffffff';
                } else {
                    ctx.fillStyle = color;
                }

                ctx.fillText(char, x, y);

                if (y > canvas.height && Math.random() > 0.975) {
                    drops[i] = 0;
                }
                drops[i]++;
            }

            frameId = requestAnimationFrame(draw);
        };

        frameId = requestAnimationFrame(draw);

        const handleResize = () => resize();
        window.addEventListener('resize', handleResize);

        return () => {
            cancelAnimationFrame(frameId);
            window.removeEventListener('resize', handleResize);
        };
    }, [color]);

    return (
        <canvas
            ref={canvasRef}
            style={{
                position: 'fixed',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                zIndex: 0,
                opacity,
                pointerEvents: 'none',
            }}
        />
    );
}
