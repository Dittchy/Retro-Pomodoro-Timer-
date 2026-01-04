import React, { useState } from 'react';
import { Modal } from '../common/Modal';
import { Volume2, Smartphone, Signal, Trash2, Plus, Clock } from 'lucide-react';
import { clsx } from 'clsx';

export const SettingsModal = ({
    isOpen,
    onClose,
    userSettings,
    onUpdateSettings,
    presets,
    onAddPreset,
    onDeletePreset
}) => {
    const [newPreset, setNewPreset] = useState({ name: '', focus: 25, short: 5, long: 15 });

    const handleAdd = () => {
        onAddPreset(newPreset);
        setNewPreset({ name: '', focus: 25, short: 5, long: 15 });
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="System Configuration v2.2">
            {/* BOOT CONFIG */}
            <div className="mb-6 bg-gray-800/50 p-3 rounded-lg border border-gray-700 space-y-2">
                <div className="text-[10px] font-bold text-gray-400 uppercase">Boot Message</div>
                <input
                    type="text"
                    placeholder="Hi! Prezz.."
                    maxLength={20}
                    value={userSettings.bootMessage || ''}
                    onChange={(e) => onUpdateSettings({ bootMessage: e.target.value })}
                    className="w-full bg-black border border-gray-700 rounded p-2 text-sm text-green-400 placeholder-gray-600 focus:border-green-500 outline-none font-sans font-bold tracking-tight text-center"
                />
            </div>

            {/* TOGGLES */}
            <div className="space-y-4 mb-6">
                <ToggleOption
                    icon={<Volume2 size={16} />}
                    label="Audio Beeps"
                    active={userSettings.sound}
                    onClick={() => onUpdateSettings({ sound: !userSettings.sound })}
                />

                {/* Ticking Sound Option */}
                <div>
                    <ToggleOption
                        icon={<Clock size={16} />}
                        label="Ticking Sound"
                        active={userSettings.ticking}
                        onClick={() => onUpdateSettings({ ticking: !userSettings.ticking })}
                    />
                    {userSettings.ticking && (
                        <div className="pl-9 pr-2 pt-2 animate-[fadeIn_0.3s_ease-out]">
                            <div className="flex items-center gap-3 bg-gray-900/50 p-2 rounded-lg border border-gray-800">
                                <span className="text-[9px] uppercase font-bold text-gray-500">Vol</span>
                                <input
                                    type="range"
                                    min="0" max="100"
                                    value={userSettings.tickingVolume ?? 50}
                                    onChange={(e) => onUpdateSettings({ tickingVolume: parseInt(e.target.value) })}
                                    className="flex-1 h-1.5 bg-gray-700 rounded-lg appearance-none cursor-pointer accent-green-500"
                                />
                                <span className="text-[10px] font-mono text-green-400 w-6 text-right">{userSettings.tickingVolume ?? 50}</span>
                            </div>
                        </div>
                    )}
                </div>
                <ToggleOption
                    icon={<Smartphone size={16} />}
                    label="Haptics"
                    active={userSettings.haptics}
                    onClick={() => onUpdateSettings({ haptics: !userSettings.haptics })}
                />
                <ToggleOption
                    icon={<Signal size={16} />}
                    label="Auto-Break"
                    active={userSettings.autoBreak}
                    onClick={() => onUpdateSettings({ autoBreak: !userSettings.autoBreak })}
                />
            </div>

            {/* PRESET MANAGER */}
            <div className="border-t border-gray-800 pt-6">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4">Timer Presets</h3>

                {/* Existing Presets List */}
                <div className="space-y-2 mb-4">
                    {presets.map(p => (
                        <div key={p.id} className="flex items-center justify-between bg-gray-950 p-3 rounded-lg border border-gray-800">
                            <div>
                                <div className="text-sm font-bold text-gray-200">{p.name}</div>
                                <div className="text-[10px] text-gray-500 font-mono">
                                    {p.focus}m / {p.short}m / {p.long}m
                                </div>
                            </div>
                            {presets.length > 1 && (
                                <button
                                    onClick={() => onDeletePreset(p.id)}
                                    className="text-gray-600 hover:text-red-500 p-2 transition-colors"
                                >
                                    <Trash2 size={14} />
                                </button>
                            )}
                        </div>
                    ))}
                </div>

                {/* Add New Form */}
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 space-y-3">
                    <div className="text-[10px] font-bold text-gray-400 uppercase">Create New Preset</div>
                    <input
                        type="text"
                        placeholder="Preset Name (e.g. HIIT)"
                        maxLength={12}
                        value={newPreset.name}
                        onChange={e => setNewPreset({ ...newPreset, name: e.target.value })}
                        className="w-full bg-black border border-gray-700 rounded p-2 text-sm text-white placeholder-gray-600 focus:border-green-500 outline-none uppercase font-mono"
                    />
                    <div className="grid grid-cols-3 gap-2">
                        <TimeInput label="Work" value={newPreset.focus} onChange={v => setNewPreset({ ...newPreset, focus: v })} color="text-green-400" />
                        <TimeInput label="Short" value={newPreset.short} onChange={v => setNewPreset({ ...newPreset, short: v })} color="text-amber-400" />
                        <TimeInput label="Long" value={newPreset.long} onChange={v => setNewPreset({ ...newPreset, long: v })} color="text-amber-400" />
                    </div>
                    <button
                        onClick={handleAdd}
                        disabled={!newPreset.name}
                        className="w-full bg-gray-700 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white text-xs font-bold py-3 rounded flex items-center justify-center gap-2 uppercase tracking-widest transition-colors"
                    >
                        <Plus size={14} /> Add Preset
                    </button>
                </div>
            </div>
        </Modal>
    );
};

// Sub-components for cleaner code
const ToggleOption = ({ icon, label, active, onClick }) => (
    <div className="flex items-center justify-between">
        <span className="text-sm text-gray-300 flex items-center gap-3">{icon} {label}</span>
        <button
            onClick={onClick}
            className={clsx("w-12 h-6 rounded-full relative transition-colors", active ? "bg-green-600" : "bg-gray-800")}
        >
            <div className={clsx("absolute top-1 w-4 h-4 bg-white rounded-full transition-all shadow-md", active ? "left-7" : "left-1")} />
        </button>
    </div>
);

const TimeInput = ({ label, value, onChange, color }) => (
    <div className="flex flex-col gap-1">
        <label className="text-[9px] text-gray-500 uppercase font-bold text-center">{label}</label>
        <input
            type="number"
            min="1" max="999"
            value={value}
            onChange={e => onChange(parseInt(e.target.value) || 1)}
            className={clsx("w-full bg-black border border-gray-700 rounded p-2 text-sm text-center font-mono focus:border-white outline-none", color)}
        />
    </div>
);
