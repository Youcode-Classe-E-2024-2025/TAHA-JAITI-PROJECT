import { defineConfig } from 'vite';
export default defineConfig({
    root: 'public', // Set 'public' as the root directory
    base: './public', // Base path for assets (optional if serving directly from public)
    build: {
        outDir: '../dist', // Output directory for the build, relative to root
    },
    server: {
        port: 5173, // Development server port
        open: true, // Automatically open the browser on server start
        fs: {
            strict: false, // Allow serving files outside the root directory
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3000', // Backend API target
                changeOrigin: true,
                rewrite: (path) => path.replace(/^\/api/, ''), // Remove "/api" prefix
            },
        },
    },
    resolve: {
        alias: {
            '@': '/src', // Alias for easier imports
        },
    },
});
