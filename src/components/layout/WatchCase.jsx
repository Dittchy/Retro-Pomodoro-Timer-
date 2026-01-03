import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const WatchCase = ({ children, className }) => {
    return (
        <div className={twMerge(
            "relative p-8 flex flex-col items-center justify-center gap-6",
            // GA-2100 Octagonal Shape Profile (CasiOak)
            // We use a complex clip-path or border-radius trick. 
            // Tailwind doesn't have a native octagon, so we style the container to look like rugged resin.
            "bg-[#1a1a1a] rounded-[2.5rem] shadow-2xl",
            "before:content-[''] before:absolute before:inset-0 before:bg-[#111] before:rounded-[2.2rem] before:m-1 before:-z-10",
            // Octagonal Bezel Simulation
            "border-[12px] border-[#0a0a0a]",
            "max-w-md w-full aspect-[4/5] mx-auto",
            className
        )}>
            {/* Texture: Matte Resin */}
            <div className="absolute inset-0 rounded-[2rem] pointer-events-none opacity-50 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] mix-blend-overlay z-0"></div>

            {/* Decorative Bezel Text (G-SHOCK style branding) */}
            <div className="absolute top-[2px] left-0 right-0 text-center text-[8px] font-black tracking-[0.4em] text-gray-600 uppercase z-10 select-none">Protection</div>
            <div className="absolute bottom-[2px] left-0 right-0 text-center text-[8px] font-black tracking-[0.4em] text-gray-600 uppercase z-10 select-none">Shock Resist</div>

            {/* Side Button Simulation (Left) */}
            <div className="absolute -left-[16px] top-1/4 w-3 h-12 bg-[#0a0a0a] rounded-l-md border-l border-t border-b border-gray-800 shadow-lg"></div>
            <div className="absolute -left-[16px] bottom-1/4 w-3 h-12 bg-[#0a0a0a] rounded-l-md border-l border-t border-b border-gray-800 shadow-lg"></div>

            {/* Side Button Simulation (Right) */}
            <div className="absolute -right-[16px] top-1/4 w-3 h-12 bg-[#0a0a0a] rounded-r-md border-r border-t border-b border-gray-800 shadow-lg"></div>
            <div className="absolute -right-[16px] bottom-1/4 w-3 h-12 bg-[#0a0a0a] rounded-r-md border-r border-t border-b border-gray-800 shadow-lg"></div>

            {/* Inner Face Content */}
            <div className="relative z-10 w-full h-full flex flex-col justify-between">
                {children}
            </div>
        </div>
    );
};
