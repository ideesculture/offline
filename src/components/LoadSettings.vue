<template>
	<div id="content">Settings loaded</div>
	<router-link class="routerlink" to="/offline/objects/">OBJETS</router-link>

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
													type: "string",
													enum: ['numéro de production','numéro de numérisation','numéro provisoire','ancien numéro',"numéro d'édition",'numéro séance','numéro de la vue','numéro auteur','numéro auteur séance','numéro auteur vue','numéro de résolution'],
													default: "numéro de production"
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
														type: "string",
														enum: ['Auteur de la photographie','Auteur des œuvres photographiées','Auteur du tirage','Collecteur','Commanditaire','contributor','créateur','Découvreur','Dépositaire','Donateur','Éditeur','Fabricant','est le propriétaire du bien déposé','Etablissement affectataire','Exécutant','Imprimeur','Personne représentée','Prêteur','Producteur','Propriétaire','Rédacteur','Scénographe','Testateur','Valideur','Vendeur'],
														default:"Auteur de la photographie"
													},
												}
											}
										},
										titre_auteur: {
											type: "string"
										},
										titre_descriptif: {
											type: "string"
										},
										serie: {
											type: "string"
										},
										description: {
											type: "string"
										},
										Date_prise_vue: {
											type: "string"
										},
										date_tirage_: {
											type: "string"
										},
										lieu_prise_de_vue: {
											type: 'array',
											items: {
												type: 'object',
												properties: {
													preferred_labels: {
														type: "string"
													},
													relationship_type: {
														type: "string",
														enum: ["Décrit","Destination de sortie","Emplacement","Etait l'objet de la collection à","Lieu","Lieu de collecte","Lieu de conservation","Lieu de création ou d'éxécution","Lieu de découverte","Lieu de production","Lieu de propriété","Lieu de publication","Lieu de récolte","Lieu d'utilisation / destination","Représente"],
														default:"Lieu"
													},
												}
											}
										},
										themes: {
											type: "string",
											enum: ["Animaux","Architectures","Art","Cinéma","Corps","Industries","Loisirs","Mode","Musique","Nature morte","Paysages","Portraits","Portraits : Enfants","Publicités","Théâtre","Voyages"]
										},
										theme_mot_cles: {
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
											scope: '#/properties/titre_auteur',
											"options": {
												"multi": true
											}
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
											scope: '#/properties/serie'
										},
										{
											type: 'Control',
											scope: '#/properties/description',
											"options": {
												"multi": true
											}
										},
										{
											type: 'Control',
											scope: '#/properties/Date_prise_vue',
										},
										{
											type: 'Control',
											scope: '#/properties/date_tirage_'
										},
										{
											type: 'Control',
											scope: '#/properties/lieu_prise_de_vue',
										},
										{
											type: 'Control',
											scope: '#/properties/themes',
										},
										{
											type: 'Control',
											scope: '#/properties/theme_mot_cles',
										},
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
										etat_global_u : {
											"type": "object",
											properties: {
												"Très bon": {
													type: "boolean"
												},
												"Bon": {
													type: "boolean"
												},
												"Moyen": {
													type: "boolean"
												},
												"Rien à signaler": {
													type: "boolean"
												},
												"Mauvais": {
													type: "boolean"
												},
												"Très mauvais": {
													type: "boolean"
												},
												"A restaurer": {
													type: "boolean"
												}
											}
										},
										etat : {
											type: "string"
										},
										alte_obj : {
											"type": "object",
											properties: {
												"Adhésif": { type: "boolean"},
												"Cassé": { type: "boolean"},
												"Coups": { type: "boolean"},
												"Déchirure": { type: "boolean"},
												"Décollement en surface": { type: "boolean"},
												"Fissuré": { type: "boolean"},
												"Fragilisation du papier": { type: "boolean"},
												"Froissement": { type: "boolean"},
												"Frottement": { type: "boolean"},
												"Gondolement léger": { type: "boolean"},
												"Gondolement marqué": { type: "boolean"},
												"Griffes": { type: "boolean"},
												"Jaunissement": { type: "boolean"},
												"Lacune": { type: "boolean"},
												"Moisissures": { type: "boolean"},
												"Oxydation": { type: "boolean"},
												"Pliure": { type: "boolean"},
												"Rayures, griffes": { type: "boolean"},
												"Restauration visible": { type: "boolean"},
												"Reste (insecte)": { type: "boolean"},
												"Rongements (animal)": { type: "boolean"},
												"Salissures": { type: "boolean"},
												"Taches (origine)": { type: "boolean"},
												"Taches d’humidité": { type: "boolean"},
												"Trace d’ancien pli": { type: "boolean"},
												"Traces": { type: "boolean"},
												"Traces (insecte)": { type: "boolean"},
												"Trous": { type: "boolean"},
												"Usure": { type: "boolean"},
												"Voilé": { type: "boolean"},
											}
										},
										accessrestrict : {
											type: "string"
										},
										constatEtat : {
											type: "string"
										},
										conditions_conservation : {
											type: "string"
										},
									}
								},
								uischema: {
									type: 'VerticalLayout',
									label: "Etat global",
									class: "etat_global",
									elements: [										
										{
											"type": "HorizontalLayout",
											"elements": [
												{
													type: 'Control',
													scope: '#/properties/etat_global_u/properties/Très bon',
												},
												{
													type: 'Control',
													scope: '#/properties/etat_global_u/properties/Bon',
												},	
												{
													type: 'Control',
													scope: '#/properties/etat_global_u/properties/Moyen',
												},
												{
													type: 'Control',
													scope: '#/properties/etat_global_u/properties/Rien à signaler',
												},
												{
													type: 'Control',
													scope: '#/properties/etat_global_u/properties/Mauvais',
												},
												{
													type: 'Control',
													scope: '#/properties/etat_global_u/properties/Très mauvais',
												},
												{
													type: 'Control',
													scope: '#/properties/etat_global_u/properties/A restaurer',
												}
											]
										},
										{
											type: 'Control',
											scope: '#/properties/etat',
										},
										{
											"type": "HorizontalLayout",
											"elements": [
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Adhésif',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Cassé',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Coups',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Déchirure',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Décollement en surface',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Fissuré',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Fragilisation du papier',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Froissement',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Frottement',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Gondolement léger',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Gondolement marqué',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Griffes',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Jaunissement',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Lacune',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Moisissures',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Oxydation',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Pliure',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Rayures, griffes',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Restauration visible',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Reste (insecte)',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Rongements (animal)',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Salissures',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Taches (origine)',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Trous',
												},
												{
													type: 'Control',
													scope: '#/properties/alte_obj/properties/Voilé',
												}

											]
										},
										{
											type: 'Control',
											scope: '#/properties/accessrestrict',
										},
										{
											type: 'Control',
											scope: '#/properties/constatEtat',
										},
										{
											type: 'Control',
											scope: '#/properties/conditions_conservation',
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
