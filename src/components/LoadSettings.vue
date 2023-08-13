<template>
	<div id="content">Load Settings</div>
</template>

<script>
import { ref } from 'vue'
//import $ from 'jquery'

export default {
	data() {
		return {
			defaultdata: {
				_settings: {
					_editor: {
						ca_objects: {
							"informations descriptives": {
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
											"options": {
												"multi": true
											}
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
											"options": {
												"multi": true
											}
										},
										{
											type: 'Control',
											scope: '#/properties/Date_prise_vue',
										}
									],
								},
							},
							"informations techniques": {
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
										}
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
											"options": {
												"multi": true
											}
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
										}
									],
								},
							},
							"etat de conservation": {
								schema: {
									type: "object",
									properties: {
										idno: {
											type: "string"
										}
									}
								},
								uischema: {
									type: 'VerticalLayout',
									elements: [
										{
											type: 'Control',
											scope: '#/properties/idno',
										}
									],
								},
							}

						}
					}
				}
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
