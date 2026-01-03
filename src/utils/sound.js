const audioContext = new (window.AudioContext || window.webkitAudioContext)();

export const playBeep = (freq = 2000, duration = 0.1, type = 'square') => {
    if (audioContext.state === 'suspended') {
        audioContext.resume();
    }

    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.type = type;
    oscillator.frequency.value = freq;

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.start();

    // Clean envelope to avoid clicking
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.00001, audioContext.currentTime + duration);

    oscillator.stop(audioContext.currentTime + duration);
};

export const playStartSound = () => {
    playBeep(2500, 0.1, 'square');
}

export const playStopSound = () => {
    playBeep(1500, 0.1, 'square');
}

export const playCompleteSound = () => {
    // Di-di-di-dit pattern
    const now = audioContext.currentTime;
    [0, 0.2, 0.4, 0.6].forEach((offset, i) => {
        setTimeout(() => playBeep(3000, 0.1, 'square'), offset * 1000);
    });
}
