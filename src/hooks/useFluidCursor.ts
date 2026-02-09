// @ts-nocheck
import { useEffect, useRef } from 'react';

interface UseFluidCursorOptions {
    /** Number of trails to render (default: 20) */
    trails?: number;
    /** Size of each trail (number of nodes) (default: 50) */
    size?: number;
    /** Friction coefficient (default: 0.5) */
    friction?: number;
    /** Dampening factor (default: 0.25) */
    dampening?: number;
    /** Tension factor (default: 0.98) */
    tension?: number;
    /** Enable automatic movement when mouse is inactive (default: true) */
    autoMove?: boolean;
    /** Amplitude of automatic movement as fraction of screen size (default: 0.3) */
    autoMoveAmplitude?: number;
    /** Frequency of automatic X movement (default: 0.002) */
    autoMoveFrequencyX?: number;
    /** Frequency of automatic Y movement (default: 0.0015) */
    autoMoveFrequencyY?: number;
    /** Color hue offset (default: 285) */
    colorOffset?: number;
    /** Color hue amplitude (default: 85) */
    colorAmplitude?: number;
    /** Color change frequency (default: 0.0015) */
    colorFrequency?: number;
    /** Opacity of trails (default: 0.25) */
    opacity?: number;
}

export function useFluidCursor(options: UseFluidCursorOptions = {}) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        // Configuration with defaults
        const config = {
            trails: options.trails ?? 20,
            size: options.size ?? 50,
            friction: options.friction ?? 0.5,
            dampening: options.dampening ?? 0.25,
            tension: options.tension ?? 0.98,
            autoMove: options.autoMove ?? true,
            autoMoveAmplitude: options.autoMoveAmplitude ?? 0.3,
            autoMoveFrequencyX: options.autoMoveFrequencyX ?? 0.002,
            autoMoveFrequencyY: options.autoMoveFrequencyY ?? 0.0015,
            colorOffset: options.colorOffset ?? 285,
            colorAmplitude: options.colorAmplitude ?? 85,
            colorFrequency: options.colorFrequency ?? 0.0015,
            opacity: options.opacity ?? 0.25,
        };

        // Oscillator class for smooth value changes
        function Oscillator(oscConfig: any) {
            this.phase = oscConfig.phase || 0;
            this.offset = oscConfig.offset || 0;
            this.frequency = oscConfig.frequency || 0.001;
            this.amplitude = oscConfig.amplitude || 1;
        }

        Oscillator.prototype = {
            update: function () {
                this.phase += this.frequency;
                return this.offset + Math.sin(this.phase) * this.amplitude;
            },
            value: function () {
                return this.offset + Math.sin(this.phase) * this.amplitude;
            },
        };

        // Node class for trail points
        function Node() {
            this.x = 0;
            this.y = 0;
            this.vy = 0;
            this.vx = 0;
        }

        // Line class for creating trails
        function Line(lineConfig: any) {
            this.spring = lineConfig.spring + 0.1 * Math.random() - 0.02;
            this.friction = config.friction + 0.01 * Math.random() - 0.002;
            this.nodes = [];
            for (let i = 0; i < config.size; i++) {
                const node = new Node();
                node.x = pos.x;
                node.y = pos.y;
                this.nodes.push(node);
            }
        }

        Line.prototype = {
            update: function () {
                let spring = this.spring;
                const firstNode = this.nodes[0];
                firstNode.vx += (pos.x - firstNode.x) * spring;
                firstNode.vy += (pos.y - firstNode.y) * spring;

                for (let i = 0; i < this.nodes.length; i++) {
                    const node = this.nodes[i];
                    if (i > 0) {
                        const prevNode = this.nodes[i - 1];
                        node.vx += (prevNode.x - node.x) * spring;
                        node.vy += (prevNode.y - node.y) * spring;
                        node.vx += prevNode.vx * config.dampening;
                        node.vy += prevNode.vy * config.dampening;
                    }
                    node.vx *= this.friction;
                    node.vy *= this.friction;
                    node.x += node.vx;
                    node.y += node.vy;
                    spring *= config.tension;
                }
            },
            draw: function () {
                let x = this.nodes[0].x;
                let y = this.nodes[0].y;
                ctx.beginPath();
                ctx.moveTo(x, y);

                for (let i = 1; i < this.nodes.length - 2; i++) {
                    const node = this.nodes[i];
                    const nextNode = this.nodes[i + 1];
                    x = 0.5 * (node.x + nextNode.x);
                    y = 0.5 * (node.y + nextNode.y);
                    ctx.quadraticCurveTo(node.x, node.y, x, y);
                }

                const lastNode = this.nodes[this.nodes.length - 2];
                const finalNode = this.nodes[this.nodes.length - 1];
                ctx.quadraticCurveTo(lastNode.x, lastNode.y, finalNode.x, finalNode.y);
                ctx.stroke();
                ctx.closePath();
            },
        };

        const pos = { x: 0, y: 0 };
        let lines: any[] = [];
        let running = true;

        // Color oscillator
        const colorOscillator = new Oscillator({
            phase: Math.random() * 2 * Math.PI,
            amplitude: config.colorAmplitude,
            frequency: config.colorFrequency,
            offset: config.colorOffset,
        });

        // Position oscillators for automatic movement
        const xOscillator = new Oscillator({
            phase: Math.random() * 2 * Math.PI,
            amplitude: canvas.width * config.autoMoveAmplitude,
            frequency: config.autoMoveFrequencyX,
            offset: canvas.width / 2,
        });

        const yOscillator = new Oscillator({
            phase: Math.random() * 2 * Math.PI,
            amplitude: canvas.height * config.autoMoveAmplitude,
            frequency: config.autoMoveFrequencyY,
            offset: canvas.height / 2,
        });

        // Initialize lines
        function initLines() {
            lines = [];
            for (let i = 0; i < config.trails; i++) {
                lines.push(new Line({ spring: 0.4 + (i / config.trails) * 0.025 }));
            }
        }

        // Mouse tracking
        let isMouseActive = false;
        let mouseTimeout: NodeJS.Timeout;

        function handleMouseMove(e: MouseEvent) {
            isMouseActive = true;
            pos.x = e.clientX;
            pos.y = e.clientY;

            clearTimeout(mouseTimeout);
            mouseTimeout = setTimeout(() => {
                isMouseActive = false;
            }, 100);
        }

        function handleTouchMove(e: TouchEvent) {
            if (e.touches.length === 1) {
                isMouseActive = true;
                pos.x = e.touches[0].pageX;
                pos.y = e.touches[0].pageY;
                e.preventDefault();

                clearTimeout(mouseTimeout);
                mouseTimeout = setTimeout(() => {
                    isMouseActive = false;
                }, 100);
            }
        }

        // Render loop
        function render() {
            if (!running) return;

            // Update position - use mouse if active, otherwise use oscillators
            if (!isMouseActive && config.autoMove) {
                pos.x = xOscillator.update();
                pos.y = yOscillator.update();
            }

            ctx.globalCompositeOperation = 'source-over';
            ctx.clearRect(0, 0, canvas.width, canvas.height);
            ctx.globalCompositeOperation = 'lighter';
            ctx.strokeStyle = `hsla(${Math.round(colorOscillator.update())},50%,50%,${config.opacity})`;
            ctx.lineWidth = 1;

            for (let i = 0; i < config.trails; i++) {
                const line = lines[i];
                line.update();
                line.draw();
            }

            window.requestAnimationFrame(render);
        }

        // Resize handler
        function resizeCanvas() {
            canvas.width = window.innerWidth;
            canvas.height = window.innerHeight;

            // Update oscillator offsets
            xOscillator.offset = canvas.width / 2;
            yOscillator.offset = canvas.height / 2;
            xOscillator.amplitude = canvas.width * config.autoMoveAmplitude;
            yOscillator.amplitude = canvas.height * config.autoMoveAmplitude;
        }

        // Initialize
        resizeCanvas();
        pos.x = canvas.width / 2;
        pos.y = canvas.height / 2;
        initLines();

        // Event listeners
        document.addEventListener('mousemove', handleMouseMove);
        document.addEventListener('touchmove', handleTouchMove);
        window.addEventListener('resize', resizeCanvas);

        // Start rendering
        render();

        // Cleanup
        return () => {
            running = false;
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('touchmove', handleTouchMove);
            window.removeEventListener('resize', resizeCanvas);
            clearTimeout(mouseTimeout);
        };
    }, [
        options.trails,
        options.size,
        options.friction,
        options.dampening,
        options.tension,
        options.autoMove,
        options.autoMoveAmplitude,
        options.autoMoveFrequencyX,
        options.autoMoveFrequencyY,
        options.colorOffset,
        options.colorAmplitude,
        options.colorFrequency,
        options.opacity,
    ]);

    return canvasRef;
}
