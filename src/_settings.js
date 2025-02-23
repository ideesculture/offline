export const _settings = Object.freeze({
	_locale: "fr_FR",
    _editor:  {
		"ca_objects": {
			"schema": [
				{
					"$el": "div",
					"attrs": {
						"class": "form-body"
					},
					"children": [
						{
							"$el": "section",
							"attrs": {
								"class": "Saisie objets"
							},
							"children": [
								{
									"$el": "h3",
									"children": "Appellation"
								},
								{
									"$formkit": "repeater",
									"name": "ca_objects.preferred_labels",
									"rows": "3",
									children: [
										{
										  $formkit: 'text',
										  name: 'name'
										}
									]
								},
								{
									"$el": "h3",
									"children": "Titre"
								},
								{
									"$formkit": "textarea",
									"name": "ca_objects.nonpreferred_labels",
									"rows": "3"
								},
								{
									"$el": "h3",
									"children": "Référence IRPA"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.irpa"
								},
								{
									"$el": "h3",
									"children": "Lien images IRPA"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.ref_image_irpa"
								},
								{
									"$el": "h3",
									"children": "Objet existant"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.objet_present",
									"rows": "3"
								},
								{
									"$el": "h3",
									"children": "Localisation"
								},
								{
									"$formkit": "repeater",
									"name": "ca_storage_locations",
									"rows": "3",
									children: [
										{
										  $formkit: 'text',
										  name: 'name'
										}
									]
								},
								{
									"$el": "h3",
									"children": "Précisions sur la localisation"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.precision_localisation",
									"rows": "3"
								},
								{
									"$el": "h3",
									"children": "Remarques liées au dépôt"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.depot_remarques",
									"rows": "3"
								},
								{
									"$el": "h3",
									"children": "Type d'objet IRPA"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.irpa_objet_type",
									"rows": "3"
								},
								
								{
									"$el": "h3",
									"children": "Catégorie"
								},
								{
									"$formkit": "repeater",
									"name": "ca_list_items",
									"rows": "3",
									children: [
										{
										  $formkit: 'text',
										  name: 'name_singular'
										}
									]
								},
								
								{
									"$el": "h3",
									"children": "Matériau (IRPA)"
								},
								{
									"$formkit": "repeater",
									"name": "ca_objects.materiau",
									"rows": "3",
									children: [
										{
										  $formkit: 'text',
										  name: 'materiau'
										}
									]
								},
								{
									"$el": "h3",
									"children": "Technique"
								},
								{
									"$formkit": "repeater",
									"name": "ca_objects.cipar_techniques",
									"rows": "3",
									children: [
										{
										  $formkit: 'text',
										  name: 'cipar_techniques'
										}
									]
								},
								{
									"$el": "h3",
									"children": "Dimensions"
								},
								{
									"$formkit": "repeater",
									"name": "ca_objects.dimensions",
									"rows": "3",
									children: [
										{
										  $formkit: 'text',
										  name: 'hauteur',
										  help: 'Hauteur'
										},
										{
											$formkit: 'text',
											name: 'largeur',
											help: 'Largeur'
										},
										{
											$formkit: 'text',
											name: 'profondeur',
											help: 'Profondeur'
										},
										{
											$formkit: 'text',
											name: 'diametre',
											help: 'Diamètre'
										},
										{
											$formkit: 'text',
											name: 'poids',
											help: 'Poids'
										},
										{
											$formkit: 'text',
											name: 'measurement_notes',
											help: 'Notes'
										}
									]
								},
								{
									"$el": "h3",
									"children": "Dimensions (IRPA)"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.irpa_dimensions",
									"rows": "3"
								},
								{
									"$el": "h3",
									"children": "Etat de conservation"
								},
								{
									"$formkit": "repeater",
									"name": "ca_objects.etat_conservation",
									"rows": "3",
									children: [
										{
											$formkit: 'select',
											name: 'etat',
											label: "État",
											options: ["bon", "mauvais", "moyen", "urgent"]
										},
										{
											$formkit: 'datepicker',
											name: 'etat_date',
											label: "Date",
											format : "DD/MM/YYYY"
										},
										{
											$formkit: 'text',
											name: 'commentaire',
											label: "Commentaire"
										}
										  
									]
								},
								{
									"$el": "h3",
									"children": "Auteur"
								},
								{
									"$formkit": "repeater",
									"name": "ca_entities",
									"rows": "3",
									children: [
										{
										  $formkit: 'autocomplete',
										  name: 'displayname',
										  label: "Personne liée ...",
										  placeholder: "...",
										  caRelatedTable: "ca_entities"
										},
										{
											$formkit: 'select',
											name: 'relation',
											label: "Relation",
											options: ["atelier", "auteur", "contributeur", "dessinateur", "editeur", "donateur", "depositaire", "graveur", "maitre verrier", "orfevre", "peintre", "proprietaire", "sculpteur"]
										}
										  
									]
								},
								{
									"$el": "h3",
									"children": "Datation"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.tournai_date",
									"rows": "3"
								},
								{
									"$el": "h3",
									"children": "Datation (IRPA)"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.date",
									"rows": "3"
								},
								{
									"$el": "h3",
									"children": "Remarques"
								},
								{
									"$formkit": "textarea",
									"name": "ca_objects.internal_notes",
									"rows": "10"
								},
								
								{
									"$el": "h3",
									"children": "N° automatique"
								},
								{
									"$formkit": "text",
									"name": "idno",
									"validation": "required"
								}
							]
						},
						{
							"$el": "section",
							"attrs": {
								"class": "Infos admin"
							},
							"children": [
								{
									"$el": "h3",
									"children": "Code Fabrique"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.code_fabrique"
								},
								{
									"$el": "h3",
									"children": "code_eglise_prec"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.code_eglise_prec",
									"validation": "required"
								},
								{
									"$el": "h3",
									"children": "Numéro auto"
								},
								{
									"$formkit": "text",
									"name": "idno",
									"validation": "required"
								},
								{
									"$el": "h3",
									"children": "Ancien numéro de référence"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.ancien_num_reference",
									"validation": "required"
								},
								{
									"$el": "h3",
									"children": "Bien classé Trésor"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.bien_classe_tresor",
									"validation": "required"
								},
								{
									"$el": "h3",
									"children": "Bien d'intérêt patrimonial"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.bien_interet_patrimonial",
									"validation": "required"
								},
								{
									"$el": "h3",
									"children": "Bien à protéger"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.bien_a_proteger",
									"validation": "required"
								},
								{
									"$el": "h3",
									"children": "Bien culturel"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.bien_culturel",
									"validation": "required"
								},
								{
									"$el": "h3",
									"children": "Plan d'urgence"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.plan_urgence",
									"validation": "required"
								},
								{
									"$el": "h3",
									"children": "Fiche fantôme"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.plan_urgence",
									"validation": "required"
								}
							]
						}
					]
				}
			],
			"screens": [
				"Saisie objets",
				"Infos admin"
			]
		}
	}
});
