/// <reference types="vitest" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.ts',
    css: false,
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@api': path.resolve(__dirname, './src/api'),
      '@state': path.resolve(__dirname, './src/state'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
  resolve: {
    alias: {
      '@app': path.resolve(__dirname, './src/app'),
      '@modules': path.resolve(__dirname, './src/modules'),
      '@api': path.resolve(__dirname, './src/api'),
      '@state': path.resolve(__dirname, './src/state'),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@styles': path.resolve(__dirname, './src/styles'),
      '@assets': path.resolve(__dirname, './src/assets'),
    },
  },
});
