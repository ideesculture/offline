<template>
	<div id="edit">
		<div class="container">
			<div class="col inspector">
				<div class="resultats">
					<router-link class="routerlink" to="/offline/" style="color:black;">
						RÉSULTATS
					</router-link>
				</div>
				<p style="padding:4px 20px;">
					Occurrence en cours de modification : <br />
					<b>{{ preferred_labels }}</b><br /> ({{ idno }})
				</p>
				<div style="text-align: center;padding:10px;border-bottom:2px solid #eeeeee;">
					<img class="thumbnail" :src="data._default_representation">
				</div>
				<div class="screens">
					<div v-for="screen in screens" :class="((screen == active) ? 'active ' : '') + 'screen'"
						@click="loadScreen(screen)">
						{{ screen }}
					</div>
				</div>
			</div>
			<div class="col4">
				<div class="formkitContainer">
					<FormKit type="form" v-model="data" @submit="register">
						<FormKitSchema :schema="schema" />
					</FormKit>

					<!--<hr/> <pre wrap>{{ data }}</pre> -->
					<p>
						<button class="saveButton info" @click="save">Enregistrer</button>&nbsp;
						<router-link class="routerlink" to="/offline/">
							<button class="cancelButton">Annuler</button>
						</router-link>
					</p>
				</div>
				<div class="dataContainer">
					<button @click="toggleData(true)" class="button">➕</button> / <button class="button" @click="toggleData(false)" >➖</button>
					<pre id="data">
						{{ data }}
					</pre>
				</div>
			</div>
			
		</div>
	</div>
</template>

<script>
import { defineComponent, ref, toHandlers } from 'vue';
import { FormKitSchema } from '@formkit/vue'
import $ from 'jquery'
import { db } from '../db'

export default defineComponent({
	components: {
	},

	data() {
		return {
			data: {},
			formerdata: {},
			_settings: {},
			schema: [],
			id: this.$route.params.id,
			// default & active screen name
			default: "",
			active: "",
			activeStep: "first",
			saveDisabled: true,
			screens: [],
			idno: "",
			preferred_labels: ""
		}
	},
	methods: {
		machin(text) {
			console.log("machin");
			console.log(text);
		},
		register(thisdata) {
			console.log("register");
			console.log(thisdata);
		},
		onChange(event) {
			this.data = event.data;
		},
		save() {
			//localStorage[this.id] = JSON.stringify(this.data);
			console.log("saved");
			console.log("this.data", this.data);
		},
		loadScreen(screen) {
			this.active = screen;
			// set the current screen schema & uischema
			//this.data.activeStep = "first";
			let that = this;
			// Jquery needs a small time to be able to find the elements
			setTimeout(function () {
				/*$(".formkitContainer section").each(function () {
					if ($(this).attr("class") !== screen) {
						$(this).hide();
					} else {
						$(this).show();
					}
				});*/
			}, 100);
		},
		toggleData(truefalse) {
			if (truefalse) {
				$("#data").slideDown();
			} else {
				$("#data").slideUp();
			}
		}
	},
	computed: {

	},
	mounted() {
		this.item_id = this.$route.params.id;
		this._settings = {
			"_editor": {
				"ca_occurrences": {
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
										"class": "Informations descriptives"
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
		};
		//this._settings = JSON.parse(localStorage["_settings"]);
		//console.log("_settings", this._settings);
		// screen names are inside _settings._editor.ca_objects
		// we take the first one
		//this.schema = this._settings._editor.ca_occurrences.schema; //[];
		//this.schema = ;
		this.screens = this._settings._editor.ca_occurrences.screens;
		this.default = this.screens[0];
		this.schema = this._settings._editor.ca_occurrences.schema[0];
		this.active = this.default;

		this.loadScreen(this.active);

		// load data
		//this.data = db.db_objects.get(this.item_id);

		let that = this;
		that.data = {};
		db.db_occurrences.get(this.item_id).then(function (item) {
			//console.log(item);
			that.data = JSON.parse(item.data);
			//console.log();
			that.idno = that.data.idno.value;
			that.preferred_labels = that.data.preferred_labels.fr_FR[0].name;
			//that.data = item.data;
			//that.formerdata = that.data;
		});

	}
});

const count = ref(0)
</script>

<style lang="scss">
.formkitContainer {
	padding: 0 40px;
}

#edit {
	clear: both;
	text-align: left;
	margin: auto;
	max-width: 1000px;
	padding: 2px 8px 8px 8px;
	z-index: 50;
	position: relative;
}

/* JSON FORM STYLES */


/* end of JSON FORM styling */
.saveButton {}

.saveButton:disabled {
	cursor: not-allowed;
	background: lightgray;
	border: 0;
}

.container h3 {
	padding-left: 24px;
}

.screens .screen {
	padding: 4px 10px;
	font-size: 0.9em;
	text-transform: uppercase;
	cursor: pointer;
}

.screens .screen.active {
	background-color: #eeeeee;
}

img.thumbnail {
	max-width: 100%;
}

div.formkit-outer {}

[data-type="repeater"]>.formkit-fieldset {
	padding: 0;
	border: none;
}

.formkit-outer.formkit-add-button {
	margin-top: -8px;
	margin-left: 4px;

	button {
		border-radius: 0 0 6px 6px;
		background-color: darkgray;
		padding-top: 6px;
		padding-bottom: 6px;
	}

}

.formkit-actions {
	display: none;
}

.formkit-wrapper,
.formkit-fieldset {
	max-width: 100%;
}

form h3 {
	background: #21b6c9;
	color: white;
	padding: 4px;
	padding-left: 6px !important;
	border-radius: 4px 4px 0 0;
	margin-bottom: 0;
}

.formkit-controls {
	padding: 4px;

	>li {
		margin: 2px 0;
		flex: 0 0 0.8em;
		width: 0.8em;
	}
}

.formkit-outer {
	margin-bottom: 8px;
}

.formkit-input {
	padding-top: 6px;
	padding-bottom: 6px;
	padding-left: 6px;
}

.dataContainer {
	padding:40px;
	#data{
		display: none;
	}
} 
</style>
