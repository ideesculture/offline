<template>
  <div id="content">TestLoad</div>
</template>

<script>
import { ref } from 'vue'
//import $ from 'jquery'

export default {
	data() {
		return {
			defaultdata : "{\"AV_B-1201\":{\"idno\":\"AV_B-1201\",\"preferred_labels\":\"Portrait de couple (publicité Harriet Hubbard Ayer)\",\"ancien_num\":{\"ancien_numero_texte\":\"B.1201\",\"type_num\":\"numéro auteur\",\"remarque\":\"\"},\"auteur\":[{\"preferred_labels\":\"Agnès VARDA\",\"relationship_type\":\"Auteur de la photographie\"}],\"titre_descriptif\":\"Portrait de couple (publicité Harriet Hubbard Ayer)\",\"Date_prise_vue\":\"vers 1960\"},\"50_531\":{\"idno\":\"test\"},\"50_532\":{\"idno\":\"test\"}, \"50_531\":{\"idno\":\"test\"}, \"50_532\":{\"idno\":\"test\"}}",
		}
	},
  mounted() {
		console.log(this.defaultdata);
		var data = JSON.parse(this.defaultdata);
		Object.keys(data).forEach(function (k) {
			localStorage.setItem(k, JSON.stringify(data[k]));
		});
  }
}

const count = ref(0)
</script>

<style scoped>
.read-the-docs {
  color: #888;
}
#content {
	clear:both;
	text-align: left;
	margin:auto;
	width:1000px;
}
</style>
