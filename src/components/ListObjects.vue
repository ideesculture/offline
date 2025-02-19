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
				<div>
					<span @click="newObject" style="border:1px solid #ccc;padding:10px;background-color: #eee;margin-left:10px;">✚ Ajouter un objet</span>
				</div>
				<div class="numresultsblock">
					<span id="numresults">{{ numFilteredItems }}</span> objets
				</div>
				<div class="results">
					<div v-for="item in filteredItems">
						<div class="thumbnail-image"> 
							<img v-if="item.default_representation" :src="item.default_representation" />
							<img v-else :src="'/offline/noimage.png'" style="width:100%" />
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

const noimage = 'data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0iVVRGLTgiPz4KPHN2ZyBpZD0iQ2FscXVlXzIiIGRhdGEtbmFtZT0iQ2FscXVlIDIiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgdmlld0JveD0iMCAwIDE5NC42MSAxMzAuNjEiPgogIDxkZWZzPgogICAgPHN0eWxlPgogICAgICAuY2xzLTEgewogICAgICAgIGZpbGw6ICM2NzY3Njc7CiAgICAgIH0KICAgIDwvc3R5bGU+CiAgPC9kZWZzPgogIDxnIGlkPSJDYWxxdWVfMS0yIiBkYXRhLW5hbWU9IkNhbHF1ZSAxIj4KICAgIDxnPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTEiIGQ9Ik0xOTQuNjEsMHYxMzAuNjFIMFYwaDE5NC42MVpNMTg5LjEyLDUuNDhINi4yNGwtLjc1Ljc1djEwMS40NGw1OC4xMy01Ni44NSw1MC40Nyw0OS44MywzNS4zNi0zNC4zOCwzOS42NywzOC45VjUuNDhaIi8+CiAgICAgIDxlbGxpcHNlIGNsYXNzPSJjbHMtMSIgY3g9IjEyMy4wOSIgY3k9IjQzLjAzIiByeD0iMTQuMjYiIHJ5PSIxNC4yNSIvPgogICAgPC9nPgogIDwvZz4KPC9zdmc+';

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
		},
		async newObject() {
			let id = Math.round(Math.random() * 1000000).toString();
			let data = {
				"ok": true,
				"preferred_labels": {
					"fr_FR": [
						{
							"name": "NOUVEL OBJET..."
						}
					]
				},
				"intrinsic": {
					"parent_id": "05R0456",
					"hier_object_id": "4471",
					"type_id": "27",
					"idno": "TEST",
					"idno_sort": "TEST",
					"is_deaccessioned": "0",
					"deaccession_date": "",
					"deaccession_disposal_date": "",
					"deaccession_notes": "",
					"hier_left": "9464301.00000000000000000000",
					"hier_right": "9464401.00000000000000000000",
					"extent": "0",
					"extent_units": "",
					"access": "0",
					"status": "0",
					"deleted": "0",
					"rank": "0",
					"acl_inherit_from_ca_collections": "0",
					"acl_inherit_from_parent": "1",
					"access_inherit_from_parent": "0",
					"view_count": "0"
				},
				"parent_id": {
					"value": "678"
				},
				"hier_object_id": {
					"value": "4471"
				},
				"type_id": {
					"value": "27"
				},
				"idno": {
					"value": "TEST"
				},
				"idno_sort": {
					"value": "TEST"
				},
				"is_deaccessioned": {
					"value": "0"
				},
				"deaccession_date": {
					"value": ""
				},
				"deaccession_disposal_date": {
					"value": ""
				},
				"deaccession_notes": {
					"value": ""
				},
				"hier_left": {
					"value": "9464301.00000000000000000000"
				},
				"hier_right": {
					"value": "9464401.00000000000000000000"
				},
				"extent": {
					"value": "0"
				},
				"extent_units": {
					"value": ""
				},
				"access": {
					"value": "0",
					"display_text": {
						"fr_FR": "non accessible au public"
					}
				},
				"status": {
					"value": "0",
					"display_text": {
						"fr_FR": null
					}
				},
				"deleted": {
					"value": "0"
				},
				"rank": {
					"value": "0"
				},
				"acl_inherit_from_ca_collections": {
					"value": "0"
				},
				"acl_inherit_from_parent": {
					"value": "1"
				},
				"access_inherit_from_parent": {
					"value": "0"
				},
				"view_count": {
					"value": "0"
				},
				"num_comments": 0,
				"representations": {},
				"related": {
					"ca_list_items": [
					],
					"ca_object_representations": [
					],
					"ca_storage_locations": []
				},
				"title": "NOUVEL OBJET..."
			};
			data.id = id;
			let result = await db.db_objects.put({id: data.id, idno: id, data: data}).then(function(result) {
				return true;
				// force reload
				
			});
			console.log("result", result);
			console.log("new");
			// force reload
			this.$router.go();
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
			item.data.default_representation = "/offline/noimage.png";
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
