import '@formkit/themes/genesis'
import '@formkit/pro/genesis'
import { genesisIcons } from '@formkit/icons'
import { fr } from '@formkit/i18n'

import { createApp } from 'vue'
import { plugin, defaultConfig } from '@formkit/vue'
import './style.css'
import router from "./router/index"
import App from './App.vue'
import {db} from './db'

import { createProPlugin, inputs } from '@formkit/pro'
const pro = createProPlugin('fk-792724437d', inputs)
const formkitConfig =   {
	locales: { fr },
	locale: 'fr',
	icons: {
  	...genesisIcons
	},
	plugins: [pro]
};
createApp(App).use(router).use(plugin, defaultConfig(formkitConfig)).mount('#app')