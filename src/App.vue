<script setup>
import ListObjects from './components/ListObjects.vue'
import { useRegisterSW } from 'virtual:pwa-register/vue'

const { needRefresh, updateServiceWorker } = useRegisterSW({
	onRegistered(r) {
		console.log('SW Registered: ' + r)
	},
	onRegisterError(error) {
		console.log('SW registration error', error)
	}
})

// Automatically reload when a new version is available
if (needRefresh.value) {
	console.log('New version available, reloading...')
	updateServiceWorker()
}
</script>
<script>
import { ref } from 'vue'
import $ from 'jquery'
import pkg from '../package.json'

export default {
	data() {
		return {
			data: [],
			appVersion: pkg.version
		}
	},
	mounted() {
		// Display version in console
		console.log(`CollectiveAccess Offline v${this.appVersion}`)

		// Check for version updates periodically (every 5 minutes)
		this.checkVersion()
		setInterval(() => {
			this.checkVersion()
		}, 5 * 60 * 1000)
	},
	methods: {
		toggleSearchMenu() {
			$(".menu-content").toggle()
			$(".load-menu-content").hide()
		},
		toggleLoadMenu() {
			$(".load-menu-content").toggle()
			$(".menu-content").hide()
		},
		async checkVersion() {
			try {
				// Check if the stored version differs from current
				const storedVersion = localStorage.getItem('app_version')
				if (storedVersion && storedVersion !== this.appVersion) {
					console.log(`Version updated from ${storedVersion} to ${this.appVersion}`)
					// Clear caches on version change
					if ('caches' in window) {
						const cacheNames = await caches.keys()
						await Promise.all(cacheNames.map(name => caches.delete(name)))
					}
				}
				localStorage.setItem('app_version', this.appVersion)
			} catch (error) {
				console.error('Version check error:', error)
			}
		}
	}
}
</script>

<template>
  <div class="navbarContainer">
		<div class="navbar">
			<div id="logo"><a href="/gestion/"><img :src="'/offline/menu_logo.png'" /></a></div>
			<div id="items">
				<div class="menu" @click="toggleSearchMenu" style="padding-right:50px">CHERCHER
					<div class="menu-content" style="display: none;">
						<router-link class="routerlink" to="/offline/objects/">OBJETS</router-link>
						<router-link class="routerlink" to="/offline/entities/">ENTITÉS</router-link>
						<router-link class="routerlink" to="/offline/occurrences/">OCCURRENCES</router-link>
						<router-link class="routerlink" to="/offline/collections/">COLLECTIONS</router-link>
						<router-link class="routerlink" to="/offline/places/">LIEUX</router-link>
						<router-link class="routerlink" to="/offline/storage_locations/">EMPLACEMENTS</router-link>
					</div>
				</div>
				<div class="load-menu" @click="toggleLoadMenu" style="padding-right:50px">CHARGER
					<div class="load-menu-content" style="display: none;">
						<router-link class="routerlink" to="/offline/import_database/">DONNÉES OFFLINE</router-link>
					</div>
				</div>
				<router-link class="routerlink" to="/offline/loadsettings" style="color:white;text-decoration:none;">_SETTINGS</router-link>
				<span class="version-badge">v{{ appVersion }}</span>
				<!--
				<router-link class="routerlink" to="/offline/loading.html" style="color:white;text-decoration:none;">CHARGER</router-link>

				-->
			</div>
			<!--<div id="searchBar"><input type="text">🔎</div> -->
		</div>
		<router-view/>
  </div>
	
</template>

<style lang="scss" scoped>
@font-face {font-family: 'DIN-Regular';src: url('./assets/28EC2C_0_0.eot');src: url('./assets/28EC2C_0_0.eot?#iefix') format('embedded-opentype'),url('./assets/28EC2C_0_0.woff') format('woff'),url('./assets/28EC2C_0_0.ttf') format('truetype');}
.navbar {
	text-align: right;
	max-width: 1200px;
	margin:auto;
	height: 58px;
	div {
		display: inline-block;
		font-family: 'DIN-Regular';
		.routerlink {
			color:black;
			padding:0 10px;
			text-decoration:none;
		}
	}
}

#logo {
	float:left;
	margin-top:6px;
	height:45px;
	img {
		height:45px;
	}
}
#searchBar {
	width:174px;
	border:1px solid #ccc;
	border-radius: 3px;
	padding:4px 10px;
	margin-top:12px;
	margin-right:10px; 
	INPUT {
		border:none;
	}
}

#items {
	padding:10px 10px;
	position:relative;
}
.navbarContainer {
	box-shadow: 0 0 5px #888;
	height:58px;
	clear:both;
	z-index:100;
	display:block;
	position:relative;
}
.load-menu, .menu {
	padding-left:8px;
	padding-right: 8px;
	cursor:pointer;
}

.load-menu-content,
.menu-content {
    position: absolute;
    right: 230px;
    float: left;
    width: 160px;
    top: 42px;
    z-index: 500;
    background-color: white;
    border-top: 1px solid #eeeeee;
    box-shadow: 2px 2px 5px rgba(0, 0, 0, 0.2);
    text-align: left;
    padding: 4px;

	a {
		padding:3px 10px !important;
		display:inline-block;
	}
}
.load-menu-content {
    right: 84px;
}
.version-badge {
	font-size: 0.75em;
	color: #999;
	margin-left: 10px;
	font-family: 'DIN-Regular';
}
</style>
