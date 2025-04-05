// vite.config.ts
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { resolve } from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  
  // Critical: use relative paths instead of absolute
  base: '', // Empty string for root-relative paths
  
  // Define public directory
  publicDir: 'public',
  
  // Resolve paths
  resolve: {
    alias: {
      '@': resolve(__dirname, 'src'),
    },
  },
  
  build: {
    outDir: 'dist',
    assetsDir: '', // Don't put everything in /assets/
    // Disable asset inlining to ensure files are properly referenced
    assetsInlineLimit: 0,
    
    // Ensure output directory is clean
    emptyOutDir: true,
    
    // Configure asset handling
    rollupOptions: {
      output: {
        entryFileNames: 'index.js', // Specify exact output file names without hash
        chunkFileNames: '[name].js',
        assetFileNames: '[name].[ext]'
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