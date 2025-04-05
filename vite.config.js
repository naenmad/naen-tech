// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Add base path configuration
  base: '/',
  // Ensure public assets are properly handled
  publicDir: 'public',
  build: {
    // Ensure assets have consistent paths
    assetsInlineLimit: 0,
    rollupOptions: {
      output: {
        manualChunks: undefined
      }
    }
  },
  server: {
    host: '0.0.0.0', // Penting! Memungkinkan akses dari jaringan
    port: 5174,      // Port default, bisa diubah jika diperlukan
  }
})