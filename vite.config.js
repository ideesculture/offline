import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        VitePWA({
            registerType: 'autoUpdate',
            workbox: {
                globPatterns: ['**/*.{js,css,html,ico,png,svg,woff,woff2,ttf,eot}'],
                runtimeCaching: [
                    {
                        urlPattern: /^https:\/\/.*\.(png|jpg|jpeg|svg|gif)$/,
                        handler: 'CacheFirst',
                        options: {
                            cacheName: 'image-cache',
                            expiration: {
                                maxEntries: 50,
                                maxAgeSeconds: 30 * 24 * 60 * 60 // 30 days
                            }
                        }
                    }
                ]
            },
            manifest: {
                name: 'CollectiveAccess Offline',
                short_name: 'CA Offline',
                description: 'CollectiveAccess offline application',
                theme_color: '#21b6c9',
                icons: [
                    {
                        src: '/offline/offline.svg',
                        sizes: '192x192',
                        type: 'image/svg+xml'
                    }
                ]
            }
        })
    ],
    base: "/offline/",
    build: {
        // Generate unique hashes for all assets to bust cache
        rollupOptions: {
            output: {
                entryFileNames: `assets/[name].[hash].js`,
                chunkFileNames: `assets/[name].[hash].js`,
                assetFileNames: `assets/[name].[hash].[ext]`
            }
        }
    }
})