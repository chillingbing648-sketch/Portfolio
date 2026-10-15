import { defineConfig } from 'vite';

export default defineConfig({
  // Use relative base so assets resolve on root domains (Netlify) and subpath deployments (GitHub Pages)
  base: './',
  publicDir: 'public',
  build: {
    outDir: 'dist',
    assetsDir: 'assets',
    sourcemap: false,
    emptyOutDir: true,
    target: 'es2020',
  },
  server: {
    port: 5173,
    open: false,
  },
  preview: {
    port: 4173,
    open: false,
  }
});
