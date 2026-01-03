import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X } from 'lucide-react';
import { clsx } from 'clsx';

export const Modal = ({ isOpen, onClose, title, children }) => {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => { document.body.style.overflow = 'unset'; };
    }, [isOpen]);

    if (!mounted || !isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-[fadeIn_0.2s_ease-out]">
            <div
                className="w-full max-w-sm bg-gray-900 border border-gray-700 rounded-xl shadow-2xl relative flex flex-col max-h-[85vh] animate-[scaleIn_0.2s_ease-out]"
                role="dialog"
            >
                {/* Header */}
                <div className="flex justify-between items-center p-4 border-b border-gray-800">
                    <h2 className="text-sm font-bold tracking-widest text-white uppercase font-sans">{title}</h2>
                    <button
                        onClick={onClose}
                        className="text-gray-400 hover:text-white transition-colors p-1 rounded hover:bg-gray-800"
                    >
                        <X size={20} />
                    </button>
                </div>

                {/* Content */}
                <div className="p-4 overflow-y-auto custom-scrollbar">
                    {children}
                </div>
            </div>
        </div>,
        document.body
    );
};
