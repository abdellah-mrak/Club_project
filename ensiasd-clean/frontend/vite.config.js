import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  // Remplacez "ensiasd-platform" par le nom exact de votre repo GitHub
  base: '/ensiasd-platform/',
  plugins: [react()],
  resolve: {
    alias: { '@': path.resolve(__dirname, './src') }
  },
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
  }
})
