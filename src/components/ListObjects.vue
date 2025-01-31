<template>
	<div id="list">
		<div class="container">
			<div class="col inspector">
				<div class="rechercher">
					<router-link class="routerlink" to="/offline/" style="color:black;text-decoration: none;">
						RECHERCHER OBJETS
					</router-link>
				</div>
			</div>
			<div class="col4">
				<div class="searchblock">
					<p class="searchblock1">Recherche : <input type="text" v-model="searchinput"></p>
					<p class="searchblock2" style="text-align: right;"><button @click="dosearch">🔍 Recherche</button></p>
				</div>
				<div class="numresultsblock">
					<span id="numresults">{{ numFilteredItems }}</span> objets
				</div>
				<div class="results">
					<div v-for="item in filteredItems">
						<div class="thumbnail-image"> 
							<img v-if="item.default_representation" :src="item.default_representation" />
							<div v-else style="width:100%">
								{{ noimage }}
							</div>
						</div>
						<span class='ellipsis'>{{ item.title }}</span><br />
						<a :href="'/offline/object/' + item.id">{{ item.idno.value }}</a>
						<ul />
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { ref } from 'vue'
import $ from 'jquery'
import {db} from '../db'

const noimage = '<svg id="Calque_2" data-name="Calque 2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.61 130.61"><defs><style>.cls-1 {fill: #676767;}</style></defs><g id="Calque_1-2" data-name="Calque 1"><g><path class="cls-1" d="M194.61,0v130.61H0V0h194.61ZM189.12,5.48H6.24l-.75.75v101.44l58.13-56.85,50.47,49.83,35.36-34.38,39.67,38.9V5.48Z"/><ellipse class="cls-1" cx="123.09" cy="43.03" rx="14.26" ry="14.25"/></g></g></svg>';

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
				if(!item.title) return false;
				return item.title.toLowerCase().indexOf(this.search.toLowerCase()) > -1;
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
	async mounted() {
		$('#content').append($("<ul></ul>"));
		let that=this;
		let i = 0;
		let objects = await db.db_objects.toArray();
		//console.log(objects);
		// loop through all of the array objects
		for(let item of objects) {
			item.data.title = item.data.preferred_labels.fr_FR[0].name;
			item.data.id = item.id;
			// loop through all item.data.representations
			item.data.default_representation = noimage;
			if(item.data.representations !== undefined) {
				Object.values(item.data.representations).forEach(function(value) {
					if (value.is_primary == "1") {
						console.log(value.urls.preview170);
						item.data.default_representation = value.urls.preview170;
						// if the url contains ".lescollections.test", replace it with ".lescollections.be"
						item.data.default_representation = item.data.default_representation.replace(".lescollections.test", ".lescollections.be");
						// we only need the first one
						//return;
					}
				});
			}
			that.data.push(item.data);
			console.log(item);
			i++;
		}
		$('#numresults').html(i);
		console.log(that.data);
	}
}
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
</style>
