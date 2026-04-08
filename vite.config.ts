import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import blogApiPlugin from './vite-plugin-blog-api'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), blogApiPlugin()],
})
