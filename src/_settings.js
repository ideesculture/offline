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
									"children": "Référence IRPA"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.irpa"
								},
								{
									"$el": "h3",
									"children": "Appellation"
								},
								{
									"$formkit": "textarea",
									"name": "ca_objects.nonpreferred_labels",
									"rows": "3"
								},
								{
									"$el": "h3",
									"children": "Titre"
								},
								{
									"$formkit": "textarea",
									"name": "title",
									"rows": "3"
								},
								{
									"$el": "h3",
									"children": "Institutions liées"
								},
								{
									"$formkit": "text",
									"name": "ca_entities",
									"rows": "3"
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
									"children": "Catégorie"
								},
								{
									"$formkit": "text",
									"name": "ca_list_items",
									"rows": "3"
								},
								{
									"$el": "h3",
									"children": "Matériau (IRPA)"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.materiau",
									"rows": "3"
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
									"children": "Etat de conservation"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.etat_conservation",
									"rows": "3"
								},
								{
									"$el": "h3",
									"children": "Date (champs texte)"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.tournai_date",
									"rows": "3"
								},{
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
