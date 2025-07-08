import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig(({ mode }) => {
  // Load only Vite prefixed env variables
  const env = loadEnv(mode, process.cwd(), '');
  
  // Only include Vite prefixed env variables
  const envWithProcessPrefix = {
    'process.env': Object.entries(env).reduce((acc, [key, val]) => {
      if (key.startsWith('VITE_')) {
        acc[key] = `"${val}"`;
      }
      return acc;
    }, {})
  };
  
  const isProduction = mode === 'production';
  
  return {
    plugins: [react()],
    define: envWithProcessPrefix,
    // Base public path when served in production
    base: isProduction ? '/' : '/',
    // Build configuration
    build: {
      outDir: 'dist',
      assetsDir: 'assets',
      sourcemap: false,
      minify: 'esbuild',
      cssMinify: 'esbuild',
      cssCodeSplit: true,
      rollupOptions: {
        output: {
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            mui: ['@mui/material', '@mui/icons-material', '@emotion/react', '@emotion/styled'],
          },
        },
      },
    },
    // Server configuration
    server: {
      port: 3000,
      strictPort: true,
      open: true,
    },
    preview: {
      port: 3000,
      strictPort: true,
    },
  };
});
