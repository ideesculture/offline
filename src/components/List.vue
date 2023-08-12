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
					<p class="searchblock1">Recherche : <input type="text" v-model="search"></p>
					<p class="searchblock2" style="text-align: right;"><button>🔍 Recherche</button></p>
				</div>
				<div class="numresultsblock">
					<span id="numresults"></span> objets
				</div>
				<div class="results">
					<div v-for="item in data">
						<div class="thumbnail-image"> 
							<img v-if="item._default_representation" :src="item._default_representation" />
							<img v-else src="/noimage.png" style="width:100%" />
						</div>
						<span class='ellipsis'>{{ item.preferred_labels }}</span><br />
						<a :href="'http://localhost:5173/offline/edit/ca_objects_' + item.id">{{ item.idno }}</a>
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
import useLocalStorage from '../useLocalStorage'

export default {
	data() {
		return {
			data: [],
			search: ""
		}
	},
	filteredItems() {
      return this.data.filter(item => {
         return item.preferred_labels.toLowerCase().indexOf(this.search.toLowerCase()) > -1
      })
    },
	mounted() {
		$('#content').append($("<ul></ul>"));
		let that=this;
		let i = 0;
		$.each(localStorage, function (key, value) {
			if(typeof value != 'string') return;
			var data = JSON.parse(value);
			//console.log(data);
			if (data.idno != undefined) {
				$('#content ul').append($("<a href='/offline/edit/" + key + "'><li>" + data['idno'] + "</li></a>"));
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

<style lang="scss" scoped>
#list {
	clear: both;
	text-align: left;
	margin: auto;
	max-width: 1000px;
	padding: 2px 8px 8px 8px;
	z-index:50;
	position:relative;

	textarea {
		width: calc(100% - 28px);
		min-height: 300px;
	}
}

.read-the-docs {
	color: #888;
}

#content {
	clear: both;
	text-align: left;
	margin: auto;
	width: 1000px;
}

.results {
	display: flex;
	flex-wrap: wrap;

	> div {
		flex:0 1 calc(25% - 20px);
		width:calc(25% - 20px);
		text-align: center;
		padding:10px;
	}
	ul {
		border-bottom:2px solid #eeeeee;
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
.ellipsis {
	width:170px;
	text-overflow: ellipsis;
	display: inline-block;
	height:22px;
	overflow: hidden; /* to hide anything that doesn't fit in the containing element. */
    white-space: nowrap; /* to make sure the line doesn't break when it is longer than the containing div. */
    
}
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
.numresultsblock {
	border-bottom: 4px solid #e9e9e9;
	margin:-8px 10px 10px 10px;
	padding:10px 10px 2px 10px;
	font-size:0.8em;
	text-align: center;
}
</style>
