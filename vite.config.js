// vite.config.js
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [],
    base: '/Project-Kazamata/',
    build: {
        outDir: 'dist',
        emptyOutDir: true, // This will clear the output directory before building
    },
})