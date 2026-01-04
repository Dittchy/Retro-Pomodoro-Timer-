import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  // Base must be set for GitHub Pages
  base: '/Retro-Pomodoro-Timer-/',
  plugins: [
    react()
  ],
  build: {
    target: 'esnext', // Modern browsers
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: true, // Enable sourcemaps for debugging
    minify: 'esbuild'
  }
})
