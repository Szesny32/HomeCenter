import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  define: {
    global: 'window', // mapuje `global` na `window`
  },
  server: {
    proxy: {
      '/api': 'http://localhost:8080',
    },
    
  },
})
