import React, { useState, useEffect, useRef, useCallback } from 'react';
import { WatchCase } from './components/layout/WatchCase';
import { LCDScreen } from './components/display/LCDScreen';
import { Button } from './components/controls/Button';
import { useWakeLock } from './hooks/useWakeLock';
import { playStartSound, playStopSound, playCompleteSound } from './utils/sound';
import { Play, Pause, RotateCcw, Settings, Volume2, VolumeX, Smartphone, Battery, Signal } from 'lucide-react';
import { clsx } from 'clsx';

// Constants
const DEFAULT_PRESETS = [
  { id: 'std', name: 'Standard', focus: 25, short: 5, long: 15 },
  { id: 'deep', name: 'Deep Work', focus: 50, short: 10, long: 20 },
  { id: 'quick', name: 'Quick Hit', focus: 15, short: 3, long: 5 },
];

const MODES = {
  focus: { label: 'FOCUS', color: 'green' },
  shortBreak: { label: 'SHORT BREAK', color: 'amber' },
  longBreak: { label: 'LONG BREAK', color: 'amber' }
};

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
  const [showSettings, setShowSettings] = useState(false);

  // REFS & HOOKS
  const { requestWakeLock, releaseWakeLock } = useWakeLock();

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

    // Wake Lock management
    if (isActive) {
      requestWakeLock();
    } else {
      releaseWakeLock();
    }

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && isActive) {
      handleComplete();
    }

    return () => clearInterval(interval);
  }, [isActive, timeLeft, requestWakeLock, releaseWakeLock]);

  // Keyboard Shortcuts
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.code === 'Space') {
        e.preventDefault(); // Prevent scrolling
        toggleTimer();
      } else if (e.code === 'KeyR') {
        resetTimer();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isActive, mode, currentPreset]); // dependencies for toggleTimer scope

  // Persist Settings
  useEffect(() => {
    localStorage.setItem('pomo-settings', JSON.stringify(userSettings));
    localStorage.setItem('pomo-active-preset', activePresetId);
  }, [userSettings, activePresetId]);

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

    // Auto-switch logic (Smart Break)
    if (mode === 'focus') {
      // Default to short break, user can change manually to long
      if (userSettings.autoBreak) {
        switchMode('shortBreak');
        // Optional: Auto-start break? User didn't strictly request auto-start, just "trigger automatically".
        // I'll leave it paused for safety, or auto-start. "trigger automatically" implies starting.
        // Let's safe-start.
        setTimeout(() => toggleTimer(), 1000);
      } else {
        // Just switch to break mode ready to start
        switchMode('shortBreak');
      }
    } else {
      // End of break, back to focus
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

  const progress = ((currentDuration - timeLeft) / currentDuration) * 100;

  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4 font-sans text-gray-200">
      <WatchCase>
        {/* Header Branding */}
        <div className="absolute top-2 left-0 right-0 text-center text-[10px] text-gray-500 font-bold tracking-[0.3em] font-sans">
          CHRONO-90 // QUARTZ
        </div>

        {/* LCD Screen */}
        <LCDScreen
          mainDisplay={formatTime(timeLeft)}
          subDisplay={realTime}
          label={currentPreset.name.toUpperCase()}
          mode={mode}
          isActive={isActive}
          progress={100 - progress} // Countdown bar
        />

        {/* Control Deck */}
        <div className="w-full grid grid-cols-2 gap-4">
          <Button
            variant="primary"
            onClick={toggleTimer}
            className={isActive ? "border-amber-900 bg-amber-900/20 text-amber-500" : ""}
          >
            {isActive ? <><Pause size={18} /> STOP</> : <><Play size={18} /> START</>}
          </Button>
          <Button variant="secondary" onClick={resetTimer}>
            <RotateCcw size={18} /> RESET
          </Button>
        </div>

        {/* Mode Toggles */}
        <div className="w-full grid grid-cols-3 gap-2 mt-2">
          {[
            { id: 'focus', label: 'WORK', min: currentPreset.focus },
            { id: 'shortBreak', label: 'SHORT', min: currentPreset.short },
            { id: 'longBreak', label: 'LONG', min: currentPreset.long }
          ].map((m) => (
            <button
              key={m.id}
              onClick={() => switchMode(m.id)}
              className={clsx(
                "text-[10px] font-bold py-2 rounded border transition-colors uppercase",
                mode === m.id
                  ? "bg-gray-700 text-white border-gray-500 shadow-inner"
                  : "bg-transparent text-gray-600 border-transparent hover:text-gray-400"
              )}
            >
              {m.label}<br />
              <span className="text-[9px] opacity-60">{m.min}m</span>
            </button>
          ))}
        </div>

        {/* Footer Controls (Presets & Settings) */}
        <div className="w-full flex justify-between items-center mt-4 border-t border-gray-800 pt-4">
          {/* Presets Button */}
          <div className="relative group">
            <button className="text-xs text-gray-500 hover:text-white flex items-center gap-1 uppercase tracking-wider font-bold">
              PRESET: {currentPreset.id}
            </button>
            {/* Popover */}
            <div className="absolute bottom-full left-0 mb-2 bg-gray-800 border border-gray-600 rounded-lg p-2 min-w-[150px] hidden group-hover:block z-50 shadow-xl">
              {presets.map(p => (
                <div
                  key={p.id}
                  onClick={() => { setActivePresetId(p.id); resetTimer(); }}
                  className={clsx(
                    "p-2 text-xs hover:bg-gray-700 cursor-pointer rounded flex justify-between",
                    activePresetId === p.id ? "text-green-400 font-bold" : "text-gray-400"
                  )}>
                  <span>{p.name}</span>
                  <span>{p.focus}m</span>
                </div>
              ))}
              <div className="border-t border-gray-700 mt-1 pt-1 text-[10px] text-center text-gray-500 italic">
                (Edit in settings)
              </div>
            </div>
          </div>

          {/* Settings Toggle */}
          <button
            onClick={() => setShowSettings(!showSettings)}
            className={clsx("p-2 rounded-full hover:bg-gray-800 transition-colors", showSettings && "text-green-400 bg-gray-800")}
          >
            <Settings size={16} />
          </button>
        </div>

        {/* Settings Panel (Overlay) */}
        {showSettings && (
          <div className="absolute inset-x-4 bottom-20 bg-gray-800/95 backdrop-blur-md rounded-xl border border-gray-600 p-4 z-50 shadow-2xl animate-[fadeIn_0.2s_ease-out]">
            <div className="flex justify-between items-center mb-4 border-b border-gray-700 pb-2">
              <h3 className="text-sm font-bold tracking-widest text-white uppercase">System Config</h3>
              <button onClick={() => setShowSettings(false)} className="text-gray-400 hover:text-white">✕</button>
            </div>

            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300 flex items-center gap-2"><Volume2 size={14} /> AUDIO BEEPS</span>
                <button
                  onClick={() => setUserSettings(s => ({ ...s, sound: !s.sound }))}
                  className={clsx("w-10 h-5 rounded-full relative transition-colors", userSettings.sound ? "bg-green-500" : "bg-gray-600")}
                >
                  <div className={clsx("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", userSettings.sound ? "left-6" : "left-1")} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300 flex items-center gap-2"><Smartphone size={14} /> HAPTICS</span>
                <button
                  onClick={() => setUserSettings(s => ({ ...s, haptics: !s.haptics }))}
                  className={clsx("w-10 h-5 rounded-full relative transition-colors", userSettings.haptics ? "bg-green-500" : "bg-gray-600")}
                >
                  <div className={clsx("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", userSettings.haptics ? "left-6" : "left-1")} />
                </button>
              </div>

              <div className="flex items-center justify-between">
                <span className="text-xs text-gray-300 flex items-center gap-2"><Signal size={14} /> AUTO-BREAK</span>
                <button
                  onClick={() => setUserSettings(s => ({ ...s, autoBreak: !s.autoBreak }))}
                  className={clsx("w-10 h-5 rounded-full relative transition-colors", userSettings.autoBreak ? "bg-green-500" : "bg-gray-600")}
                >
                  <div className={clsx("absolute top-1 w-3 h-3 bg-white rounded-full transition-all", userSettings.autoBreak ? "left-6" : "left-1")} />
                </button>
              </div>
            </div>

            <div className="mt-4 text-[10px] text-gray-500 text-center">
              v1.0.0 // PWA READY
            </div>
          </div>
        )}

      </WatchCase>
    </div>
  );
}

export default App;
