import { defineConfig } from 'vite'

import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    build: {
        outDir: '../wwwroot',
    },
    server: {
        port: 3000,
        https: true,
        proxy: {
            '/server/api': 'http://localhost:5177',
            '/server/odata': 'http://localhost:5177',
        },
    },
    preview: {
        port: 3000,
    },
    envPrefix: 'PUBLIC_',
})
