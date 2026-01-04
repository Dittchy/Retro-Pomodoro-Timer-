import React from 'react';
import { twMerge } from 'tailwind-merge';

export const WatchCase = ({ children, className }) => {
    return (
        <div className={twMerge(
            "relative p-6 flex flex-col items-center justify-center gap-6",
            // Shape: Classic Rugged Rectangle (DW-5600 style reference)
            // Rounded corners, thick bezel
            "bg-[#1a1a1a] rounded-3xl shadow-2xl",
            "border-[10px] border-[#0a0a0a]", // Outer bumper
            "max-w-[600px] w-full mx-auto min-h-[700px]",
            className
        )}>

            {/* 1. TEXTURE & FORM DETAILS */}
            {/* Matte Resin texture overlay */}
            <div className="absolute inset-0 rounded-2xl pointer-events-none opacity-30 bg-[url('https://www.transparenttextures.com/patterns/black-felt.png')] z-0"></div>

            {/* Decorative Indents (The "Shock Resist" look) */}
            <div className="absolute top-0 bottom-0 left-4 w-1 bg-[#111] opacity-50"></div>
            <div className="absolute top-0 bottom-0 right-4 w-1 bg-[#111] opacity-50"></div>

            {/* 2. FACE SCREWS (Classic detail) */}
            <div className="absolute top-4 left-4 w-4 h-4 rounded-full bg-[#333] border border-[#000] flex items-center justify-center shadow-inner z-20">
                <div className="w-2 h-0.5 bg-[#111] rotate-45"></div>
            </div>
            <div className="absolute top-4 right-4 w-4 h-4 rounded-full bg-[#333] border border-[#000] flex items-center justify-center shadow-inner z-20">
                <div className="w-2 h-0.5 bg-[#111] -rotate-12"></div>
            </div>
            <div className="absolute bottom-4 left-4 w-4 h-4 rounded-full bg-[#333] border border-[#000] flex items-center justify-center shadow-inner z-20">
                <div className="w-2 h-0.5 bg-[#111] rotate-90"></div>
            </div>
            <div className="absolute bottom-4 right-4 w-4 h-4 rounded-full bg-[#333] border border-[#000] flex items-center justify-center shadow-inner z-20">
                <div className="w-2 h-0.5 bg-[#111] rotate-12"></div>
            </div>

            {/* 3. BRANDING TEXT */}
            <div className="absolute top-1 left-0 right-0 text-center z-10 pointer-events-none">
                <span className="font-black text-[10px] text-gray-500 tracking-[0.3em] uppercase drop-shadow-sm">PROTECTION</span>
            </div>
            <div className="absolute bottom-1 left-0 right-0 text-center z-10 pointer-events-none">
                <span className="font-black text-[10px] text-gray-500 tracking-[0.2em] uppercase drop-shadow-sm">G-SHOCK</span>
            </div>

            {/* 5. INNER CONTAINER (The screen & controls) */}
            <div className="relative z-10 w-full h-full bg-[#050505] rounded-xl border-4 border-[#1a1a1a] shadow-inner flex flex-col justify-between p-4 overflow-hidden">
                {/* Glass Reflection Polish */}
                <div className="absolute top-0 right-0 w-2/3 h-full bg-gradient-to-l from-white/5 to-transparent skew-x-12 pointer-events-none"></div>

                {children}
            </div>
        </div>
    );
};
