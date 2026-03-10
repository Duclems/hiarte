import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // Base pour GitHub Pages (project site: username.github.io/hiarte/)
  base: process.env.NODE_ENV === 'production' ? '/hiarte/' : '/',
  server: {
    port: 55500,
  },
})
