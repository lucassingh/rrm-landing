import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
    plugins: [react()],
    build: {
        chunkSizeWarningLimit: 1000,
        rollupOptions: {
            output: {
                manualChunks: {
                    vendor: ['react', 'react-dom'],
                    mui: ['@mui/material', '@mui/icons-material'],
                    router: ['react-router-dom'],
                    i18n: ['react-i18next', 'i18next']
                }
            }
        }
    },
    server: {
        port: 3000,
        open: true
    }
})
