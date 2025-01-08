import { defineConfig } from 'vite';
export default defineConfig({
    root: 'public',
    base: './public',
    build: {
        outDir: '../dist',
    },
    server: {
        port: 5173,
        open: true,
        fs: {
            strict: false,
        },
        proxy: {
            '/api': {
                target: 'http://localhost:3000',
                changeOrigin: true,
            },
        },
    },
    resolve: {
        alias: {
            '@': '/src',
        },
    },
});
