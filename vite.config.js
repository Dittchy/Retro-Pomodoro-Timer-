import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'

export default defineConfig({
  // Base must be set for GitHub Pages to work correctly
  base: '/Retro-Pomodoro-Timer-/',
  plugins: [
    react(),
    viteSingleFile(),
  ],
  build: {
    target: 'es2015'
  }
})
