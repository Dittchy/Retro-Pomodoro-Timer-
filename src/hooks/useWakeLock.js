import { useRef, useEffect, useCallback } from 'react';

export const useWakeLock = () => {
    const wakeLock = useRef(null);

    const requestWakeLock = useCallback(async () => {
        if ('wakeLock' in navigator) {
            try {
                wakeLock.current = await navigator.wakeLock.request('screen');
                console.log('Wake Lock is active');

                wakeLock.current.addEventListener('release', () => {
                    console.log('Wake Lock has been released');
                });
            } catch (err) {
                console.error(`${err.name}, ${err.message}`);
            }
        }
    }, []);

    const releaseWakeLock = useCallback(async () => {
        if (wakeLock.current) {
            await wakeLock.current.release();
            wakeLock.current = null;
        }
    }, []);

    // Re-acquire on visibility change
    useEffect(() => {
        const handleVisibilityChange = async () => {
            if (wakeLock.current !== null && document.visibilityState === 'visible') {
                await requestWakeLock();
            }
        };

        document.addEventListener('visibilitychange', handleVisibilityChange);
        return () => {
            document.removeEventListener('visibilitychange', handleVisibilityChange);
            releaseWakeLock();
        };
    }, [requestWakeLock, releaseWakeLock]);

    return { requestWakeLock, releaseWakeLock };
};
