// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Change from absolute to relative paths to fix 404 errors
  base: './',
  
  // Define public directory
  publicDir: 'public',
  
  // Resolve paths
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  
  build: {
    // Disable asset inlining to ensure files are properly referenced
    assetsInlineLimit: 0,
    
    // Ensure output directory is clean
    emptyOutDir: true,
    
    // Configure asset handling
    rollupOptions: {
      output: {
        manualChunks: undefined,
        assetFileNames: 'assets/[name].[hash].[ext]'
      }
    }
  },
  
  server: {
    host: '0.0.0.0', // Allow network access
    port: 5174,
    
    // Add headers to help with CORS issues
    headers: {
      'Access-Control-Allow-Origin': '*'
    }
  }
})