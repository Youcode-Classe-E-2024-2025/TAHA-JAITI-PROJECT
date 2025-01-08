import { defineConfig } from 'vite';
import path from 'path';
import dotenv from 'dotenv';

dotenv.config();

const API_BASE = process.env.VITE_API_BASE_URL;

export default defineConfig({
    server: {
        proxy: {
            '/api': {
                target: API_BASE,
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
