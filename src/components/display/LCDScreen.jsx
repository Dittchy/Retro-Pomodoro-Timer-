import React from 'react';
import { clsx } from 'clsx';

export const LCDScreen = ({ mainDisplay, subDisplay, label, mode, isActive, progress }) => {
    const isBreak = mode === 'shortBreak' || mode === 'longBreak';

    // Dynamic glow color
    const glowClass = isBreak ? 'text-amber-400 drop-shadow-[0_0_8px_rgba(251,191,36,0.5)]' : 'text-[#39ff14] drop-shadow-[0_0_8px_rgba(57,255,20,0.5)]';
    const bgClass = 'bg-[#1a231b]'; // Dark greenish black
    const progressColor = isBreak ? 'bg-amber-400' : 'bg-[#39ff14]';

    return (
        <div className={clsx(
            "w-full flex-1 rounded-xl p-6 relative border-4 border-gray-700 shadow-[inset_0_0_20px_rgba(0,0,0,0.8)] flex flex-col justify-between overflow-hidden",
            bgClass,
            "font-digital"
        )}>
            {/* Grid texture overlay */}
            <div className="absolute inset-0 opacity-10 pointer-events-none"
                style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.05) 1px, transparent 1px)', backgroundSize: '20px 20px' }}
            />

            {/* Top Info Bar */}
            <div className={clsx("flex justify-between items-center text-sm tracking-widest uppercase opacity-80 z-10", glowClass)}>
                <span className="flex items-center gap-2">
                    {isActive && <span className="animate-pulse">●</span>}
                    {mode === 'focus' ? 'FOCUS' : 'BREAK'}
                </span>
                <span className="font-lcd text-xl">{subDisplay}</span>
            </div>

            {/* Main Display */}
            <div className={clsx(
                "flex-1 flex items-center justify-center z-10 transition-all duration-300",
                glowClass,
                isActive && "animate-[pulse-slow_4s_infinite]"
            )}>
                <div className="text-[5rem] leading-none font-lcd tracking-wider relative">
                    {/* We assume mainDisplay is formatted like "25:00" */}
                    {mainDisplay.split('').map((char, i) => (
                        <span key={i} className={char === ':' && isActive ? "animate-blink" : ""}>{char}</span>
                    ))}
                </div>
            </div>

            {/* Bottom Label & Progress */}
            <div className="z-10 space-y-2">
                <div className={clsx("text-center text-xs uppercase tracking-[0.2em] opacity-60", glowClass)}>
                    {label}
                </div>

                {/* Retro Progress Bar */}
                <div className="h-2 w-full bg-gray-900/50 rounded-none border border-gray-700/50 relative overflow-hidden">
                    <div
                        className={clsx("h-full transition-all duration-1000 ease-linear shadow-[0_0_10px_currentColor]", progressColor)}
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>
        </div>
    );
};
