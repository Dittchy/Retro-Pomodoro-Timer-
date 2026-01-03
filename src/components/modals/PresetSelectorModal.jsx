import React from 'react';
import { Modal } from '../common/Modal';
import { clsx } from 'clsx';
import { Check } from 'lucide-react';

export const PresetSelectorModal = ({ isOpen, onClose, presets, activePresetId, onSelectPreset }) => {
    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Select Mode">
            <div className="grid gap-3">
                {presets.map(p => {
                    const isActive = activePresetId === p.id;
                    return (
                        <button
                            key={p.id}
                            onClick={() => { onSelectPreset(p.id); onClose(); }}
                            className={clsx(
                                "group relative flex items-center justify-between p-4 rounded-xl border transition-all text-left",
                                isActive
                                    ? "bg-green-900/10 border-green-500/50 shadow-[0_0_15px_rgba(34,197,94,0.1)]"
                                    : "bg-gray-900 border-gray-800 hover:border-gray-600 hover:bg-gray-800"
                            )}
                        >
                            <div>
                                <div className={clsx("text-base font-bold uppercase tracking-wider mb-1", isActive ? "text-green-400" : "text-white")}>
                                    {p.name}
                                </div>
                                <div className="flex gap-3 text-xs font-mono text-gray-500">
                                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-green-500"></span> {p.focus}m</span>
                                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-500"></span> {p.short}m</span>
                                    <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-700"></span> {p.long}m</span>
                                </div>
                            </div>

                            {isActive && <div className="text-green-500"><Check size={24} /></div>}
                        </button>
                    );
                })}
            </div>

            <div className="mt-6 text-center">
                <p className="text-[10px] text-gray-600">
                    Need a different timer? Edit presets in Settings.
                </p>
            </div>
        </Modal>
    );
};
