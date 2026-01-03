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
          base: '#c5d1c4', // background of the lcd
          text: '#2d332d', // inactive segments
          active: '#111812', // active segments (dark on light) or reverse
          // Or user asked for: Muted slate greys, deep blacks, and a high-contrast "LCD Green" or "Amber" for the active display.
          // Let's go with a dark theme as "Professional 90s Digital" usually implies rugged black plastic + glowing segments.
          // Dark Mode Palette:
          green: '#39ff14', // High contrast green
          amber: '#ffb000',
          dark: '#0f172a',
          panel: '#1e293b', // Slate 800
          bezel: '#334155', // Slate 700
        }
      },
      fontFamily: {
        digital: ['"Share Tech Mono"', 'monospace'], // Braun/Industrial feel
        lcd: ['"VT323"', 'monospace'], // Pure LCD feel
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'blink': 'blink 1s steps(2, start) infinite',
      },
      keyframes: {
        blink: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' }, // don't go fully transparent, just dim
        }
      }
    },
  },
  plugins: [],
}
