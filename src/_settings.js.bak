export const _settings = Object.freeze({
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
									"children": "N° d\'inventaire"
								},
								{
									"$formkit": "text",
									"name": "idno",
									"validation": "required"
								},
								{
									"$el": "h3",
									"children": "Autres numéros"
								},
								{
									"$formkit": "repeater",
									"name": "users",
									"children": [
										{
											"$formkit": "text",
											"name": "autres_numeros",
											"label": "Autres numéros",
											"validation": "required"
										},
										{
											"$formkit": "select",
											"name": "type_numero",
											"label": "Type de numéro",
											"options": {
												"numprod": "numéro de production",
												"numnum": "numéro de numérisation",
												"numprov": "numéro provisoire",
												"ancnum": "ancien numéro",
												"numedi": "numéro d\'édition",
												"numsea": "numéro séance",
												"numvue": "numéro de la vue",
												"numaut": "numéro auteur",
												"numase": "numéro auteur séance",
												"numavu": "numéro auteur vue",
												"numres": "numéro de résolution"
											}
										},
										{
											"$formkit": "text",
											"name": "remarques",
											"label": "Remarques"
										}
									]
								},
								{
									"$el": "h3",
									"children": "Description"
								},
								{
									"$formkit": "textarea",
									"name": "description",
									"rows": "3"
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
