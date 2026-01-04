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

export const playBeep = (freq = 2000, duration = 0.1, type = 'square', vol = 1.0) => {
    const ctx = getAudioContext();
    if (!ctx) return;

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

    const targetGain = 0.1 * vol;
    gainNode.gain.setValueAtTime(targetGain, ctx.currentTime);
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
    const ctx = getAudioContext();
    if (!ctx) return;

    [0, 0.2, 0.4, 0.6].forEach((offset) => {
        setTimeout(() => playBeep(3000, 0.1, 'square'), offset * 1000);
    });
}

// ASMR Mechanical Tick
export const playTickSound = (volume = 50) => {
    const ctx = getAudioContext();
    if (!ctx) return;
    if (ctx.state === 'suspended') ctx.resume().catch(() => { });

    const normVol = Math.max(0, Math.min(1, volume / 100));
    if (normVol === 0) return;

    const t = ctx.currentTime;

    // Osc 1: Thud/Body (Triangle) - Lower pitch for "thock"
    const osc1 = ctx.createOscillator();
    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(150, t);
    osc1.frequency.exponentialRampToValueAtTime(40, t + 0.05);

    // Osc 2: Click/Transient (Square) - Higher pitch for "tick"
    const osc2 = ctx.createOscillator();
    osc2.type = 'square';
    osc2.frequency.setValueAtTime(2000, t);
    osc2.frequency.exponentialRampToValueAtTime(100, t + 0.01);

    const gain = ctx.createGain();
    gain.gain.setValueAtTime(0, t);
    gain.gain.linearRampToValueAtTime(normVol * 0.3, t + 0.002);
    gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);

    osc1.start(t);
    osc2.start(t);
    osc1.stop(t + 0.1);
    osc2.stop(t + 0.1);
};
