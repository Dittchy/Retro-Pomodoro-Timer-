/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                lcd: {
                    green: '#39ff14',
                    amber: '#ffb000',
                }
            },
            fontFamily: {
                digital: ['"Share Tech Mono"', 'monospace'],
                lcd: ['"VT323"', 'monospace'],
                sans: ['Inter', 'system-ui', 'sans-serif'],
            },
            animation: {
                'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
                'blink': 'blink 1s steps(2, start) infinite',
                'fadeIn': 'fadeIn 0.5s ease-out forwards',
                'scaleIn': 'scaleIn 0.2s ease-out forwards',
            },
            keyframes: {
                blink: {
                    '0%, 100%': { opacity: '1' },
                    '50%': { opacity: '0.5' },
                },
                fadeIn: {
                    '0%': { opacity: '0' },
                    '100%': { opacity: '1' },
                },
                scaleIn: {
                    '0%': { transform: 'scale(0.95)', opacity: '0' },
                    '100%': { transform: 'scale(1)', opacity: '1' },
                }
            }
        },
    },
    plugins: [],
}
