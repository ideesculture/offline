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
								schema: [
									{
										$el: 'h3',
										children: "N° d'inventaire"
									},
									{
										$formkit: 'text',
										name: 'idno',
										validation: 'required'
									},
									{
										$el: 'h3',
										children: 'Autres numéros'
									},
									{
										$formkit: 'repeater',
										name: 'users',
										children: [
											{
												$formkit: 'text',
												name: 'autres_numeros',
												// $index is available to children.
												label: 'Autres numéros',
												validation: 'required',
											},
											{
												$formkit: 'select',
												name: 'type_numero',
												label: 'Type de numéro',
												options: {
													numprod: "numéro de production",
													numnum: "numéro de numérisation",
													numprov: "numéro provisoire",
													ancnum: "ancien numéro",
													numedi: "numéro d'édition",
													numsea: "numéro séance",
													numvue: "numéro de la vue",
													numaut: "numéro auteur",
													numase: "numéro auteur séance",
													numavu: "numéro auteur vue",
													numres: "numéro de résolution"
												},
												//help: 'How often should we display a cookie notice?'
											},
											{
												$formkit: 'text',
												name: 'remarques',
												// $index is available to children.
												label: 'Remarques'
											},
										],
									},
									{
										$el: 'h3',
										children: 'Auteurs'
									},
									{
										$formkit: 'repeater',
										name: 'auteur',
										children: [
											{
												$formkit: 'text',
												name: 'preferred_labels',
												// $index is available to children.
												label: 'Auteur',
												validation: 'required',
											},
											{
												$formkit: 'select',
												name: 'relationship_type',
												label: 'Type de relation',
												options: {
													photo: "Auteur de la photographie",
													tirage: "Auteur du tirage",
													imprimeur: "Imprimeur",
													editeur: "Éditeur",
													Propriétaire: "Propriétaire",
													Dépositaire: "Dépositaire"
												},
											}
										],
									},
									{
										$el: 'h3',
										children: "Titre auteur"
									},
									{
										$formkit: 'textarea',
										name: 'preferred_labels',
										rows: "3",
										validation: 'required'
									},
									{
										$el: 'h3',
										children: 'Titre descriptif'
									},
									{
										$formkit: 'repeater',
										name: 'nonpreferred_labels',
										children: [
											{
												$formkit: 'textarea',
												name: 'nonpreferred_labels',
												rows: "2"
											},
										]
									},
									{
										$el: 'h3',
										children: "Description"
									},
									{
										$formkit: 'textarea',
										name: 'description',
										rows: "3"
									},
									{
										$el: 'h3',
										children: "Date tirage"
									},
									{
										$formkit: 'date',
										name: 'date_tirage',
										validation: 'required',
										placeholder: 'choisir une date'

									},
									{
										$el: 'h3',
										children: "Date de prise de vue"
									},
									{
										$formkit: 'date',
										name: 'date_prise_de_vue',
										placeholder: 'choisir une date'
									},
									{
										$el: 'h3',
										children: 'Lieux liés'
									},
									{
										$formkit: 'repeater',
										name: 'ca_places',
										children: [
											{
												$formkit: 'text',
												name: 'preferred_labels',
												// $index is available to children.
												label: 'Lieu',
												validation: 'required',
											},
											{
												$formkit: 'select',
												name: 'relationship_type',
												label: 'Type de relation',
												options: {
													prise_de_vue: "Lieu (prise de vue)",
												},
											}
										],
									},
									{
										$el: 'h3',
										children: 'Thèmes'
									},
									{
										$formkit: 'repeater',
										name: 'themes',
										children: [
											{
												$formkit: 'select',
												name: 'themes',
												options: {
													Animal: "Animal",
													Architecture: "Architecture",
													Art: "Art",
													Cinema: "Cinéma",
													Corps: "Corps",
													Industrie: "Industrie",
													Loisirs: "Loisirs",
													Mode: "Mode",
													Musique: "Musique",
													Nature_morte: "Nature morte",
													Paysage: "Paysage",
													Portrait: "Portrait",
													Enfant: "Enfant",
													Publicite: "Publicité",
													Theatre: "Théâtre",
													Voyage: "Voyage",
												},
											}
										],
									},
									{
										$el: 'h3',
										children: 'Mots-clés'
									},
									{
										$formkit: 'repeater',
										name: 'keywords',
										children: [
											{
												$formkit: 'text',
												name: 'keywords',
											}
										],

									}
								],
							},
							"informations techniques": {
								schema: []
							},
							"etat de conservation": {
								schema: []
							}
						},


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
