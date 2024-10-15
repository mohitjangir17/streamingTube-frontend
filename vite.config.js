import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        // target: 'http://localhost:8080', // Backend server
        target: 'https://api-streamingtube.vercel.app', // Backend server
        changeOrigin: true,
        // rewrite: (path) => path.replace(/^\/api/, '/api/v1'),
      }
    }
  }
})
