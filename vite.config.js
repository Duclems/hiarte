import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  // Obligatoire pour GitHub Pages : le site est à https://<user>.github.io/hiarte/
  base: '/hiarte/',
})
