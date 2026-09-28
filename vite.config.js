import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    // Forward /api/* to the Spring Boot backend so the browser avoids CORS in development.
    proxy: {
      '/api': 'http://localhost:8080',
    },
  },
})
