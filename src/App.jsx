import React, { useState, useEffect } from 'react';
import { WatchCase } from './components/layout/WatchCase';
import { LCDScreen } from './components/display/LCDScreen';
import { Button } from './components/controls/Button';
import { SettingsModal } from './components/modals/SettingsModal';
import { PresetSelectorModal } from './components/modals/PresetSelectorModal';
import { useWakeLock } from './hooks/useWakeLock';
import { playStartSound, playStopSound, playCompleteSound } from './utils/sound';
import { Play, Pause, RotateCcw, Settings, Clock, List } from 'lucide-react';
import { clsx } from 'clsx';

// Constants
const DEFAULT_PRESETS = [
  { id: 'std', name: 'Standard', focus: 25, short: 5, long: 15 },
  { id: 'deep', name: 'Deep Work', focus: 50, short: 10, long: 20 },
  { id: 'quick', name: 'Quick Hit', focus: 15, short: 3, long: 5 },
];

function App() {
  // PERSISTED STATE
  const [presets, setPresets] = useState(() => {
    const saved = localStorage.getItem('pomo-presets');
    return saved ? JSON.parse(saved) : DEFAULT_PRESETS;
  });
  const [activePresetId, setActivePresetId] = useState(() => localStorage.getItem('pomo-active-preset') || 'std');
  const [userSettings, setUserSettings] = useState(() => {
    const saved = localStorage.getItem('pomo-settings');
    return saved ? JSON.parse(saved) : { sound: true, haptics: true, autoBreak: false };
  });

  // SESSION STATE
  const currentPreset = presets.find(p => p.id === activePresetId) || presets[0];
  const [mode, setMode] = useState('focus'); // focus, shortBreak, longBreak
  const [timeLeft, setTimeLeft] = useState(currentPreset.focus * 60);
  const [isActive, setIsActive] = useState(false);
  const [realTime, setRealTime] = useState(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));

  // MODAL STATE
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isPresetSelectorOpen, setIsPresetSelectorOpen] = useState(false);

  // REFS & HOOKS
  const { requestWakeLock, releaseWakeLock } = useWakeLock();

  // HANDLERS
  const handleUpdateSettings = (newSettings) => {
    setUserSettings(prev => ({ ...prev, ...newSettings }));
  };

  const handleAddPreset = (preset) => {
    const id = 'custom-' + Date.now();
    const presetToAdd = { ...preset, id, name: preset.name.substring(0, 12) };
    setPresets([...presets, presetToAdd]);
  };

  const handleDeletePreset = (id) => {
    if (presets.length <= 1) return;
    const newPresets = presets.filter(p => p.id !== id);
    setPresets(newPresets);
    if (activePresetId === id) {
      // Fallback to first available if active was deleted
      const next = newPresets[0];
      setActivePresetId(next.id);
      resetTimerWithPreset(next);
    }
  };

  const handleSelectPreset = (id) => {
    setActivePresetId(id);
    const newPreset = presets.find(p => p.id === id);
    resetTimerWithPreset(newPreset);
  };

  const resetTimerWithPreset = (preset) => {
    if (!preset) return;
    setIsActive(false);
    // Determine duration based on CURRENT mode but NEW preset
    const duration = mode === 'focus' ? preset.focus
      : mode === 'shortBreak' ? preset.short
        : preset.long;
    setTimeLeft(duration * 60);
  };

  // Real-time Clock
  useEffect(() => {
    const interval = setInterval(() => {
      setRealTime(new Date().toLocaleTimeString('en-US', { hour12: false, hour: '2-digit', minute: '2-digit' }));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // Timer Logic
  useEffect(() => {
    let interval = null;
    if (isActive) requestWakeLock(); else releaseWakeLock();

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => setTimeLeft((prev) => prev - 1), 1000);
    } else if (timeLeft === 0 && isActive) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault();
        toggleTimer();
      } else if (e.code === 'KeyR') {
        resetTimer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, mode]);

  // Persist State
  useEffect(() => {
    localStorage.setItem('pomo-settings', JSON.stringify(userSettings));
    localStorage.setItem('pomo-active-preset', activePresetId);
    localStorage.setItem('pomo-presets', JSON.stringify(presets));
  }, [userSettings, activePresetId, presets]);

  // ACTIONS
  const toggleTimer = () => {
    if (isActive) {
      if (userSettings.sound) playStopSound();
      setIsActive(false);
    } else {
      if (userSettings.sound) playStartSound();
      setIsActive(true);
    }
  };

  const resetTimer = () => {
    setIsActive(false);
    const duration = mode === 'focus' ? currentPreset.focus
      : mode === 'shortBreak' ? currentPreset.short
        : currentPreset.long;
    setTimeLeft(duration * 60);
  };

  const switchMode = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    const duration = newMode === 'focus' ? currentPreset.focus
      : newMode === 'shortBreak' ? currentPreset.short
        : currentPreset.long;
    setTimeLeft(duration * 60);
  };

  const handleComplete = () => {
    setIsActive(false);
    if (userSettings.sound) playCompleteSound();
    if (userSettings.haptics && 'vibrate' in navigator) navigator.vibrate([200, 100, 200, 100, 500]);

    // Auto-switch logic
    if (mode === 'focus') {
      if (userSettings.autoBreak) {
        switchMode('shortBreak');
        setTimeout(() => toggleTimer(), 1000);
      } else {
        switchMode('shortBreak');
      }
    } else {
      switchMode('focus');
    }
  };

  // FORMATTING
  const formatTime = (seconds) => {
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  const currentDuration = mode === 'focus' ? currentPreset.focus * 60
    : mode === 'shortBreak' ? currentPreset.short * 60
      : currentPreset.long * 60;

  const progress = ((currentDuration - timeLeft) / currentDuration) * 100 || 0;

  return (
    <div className="min-h-screen bg-[#050505] flex items-center justify-center p-4 font-sans text-gray-200 overflow-hidden">

      {/* Background Decor */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#111_0%,#000_100%)] pointer-events-none"></div>

      <WatchCase>
        {/* Top Branding Area */}
        <div className="h-4"></div>

        {/* LCD Screen */}
        <div onClick={() => !isActive && setIsPresetSelectorOpen(true)} className="cursor-pointer group">
          <LCDScreen
            mainDisplay={formatTime(timeLeft)}
            subDisplay={realTime}
            label={currentPreset.name.toUpperCase()}
            mode={mode}
            isActive={isActive}
            progress={100 - progress}
          />
          {!isActive && <div className="text-center text-[9px] text-gray-600 mt-1 opacity-0 group-hover:opacity-100 transition-opacity">TAP TO CHANGE MODE</div>}
        </div>

        {/* Control Deck */}
        <div className="flex-1 flex flex-col justify-end gap-3 pb-2">

          {/* Main Action Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <Button
              variant="primary"
              onClick={toggleTimer}
              className={isActive ? "border-amber-900 bg-amber-900/20 text-amber-500 shadow-[0_0_15px_rgba(245,158,11,0.2)]" : ""}
            >
              {isActive ? <><Pause size={20} /> STOP</> : <><Play size={20} /> START</>}
            </Button>
            <Button variant="secondary" onClick={resetTimer}>
              <RotateCcw size={18} /> RESET
            </Button>
          </div>

          {/* Mode Pills */}
          <div className="grid grid-cols-3 gap-2 bg-[#0a0a0a] p-1 rounded-lg border border-gray-800">
            {[
              { id: 'focus', label: 'WORK' },
              { id: 'shortBreak', label: 'SHORT' },
              { id: 'longBreak', label: 'LONG' }
            ].map((m) => (
              <button
                key={m.id}
                onClick={() => switchMode(m.id)}
                className={clsx(
                  "text-[10px] font-bold py-2 rounded transition-all uppercase tracking-wider",
                  mode === m.id
                    ? "bg-gray-800 text-white shadow-sm"
                    : "bg-transparent text-gray-600 hover:text-gray-400"
                )}
              >
                {m.label}
              </button>
            ))}
          </div>

          {/* Bottom Actions */}
          <div className="flex justify-between items-center px-2 mt-2">
            <button
              onClick={() => setIsPresetSelectorOpen(true)}
              className="flex items-center gap-2 text-xs font-bold text-gray-500 hover:text-white transition-colors uppercase tracking-widest"
            >
              <List size={14} /> Mode Select
            </button>

            <button
              onClick={() => setIsSettingsOpen(true)}
              className="p-2 rounded-full hover:bg-gray-800 text-gray-500 hover:text-white transition-colors"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>

      </WatchCase>

      {/* MODALS */}
      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        userSettings={userSettings}
        onUpdateSettings={handleUpdateSettings}
        presets={presets}
        onAddPreset={handleAddPreset}
        onDeletePreset={handleDeletePreset}
      />

      <PresetSelectorModal
        isOpen={isPresetSelectorOpen}
        onClose={() => setIsPresetSelectorOpen(false)}
        presets={presets}
        activePresetId={activePresetId}
        onSelectPreset={handleSelectPreset}
      />

    </div>
  );
}

export default App;
