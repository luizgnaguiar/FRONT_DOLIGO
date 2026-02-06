import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __dirname = dirname(fileURLToPath(import.meta.url));

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@src': resolve(__dirname, './src'),
      '@app': resolve(__dirname, './src/app'),
      '@modules': resolve(__dirname, './src/modules'),
      '@api': resolve(__dirname, './src/api'),
      '@state': resolve(__dirname, './src/state'),
      '@shared': resolve(__dirname, './src/shared'),
      '@styles': resolve(__dirname, './src/styles'),
      '@assets': resolve(__dirname, './src/assets'),
    },
  },
});