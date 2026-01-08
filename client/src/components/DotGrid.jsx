import { useRef, useEffect, useCallback, useMemo } from 'react';
import { gsap } from 'gsap';
import './DotGrid.css';

const throttle = (func, limit) => {
    let lastCall = 0;
    return function (...args) {
        const now = performance.now();
        if (now - lastCall >= limit) {
            lastCall = now;
            func.apply(this, args);
        }
    };
};

function hexToRgb(hex) {
    const m = hex.match(/^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i);
    if (!m) return { r: 0, g: 0, b: 0 };
    return {
        r: parseInt(m[1], 16),
        g: parseInt(m[2], 16),
        b: parseInt(m[3], 16)
    };
}

const DotGrid = ({
    dotSize = 16,
    gap = 32,
    baseColor = '#22d3ee', // Cyan default
    activeColor = '#3b82f6', // Blue default
    proximity = 100,
    speedTrigger = 100, // Not used in simplified version
    shockRadius = 200, // Not used in simplified version
    shockStrength = 5, // Not used in simplified version
    maxSpeed = 5000,
    resistance = 750,
    returnDuration = 1.5,
    className = '',
    style
}) => {
    const wrapperRef = useRef(null);
    const canvasRef = useRef(null);
    const dotsRef = useRef([]);
    const pointerRef = useRef({
        x: -1000,
        y: -1000,
        vx: 0,
        vy: 0,
        speed: 0,
        lastTime: 0,
        lastX: 0,
        lastY: 0
    });

    const baseRgb = useMemo(() => hexToRgb(baseColor), [baseColor]);
    const activeRgb = useMemo(() => hexToRgb(activeColor), [activeColor]);

    const circlePath = useMemo(() => {
        // Check for canvas support
        if (typeof window === 'undefined') return null;
        // Path2D might not be needed if we just use arc directly for performance flexibility
        // But let's stick to the structure
        return true;
    }, [dotSize]);

    const buildGrid = useCallback(() => {
        const wrap = wrapperRef.current;
        const canvas = canvasRef.current;
        if (!wrap || !canvas) return;

        const { width, height } = wrap.getBoundingClientRect();
        const dpr = window.devicePixelRatio || 1;

        canvas.width = width * dpr;
        canvas.height = height * dpr;
        canvas.style.width = `${width}px`;
        canvas.style.height = `${height}px`;
        const ctx = canvas.getContext('2d');
        if (ctx) ctx.scale(dpr, dpr);

        const cols = Math.floor((width + gap) / (dotSize + gap));
        const rows = Math.floor((height + gap) / (dotSize + gap));
        const cell = dotSize + gap;

        const gridW = cell * cols - gap;
        const gridH = cell * rows - gap;

        const extraX = width - gridW;
        const extraY = height - gridH;

        const startX = extraX / 2 + dotSize / 2;
        const startY = extraY / 2 + dotSize / 2;

        const dots = [];
        for (let y = 0; y < rows; y++) {
            for (let x = 0; x < cols; x++) {
                const cx = startX + x * cell;
                const cy = startY + y * cell;
                dots.push({
                    cx,
                    cy,
                    xOffset: 0,
                    yOffset: 0,
                    radius: dotSize / 2
                });
            }
        }
        dotsRef.current = dots;
    }, [dotSize, gap]);

    useEffect(() => {
        let rafId;
        const proxSq = proximity * proximity;

        const draw = () => {
            const canvas = canvasRef.current;
            if (!canvas) return;
            const ctx = canvas.getContext('2d');
            if (!ctx) return;
            ctx.clearRect(0, 0, canvas.width, canvas.height);

            const { x: px, y: py } = pointerRef.current;

            for (const dot of dotsRef.current) {
                // Calculate interaction with pointer
                const ox = dot.cx + dot.xOffset;
                const oy = dot.cy + dot.yOffset;
                const dx = dot.cx - px;
                const dy = dot.cy - py;
                const dsq = dx * dx + dy * dy;

                let r = baseRgb.r;
                let g = baseRgb.g;
                let b = baseRgb.b;

                // Color shift based on proximity
                if (dsq <= proxSq) {
                    const dist = Math.sqrt(dsq);
                    const t = 1 - dist / proximity;
                    r = Math.round(baseRgb.r + (activeRgb.r - baseRgb.r) * t);
                    g = Math.round(baseRgb.g + (activeRgb.g - baseRgb.g) * t);
                    b = Math.round(baseRgb.b + (activeRgb.b - baseRgb.b) * t);
                }

                ctx.save();
                ctx.translate(ox, oy);
                ctx.fillStyle = `rgb(${r},${g},${b})`;
                ctx.beginPath();
                ctx.arc(0, 0, dot.radius, 0, Math.PI * 2);
                ctx.fill();
                ctx.restore();
            }

            rafId = requestAnimationFrame(draw);
        };

        draw();
        return () => cancelAnimationFrame(rafId);
    }, [proximity, baseColor, activeRgb, baseRgb]);

    useEffect(() => {
        buildGrid();
        let ro = null;
        if ('ResizeObserver' in window) {
            ro = new ResizeObserver(buildGrid);
            wrapperRef.current && ro.observe(wrapperRef.current);
        } else {
            window.addEventListener('resize', buildGrid);
        }
        return () => {
            if (ro) ro.disconnect();
            else window.removeEventListener('resize', buildGrid);
        };
    }, [buildGrid]);

    useEffect(() => {
        const onMove = e => {
            const rect = canvasRef.current.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            pointerRef.current.x = x;
            pointerRef.current.y = y;

            // Simple repulsion effect without InertiaPlugin
            for (const dot of dotsRef.current) {
                const dist = Math.hypot(dot.cx - x, dot.cy - y);
                if (dist < proximity) {
                    const angle = Math.atan2(dot.cy - y, dot.cx - x);
                    const force = (proximity - dist) / proximity;
                    // Push dots away
                    const push = 15 * force;

                    gsap.to(dot, {
                        xOffset: Math.cos(angle) * push,
                        yOffset: Math.sin(angle) * push,
                        duration: 0.5,
                        ease: "power2.out",
                        overwrite: "auto"
                    });
                } else {
                    // Return to center if not already returning or at center
                    if (dot.xOffset !== 0 || dot.yOffset !== 0) {
                        gsap.to(dot, {
                            xOffset: 0,
                            yOffset: 0,
                            duration: returnDuration,
                            ease: "elastic.out(1, 0.5)",
                            overwrite: "auto"
                        });
                    }
                }
            }
        };

        const throttledMove = throttle(onMove, 30);
        window.addEventListener('mousemove', throttledMove, { passive: true });

        return () => {
            window.removeEventListener('mousemove', throttledMove);
        };
    }, [proximity, returnDuration]);

    return (
        <div ref={wrapperRef} className={`dot-grid ${className}`} style={{ width: '100%', height: '100%', ...style }}>
            <canvas ref={canvasRef} className="dot-grid__canvas" />
        </div>
    );
};

export default DotGrid;
