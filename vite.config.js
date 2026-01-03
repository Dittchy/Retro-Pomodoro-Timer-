import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { viteSingleFile } from 'vite-plugin-singlefile'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  // Base must be set for GitHub Pages to work correctly
  base: '/Retro-Pomodoro-Timer-/',
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    viteSingleFile(),
  ],
  build: {
    target: 'es2015'
  }
})
