import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    outDir: 'dist', // output directory
    rollupOptions: {
      output: {
        entryFileNames: 'assets/index.js', // custom output filename
        chunkFileNames: 'assets/[name]-[hash].js',
        assetFileNames: 'assets/[name]-[hash][extname]',
      }
    },
    lib: {
      entry: './src/main.jsx', // or your entry file
      name: 'BeneFida',
      fileName: () => 'index.js', // optional: static file name
      formats: ['iife'], // or 'umd', 'es'
    },
    emptyOutDir: true, // clean dist/ before build
    minify: true
  }
})
