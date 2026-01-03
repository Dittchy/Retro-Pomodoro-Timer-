import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export const WatchCase = ({ children, className }) => {
    return (
        <div className={twMerge(
            "relative bg-gray-900 rounded-[3rem] p-6 shadow-2xl border-4 border-gray-800",
            "before:content-[''] before:absolute before:inset-0 before:rounded-[2.5rem] before:border-2 before:border-gray-700 before:pointer-events-none",
            "max-w-md w-full aspect-[4/5] mx-auto flex flex-col items-center justify-center gap-6",
            "bg-gradient-to-br from-gray-800 to-gray-950",
            className
        )}>
            {/* Decorative Screws */}
            <div className="absolute top-4 left-4 w-3 h-3 rounded-full bg-gray-600 shadow-inner border border-gray-900 flex items-center justify-center transform rotate-45">
                <div className="w-full h-[1px] bg-gray-800"></div>
            </div>
            <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-gray-600 shadow-inner border border-gray-900 flex items-center justify-center transform -rotate-12">
                <div className="w-full h-[1px] bg-gray-800"></div>
            </div>
            <div className="absolute bottom-4 left-4 w-3 h-3 rounded-full bg-gray-600 shadow-inner border border-gray-900 flex items-center justify-center transform rotate-90">
                <div className="w-full h-[1px] bg-gray-800"></div>
            </div>
            <div className="absolute bottom-4 right-4 w-3 h-3 rounded-full bg-gray-600 shadow-inner border border-gray-900 flex items-center justify-center transform rotate-12">
                <div className="w-full h-[1px] bg-gray-800"></div>
            </div>

            {children}
        </div>
    );
};
