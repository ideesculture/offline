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
							<img v-else src="/noimage.png" style="width:100%" />
						</div>
						<span class='ellipsis'>{{ item.preferred_labels }}</span><br />
						<a :href="'/offline/edit/' + item.id">{{ item.idno }}</a>
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
		db.db_objects.each(function (item) {
			console.log(item);
			that.data.push(item.data);
			i++;
		});
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
