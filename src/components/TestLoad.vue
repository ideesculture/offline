<template>
	<div id="content">TestLoad</div>
</template>

<script>
import { ref } from 'vue'
//import $ from 'jquery'

export default {
	data() {
		return {
			defaultdata: {
				_settings: {
					schema: {
						type: "object",
						properties: {
							idno: {
								type: "string"
							},
							preferred_labels: {
								type: "string"
							},
							ancien_num: {
								type: 'object',
								properties: {
									ancien_numero_texte: {
										type: "string"
									},
									type_num: {
										type: "string"
									},
									remarque: {
										type: "string"
									},
								}
							},
							auteur: {
								type: 'array',
								items: {
									type: 'object',
									properties: {
										preferred_labels: {
											type: "string"
										},
										relationship_type: {
											type: "string"
										},
									}
								}
							},
							titre_descriptif: {
								type: "string"
							},
							Date_prise_vue: {
								type: "string"
							},
						},
					},
					uischema: {
						type: 'VerticalLayout',
						elements: [
							{
								type: 'Control',
								scope: '#/properties/idno',
							},
							{
								type: 'Control',
								scope: '#/properties/preferred_labels',
							},
							{
								"type": "HorizontalLayout",
								"elements": [
									{
										type: 'Control',
										scope: '#/properties/ancien_num/properties/ancien_numero_texte',
									},
									{
										type: 'Control',
										scope: '#/properties/ancien_num/properties/type_num',
									},
									{
										type: 'Control',
										scope: '#/properties/ancien_num/properties/remarque',
									}
								]
							},
							{
								type: 'Control',
								scope: '#/properties/auteur',
							},
							{
								type: 'Control',
								scope: '#/properties/titre_descriptif',
							},
							{
								type: 'Control',
								scope: '#/properties/Date_prise_vue',
							}
						],
					},
				},
				"AV_B-1201": {
					"idno": "AV_B-1201",
					"preferred_labels": "Portrait de couple (publicité Harriet Hubbard Ayer)",
					"ancien_num": {
						"ancien_numero_texte": "B.1201",
						"type_num": "numéro auteur",
						"remarque": ""
					},
					"auteur": [
						{
							"preferred_labels": "Agnès VARDA",
							"relationship_type": "Auteur de la photographie"
						}
					],
					"titre_descriptif": "Portrait de couple (publicité Harriet Hubbard Ayer)",
					"Date_prise_vue": "vers 1960"
				},
				"50_531": { "idno": "50_531" },
				"50_532": { "idno": "50_532" }
			}
		}
	},
	mounted() {
		console.log(this.defaultdata);
		var data = this.defaultdata;
		Object.keys(data).forEach(function (k) {
			localStorage.setItem(k, JSON.stringify(data[k]));
			console.log(data[k]);
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
	clear: both;
	text-align: left;
	margin: auto;
	width: 1000px;
}
</style>
