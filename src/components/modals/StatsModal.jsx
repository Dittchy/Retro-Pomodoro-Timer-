import React from 'react';
import { Modal } from '../common/Modal';
import { Activity, Clock, Zap } from 'lucide-react';

export const StatsModal = ({ isOpen, onClose, stats }) => {

    // Helper to format minutes into "1h 30m" or "45m"
    const formatDuration = (minutes) => {
        if (!minutes) return '0m';
        const h = Math.floor(minutes / 60);
        const m = minutes % 60;
        if (h > 0) return `${h}h ${m}m`;
        return `${m}m`;
    };

    const totalFocus = stats.totalFocusTime || 0;
    // Total including breaks (optional metric, user asked for "total time spent")
    const totalTime = (stats.totalFocusTime || 0) + (stats.totalShortBreakTime || 0) + (stats.totalLongBreakTime || 0);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Statistics Log">
            {/* Summary Grid */}
            <div className="grid grid-cols-2 gap-3 mb-6">
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex flex-col items-center justify-center gap-1">
                    <Activity size={16} className="text-green-400 mb-1" />
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Focus Time</div>
                    <div className="text-xl font-mono text-white font-bold">{formatDuration(totalFocus)}</div>
                </div>
                <div className="bg-gray-800/50 p-3 rounded-lg border border-gray-700 flex flex-col items-center justify-center gap-1">
                    <Clock size={16} className="text-blue-400 mb-1" />
                    <div className="text-[10px] uppercase font-bold text-gray-400 tracking-wider">Total Time</div>
                    <div className="text-xl font-mono text-white font-bold">{formatDuration(totalTime)}</div>
                </div>
            </div>

            {/* Presets List */}
            <div className="border-t border-gray-800 pt-4">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                    <Zap size={12} /> Preset Activity
                </h3>

                <div className="space-y-2 h-[200px] overflow-y-auto pr-2 custom-scrollbar">
                    {Object.entries(stats.presetStats || {}).length === 0 ? (
                        <div className="text-center py-6 text-gray-600 text-xs italic">
                            No activity recorded yet.
                        </div>
                    ) : (
                        Object.entries(stats.presetStats).map(([id, data]) => (
                            <div key={id} className="bg-gray-950 p-3 rounded-lg border border-gray-800 flex justify-between items-center group hover:border-gray-700 transition-colors">
                                <div>
                                    <div className="text-sm font-bold text-gray-200">{data.name}</div>
                                    <div className="text-[10px] text-gray-500 font-mono mt-0.5">
                                        {data.count} {data.count === 1 ? 'Session' : 'Sessions'}
                                    </div>
                                </div>
                                <div className="text-right">
                                    <div className="text-xs font-mono text-green-400 font-bold bg-green-900/20 px-2 py-1 rounded">
                                        {formatDuration(data.timeSpent)}
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </Modal>
    );
};
