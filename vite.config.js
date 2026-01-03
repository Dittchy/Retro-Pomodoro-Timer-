import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { VitePWA } from 'vite-plugin-pwa'
import legacy from '@vitejs/plugin-legacy'

export default defineConfig({
  // Base must be set for GitHub Pages to work correctly
  base: '/Retro-Pomodoro-Timer-/',
  plugins: [
    react(),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    legacy({
      targets: ['defaults', 'not IE 11']
    }),
    // VitePWA({...}) - DISABLED: Causing White Screen on Mobile
  ],
  build: {
    target: 'es2015'
  }
})
