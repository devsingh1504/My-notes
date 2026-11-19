import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    // /api ki requests backend pe chali jayengi (CORS ka jhanjhat nahi)
    proxy: {
      '/api': 'http://localhost:5000',
    },
  },
});
