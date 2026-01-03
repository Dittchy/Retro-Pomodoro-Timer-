import React from 'react';
import { twMerge } from 'tailwind-merge';

export const WatchCase = ({ children, className }) => {
    return (
        <div className={twMerge(
            "relative flex flex-col items-center justify-center",
            "w-[380px] h-[460px] mx-auto", // Fixed dimensions for authentic proportion
            className
        )}>

            {/* 1. MAIN CASE BODY (The "Oak" Octagon) */}
            <div
                className="absolute inset-0 bg-[#1a1a1a] shadow-2xl z-0"
                style={{
                    // Authentic GA-2100 Octagon shape using clip-path
                    clipPath: "polygon(30% 0%, 70% 0%, 100% 30%, 100% 70%, 70% 100%, 30% 100%, 0% 70%, 0% 30%)"
                }}
            >
                {/* Inner Bevel Highlight */}
                <div className="absolute inset-1 bg-[#151515]" style={{ clipPath: "inherit" }}></div>
            </div>

            {/* 2. THE BEZEL (Circular/Octagonal Hybrid) */}
            {/* The GA-2100 has a circular dial inside an octagon bezel */}
            <div className="absolute inset-4 rounded-full bg-[#0a0a0a] border-[16px] border-[#1a1a1a] shadow-[inset_0_0_20px_black] z-10 flex flex-col items-center justify-center p-6 text-center">

                {/* ENGRAVINGS */}
                {/* Top Text (Curved Effect Simulated with spacing) */}
                <div className="absolute top-1 font-black text-[9px] text-gray-500 tracking-[0.3em] uppercase select-none w-full">
                    G-SHOCK
                </div>
                <div className="absolute top-1 left-8 transform -rotate-12 text-[7px] text-gray-600 font-bold tracking-wider select-none">ADJUST</div>
                <div className="absolute top-1 right-8 transform rotate-12 text-[7px] text-gray-600 font-bold tracking-wider select-none">LIGHT</div>

                {/* Bottom Text */}
                <div className="absolute bottom-1 font-black text-[9px] text-gray-500 tracking-[0.2em] uppercase select-none w-full">
                    PROTECTION
                </div>
                <div className="absolute bottom-1 left-8 transform rotate-12 text-[7px] text-gray-600 font-bold tracking-wider select-none">MODE</div>
                <div className="absolute bottom-1 right-8 transform -rotate-12 text-[7px] text-gray-600 font-bold tracking-wider select-none">START</div>

                {/* 3. INNER FACE (The actual UI container) */}
                {/* This is where the React children (LCD etc) go */}
                <div className="w-full h-full rounded-full bg-[#050505] relative overflow-hidden flex flex-col justify-between p-4 z-20 shadow-inner ring-1 ring-gray-800">
                    {children}
                </div>
            </div>

            {/* 4. BUTTONS (Physical protrusions) */}
            <div className="absolute -left-1 top-[30%] w-2 h-10 bg-[#222] rounded-l active:scale-90 transition-transform cursor-pointer border-r border-[#111]"></div>
            <div className="absolute -left-1 bottom-[30%] w-2 h-10 bg-[#222] rounded-l active:scale-90 transition-transform cursor-pointer border-r border-[#111]"></div>
            <div className="absolute -right-1 top-[30%] w-2 h-10 bg-[#222] rounded-r active:scale-90 transition-transform cursor-pointer border-l border-[#111]"></div>
            <div className="absolute -right-1 bottom-[30%] w-2 h-10 bg-[#222] rounded-r active:scale-90 transition-transform cursor-pointer border-l border-[#111]"></div>

        </div>
    );
};
