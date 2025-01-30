<script setup>
import ListObjects from './components/ListObjects.vue'

</script>
<script>
import { ref } from 'vue'
import $ from 'jquery'

export default {
	data() {
		return {
			data: []
		}
	},
	methods: {
		toggleSearchMenu() {
			$(".menu-content").toggle()
			$(".load-menu-content").hide()
		},
		toggleLoadMenu() {
			$(".load-menu-content").toggle()
			$(".menu-content").hide()
		}
	}
}
</script>

<template>
  <div class="navbarContainer">
		<div class="navbar">
			<div id="logo"><img src="/offline/menu_logo.png" /></div>
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
						<router-link class="routerlink" to="/offline/import_database/">BASE DE DONNÉES</router-link>
					</div>
				</div>
				<router-link class="routerlink" to="/offline/loadsettings" style="color:white;text-decoration:none;">_SETTINGS</router-link>
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
</style>
