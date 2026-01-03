let audioContext = null;

const getAudioContext = () => {
    if (!audioContext) {
        const AudioCtor = window.AudioContext || window.webkitAudioContext;
        if (AudioCtor) {
            try {
                audioContext = new AudioCtor();
            } catch (e) {
                console.error("Audio init failed:", e);
            }
        }
    }
    return audioContext;
};

export const playBeep = (freq = 2000, duration = 0.1, type = 'square') => {
    const ctx = getAudioContext();
    if (!ctx) return; // Fallback if audio not supported

    if (ctx.state === 'suspended') {
        ctx.resume().catch(() => { });
    }

    const oscillator = ctx.createOscillator();
    const gainNode = ctx.createGain();

    oscillator.type = type;
    oscillator.frequency.value = freq;

    oscillator.connect(gainNode);
    gainNode.connect(ctx.destination);

    oscillator.start();

    // Clean envelope to avoid clicking
    gainNode.gain.setValueAtTime(0.1, ctx.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, ctx.currentTime + duration);

    oscillator.stop(ctx.currentTime + duration);
};

export const playStartSound = () => {
    playBeep(2500, 0.1, 'square');
}

export const playStopSound = () => {
    playBeep(1500, 0.1, 'square');
}

export const playCompleteSound = () => {
    // Di-di-di-dit pattern
    const ctx = getAudioContext();
    if (!ctx) return;

    [0, 0.2, 0.4, 0.6].forEach((offset, i) => {
        setTimeout(() => playBeep(3000, 0.1, 'square'), offset * 1000);
    });
}
