import { defineConfig } from 'vite';
import path from 'path';

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: 'http://localhost:80/api',
                changeOrigin: true,
                secure: false,
                rewrite: (path) => path,
            },
        },
    },
    build: {
        outDir: 'dist',
    },
    resolve: {
        alias: {
            '@': path.resolve(__dirname, './src'),
        },
    },
});
