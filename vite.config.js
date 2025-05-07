import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/Splotty/',
  build: {
    outDir: 'dist',
    emptyOutDir: true
  },
  publicDir: 'public'
})