import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  // Use base path for GitHub Pages, empty for Netlify
  base: process.env.NETLIFY ? '/' : '/eliete-stpro/admin/',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
