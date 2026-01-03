import React from 'react';
import { clsx } from 'clsx';
import { playBeep } from '../../utils/sound';

export const Button = ({ onClick, children, variant = 'primary', className, ...props }) => {
    const handleMouseDown = () => {
        // Mechanical click sound
        playBeep(800, 0.05, 'sawtooth');
    };

    const baseStyles = "relative font-bold text-xs uppercase tracking-widest transition-all active:scale-95 disabled:opacity-50 disabled:pointer-events-none select-none flex items-center justify-center gap-2";

    const variants = {
        primary: "h-14 bg-gray-700 text-white rounded-lg shadow-[0_4px_0_theme(colors.gray.900),0_6px_10px_rgba(0,0,0,0.5)] active:shadow-[0_0_0_theme(colors.gray.900),inset_0_2px_5px_rgba(0,0,0,0.5)] active:translate-y-[4px] border-2 border-gray-600 hover:bg-gray-600",
        secondary: "h-12 bg-gray-800 text-gray-300 rounded-lg shadow-[0_3px_0_theme(colors.gray.950)] active:shadow-none active:translate-y-[3px] border border-gray-700 hover:bg-gray-700",
        danger: "h-12 bg-red-900/80 text-red-100 rounded-lg shadow-[0_3px_0_theme(colors.red.950)] active:shadow-none active:translate-y-[3px] border border-red-800 hover:bg-red-800",
        ghost: "h-10 text-gray-400 hover:text-white hover:bg-white/5 rounded-md",
    };

    return (
        <button
            className={clsx(baseStyles, variants[variant], className)}
            onMouseDown={handleMouseDown}
            onClick={onClick}
            {...props}
        >
            {children}
        </button>
    );
};
