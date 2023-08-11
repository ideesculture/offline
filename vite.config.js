import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import { VitePWA } from 'vite-plugin-pwa'
import { JsonForms } from '@jsonforms/vue';
import { vanillaRenderers } from '@jsonforms/vue-vanilla';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [vue(), VitePWA()],
    base: "/offline/"
})