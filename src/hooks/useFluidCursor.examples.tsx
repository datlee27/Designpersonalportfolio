/**
 * useFluidCursor Hook - Usage Examples
 * 
 * This file demonstrates different ways to use the useFluidCursor hook
 * in your components.
 */

import { useFluidCursor } from '../hooks/useFluidCursor';

// Example 1: Basic usage with default settings
export function Example1() {
    const canvasRef = useFluidCursor();

    return (
        <div className="relative min-h-screen">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
                style={{ zIndex: 1 }}
            />
            <div className="relative" style={{ zIndex: 10 }}>
                {/* Your content here */}
            </div>
        </div>
    );
}

// Example 2: Custom colors (purple/pink theme)
export function Example2() {
    const canvasRef = useFluidCursor({
        colorOffset: 280,      // Purple hue
        colorAmplitude: 40,    // Less color variation
        opacity: 0.3,          // More visible
    });

    return (
        <div className="relative min-h-screen bg-black">
            <canvas
                ref={canvasRef}
                className="absolute inset-0 pointer-events-none"
            />
            <div className="relative z-10">
                {/* Your content */}
            </div>
        </div>
    );
}

// Example 3: More trails, slower movement
export function Example3() {
    const canvasRef = useFluidCursor({
        trails: 30,                    // More trails (default: 20)
        size: 60,                      // Longer trails (default: 50)
        autoMoveFrequencyX: 0.001,     // Slower horizontal movement
        autoMoveFrequencyY: 0.0008,    // Slower vertical movement
    });

    return (
        <div className="relative min-h-screen">
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
            <div className="relative z-10">{/* Content */}</div>
        </div>
    );
}

// Example 4: Mouse-only mode (no automatic movement)
export function Example4() {
    const canvasRef = useFluidCursor({
        autoMove: false,  // Disable automatic movement
        trails: 15,
        opacity: 0.4,
    });

    return (
        <div className="relative min-h-screen">
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
            <div className="relative z-10">{/* Content */}</div>
        </div>
    );
}

// Example 5: Subtle background effect
export function Example5() {
    const canvasRef = useFluidCursor({
        trails: 10,                    // Fewer trails
        size: 30,                      // Shorter trails
        opacity: 0.15,                 // Very subtle
        autoMoveAmplitude: 0.2,        // Smaller movement area
        friction: 0.6,                 // More friction (slower)
    });

    return (
        <div className="relative min-h-screen">
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
            <div className="relative z-10">{/* Content */}</div>
        </div>
    );
}

// Example 6: Energetic, fast-moving effect
export function Example6() {
    const canvasRef = useFluidCursor({
        trails: 25,
        autoMoveFrequencyX: 0.004,     // Faster movement
        autoMoveFrequencyY: 0.003,
        colorFrequency: 0.003,         // Faster color changes
        friction: 0.4,                 // Less friction (faster)
        tension: 0.95,                 // More tension (bouncier)
    });

    return (
        <div className="relative min-h-screen">
            <canvas ref={canvasRef} className="absolute inset-0 pointer-events-none" />
            <div className="relative z-10">{/* Content */}</div>
        </div>
    );
}

/**
 * Available Options:
 * 
 * @param trails - Number of trails (default: 20)
 * @param size - Length of each trail in nodes (default: 50)
 * @param friction - Movement friction 0-1 (default: 0.5)
 * @param dampening - Dampening factor 0-1 (default: 0.25)
 * @param tension - Spring tension 0-1 (default: 0.98)
 * @param autoMove - Enable automatic movement (default: true)
 * @param autoMoveAmplitude - Movement area as fraction of screen (default: 0.3)
 * @param autoMoveFrequencyX - Horizontal movement speed (default: 0.002)
 * @param autoMoveFrequencyY - Vertical movement speed (default: 0.0015)
 * @param colorOffset - Starting hue 0-360 (default: 285)
 * @param colorAmplitude - Hue variation range (default: 85)
 * @param colorFrequency - Color change speed (default: 0.0015)
 * @param opacity - Trail opacity 0-1 (default: 0.25)
 */
