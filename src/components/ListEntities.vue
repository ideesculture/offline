<template>
	<div id="list">
		<div class="container">
			<div class="col inspector">
				<div class="rechercher">
					<router-link class="routerlink" to="/offline/" style="color:black;text-decoration: none;">
						RECHERCHER ENTITÉS
					</router-link>
				</div>
			</div>
			<div class="col4">
				<div class="searchblock">
					<p class="searchblock1">Recherche : <input type="text" v-model="searchinput"></p>
					<p class="searchblock2" style="text-align: right;"><button @click="dosearch">🔍 Recherche</button></p>
				</div>
				<div class="numresultsblock">
					<span id="numresults">{{ numFilteredItems }}</span> entités
				</div>
				<div class="entitiesresults">
					<div v-for="item in filteredItems">
						<a :href="'http://localhost:5173/offline/edit/ca_entities_' + item.id"><img src='/public/edit.png' style="height:22px;padding-right:8px;" align="top" /></a> 
						<!-- {{ item.idno }} -->
						<span class='ellipsis'>{{ item.preferred_labels }}</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import $ from 'jquery'
import ObjectThumbnail from './ObjectThumbnail.vue'

export default {
	data() {
		return {
			data: [],
			search: "",
			searchinput: ""
		}
	},
	computed: {
		filteredItems() {
			//console.log(this.data[10].preferred_labels.toLowerCase().indexOf(this.search.toLowerCase()) > -1);
			return this.data.filter(item => {
				if(!item.preferred_labels) return false;
				return item.preferred_labels.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
			})
		},
		numFilteredItems() {
			return this.filteredItems.length;
		}
	},
	methods: {
		dosearch() {
			if(this.searchinput == "*") {
				// search * fetches everything, aka no filter
				this.search = "";
			} else {
				// search input content is copied in this.search to be applied
				this.search = this.searchinput;
			}
		}
	},	
	mounted() {
		$('#content').append($("<ul></ul>"));
		let that=this;
		let i = 0;
		$.each(localStorage, function (key, value) {
			if(typeof value != 'string') return;
			var data = JSON.parse(value);
			console.log(data.idno);
			if (key.startsWith("ca_entities_") && (data['idno'] != null)) {
				$('#content ul').append($("<a href='/offline/entities/edit/" + key + "'><li>" + data['idno'] + "</li></a>"));
				that.data.push(data);
				i++;
			}
		});
		$('#numresults').html(i);
		console.log(that.data);
	}
}

const count = ref(0)
</script>

<style lang="scss">
.searchblock {
	background-color: #f9f9f9;
	margin:-8px 10px 10px 10px;
	p.searchblock1 {
		padding:10px;
		font-size:0.8em;
		margin-bottom:0;
		input {
			padding:6px;
			border:1px solid lightgray;
			width:calc(100% - 170px);
		}
	}
	p.searchblock2 {
		margin-top: 0;
	}
}


.thumbnail-image {
	background-color: #eeeeee;
	padding:20px;
	margin-bottom:14px;
	img {
		height: 136px;
		object-fit: contain;
		width: 120px;
	}
}
.entitiesresults {
	margin:10px;
	border-bottom: 1px solid #eeeeee;
	> div {
		margin:4px 0 6px 0;
	}
	.ellipsis {
		display: inline;
	}
}
</style>
