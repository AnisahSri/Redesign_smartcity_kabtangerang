import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/api': {
        target: 'https://dev.tangerangkab.my.id/smartcity-api',
        changeOrigin: true,
        secure: false,
      },
      '/files': {
        target: 'https://dev.tangerangkab.my.id/smartcity-api',
        changeOrigin: true,
        secure: false,
      },
    },
  },
  define: {
    'process.env.API_BASE': JSON.stringify('https://dev.tangerangkab.my.id/smartcity-api')
  },
})

