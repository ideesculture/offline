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
								"class": "Identification"
							},
							"children": [
								{
									"$el": "h3",
									"children": "Référence IRPA"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.irpa",
									"validation": "required"
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
									"$formkit": "textarea",
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
									"$formkit": "text",
									"name": "ca_objects.technique",
									"rows": "3"
								},
								{
									"$el": "h3",
									"children": "Dimensions"
								},
								{
									"$formkit": "text",
									"name": "ca_objects.dimensions",
									"rows": "3"
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
						}
					]
				}
			],
			"screens": [
				"Identification",
				"Description"
			]
		}
	}
});
