// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Penting! Memungkinkan akses dari jaringan
    port: 5174,      // Port default, bisa diubah jika diperlukan
  }
})