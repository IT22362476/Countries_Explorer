import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/Countries_Explorer/', // Use your repo name here
  plugins: [react()],
})
