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
					Objet en cours de modification : <br />
					<b>{{ data.title }}</b><br /> ({{ data.idno }})
				</p>
				<div style="text-align: center;padding:10px;border-bottom:2px solid #eeeeee;">
					<img class="thumbnail" :src="edit.default_representation">
				</div>
				<div class="screens">
					<div v-for="screen in screens" :class="((screen == active) ? 'active ' : '') + 'screen'"
						@click="loadScreen(screen)">
						{{ screen }}
					</div>
					<div class="screen" @click="loadMediaScreen()">
						MEDIA
					</div>
					<div class="screen" @click="loadModificationsScreen()">
						LOG EN ATTENTE
					</div>
				</div>
			</div>
			<div class="col4">
				<div v-if="dataHasChanged" style="padding:4px;text-align: right;">
					<span
						style="background-color:#57b3c6;color:white;padding:4px 8px;border-radius: 8px;display: inline-block;">Données
						modifiées</span>
				</div>
				<div class="medias_container">
					<h3>MEDIA</h3>
					<div style="border:1px solid black;border-radius: 0.25em;padding:6px;">
						<span v-for="offline_representation in edit.offline_representations">
							<img :src="offline_representation"
								style="display:inline-block;width:100px;height:100px;margin:4px;" />
						</span>
					</div>
				</div>
				<div class="modifications_container" v-if="modifications">
					<h3>LOG DES MODIFICATIONS EN ATTENTE</h3>
					<div style="border:1px solid black;border-radius: 0.25em;padding:6px;">
						<table style="width:100%;">
							<tr>
								<th style="width:100px">Modification</th>
								<th style="width:100px">Path</th>
								<th>Avant</th>
								<th>Après</th>
							</tr>
							<tr v-for="modification in modifications">
								<template v-if="modification.kind == 'A'">
								</template>
								<template v-else>
									<td>{{ modification.kind }}</td>
									<td>{{ modification.path }}</td>
									<td>{{ modification.lhs }}</td>
									<td>{{ modification.rhs }}</td>
								</template>
							</tr>
						</table>
					</div>
				</div>

				<div class="formkitContainer">
					<FormKit type="form" v-model="edit">
						<FormKitSchema :schema="schema" />
					</FormKit>

					<p>
						<button :disabled="saveDisabled" class="saveButton info"
							@click="save">Enregistrer</button>&nbsp;
						<router-link class="routerlink" to="/offline/">
							<button class="cancelButton">Annuler</button>
						</router-link>
					</p>
				</div>


			</div>
		</div>
	</div>

</template>

<script>
import { defineComponent, ref, toHandlers, isProxy, toRaw } from 'vue';
import { FormKitSchema } from '@formkit/vue'
import { _ } from 'lodash'
import $ from 'jquery'
import { db } from '../db'
import { _settings } from '../_settings'
import { DeepDiff } from 'deep-diff';

var edit = {};

async function searchEntities({search}) {
	if (!search) return [];
	if (typeof search !== 'string') return [];

	const found = await db.db_entities.where("label").startsWithIgnoreCase(search).toArray();
	console.log("found", found);
	found.forEach(function (value) {
		value.value = value.label;
		delete value.id;
		delete value.data;
		delete value.idno;
	});
	//return found;
	return found;
}

// TODO : searchStorageLocations, searchCollections, searchObjects...

async function injectCaRelatedTableValues(obj, key, targetValue, newValue) {
	var result;
	if (obj) {
		for (var prop in obj) {
			if (obj.hasOwnProperty(prop)) {
				if (prop === key) {
					// found a target property
					if(obj[prop] === targetValue) {
						//remove obj[prop]
						delete obj[prop];
						// add new value
						obj["options"] = newValue;
						return true;
					} else {
						// not the right one, continue
						continue;
					}
				} else if (typeof obj[prop] === 'object') {
					result = await injectCaRelatedTableValues(obj[prop], key, targetValue, newValue);
					if (result) break;
				}
			}
		}
	}
	return result;
}

export default defineComponent({
	components: {
	},

	data() {
		return {
			dataHasChanged: false,
			data: {}, // original data
			edit: {}, // editable data,
			_edit: {}, // copy of the original data, as an editable to make comparison
			_settings: {},
			schema: [],
			id: this.$route.params.id,
			// default & active screen name
			default: "",
			active: "",
			activeStep: "first",
			saveDisabled: true,
			screens: [],
			watchEdit: true,
			modifications: []
		}
	},
	methods: {
		onChange(event) {
			this.data = event.data;
		},
		async save() {
			//localStorage[this.id] = JSON.stringify(this.data);
			let that = this;
			let editToSave = JSON.parse(JSON.stringify(that.edit));
			await db.db_objects.get(this.item_id).then(function (item) {
				let result = db.db_objects.update(that.item_id, { edit: editToSave });
				console.log("result", result);
				return true;
			});
			let _editToSave = JSON.parse(JSON.stringify(that._edit));
			await db.db_objects.get(this.item_id).then(function (item) {
				let result = db.db_objects.update(that.item_id, { _edit: _editToSave });
				console.log("result", result);
				return true;
			});
			console.log("saved");
		},
		loadScreen(screen) {
			this.active = screen;
			// set the current screen schema & uischema
			//this.data.activeStep = "first";
			let that = this;
			$(".medias_container").hide();
			$(".modifications_container").hide();
			// Jquery needs a small time to be able to find the elements
			setTimeout(function () {
				$(".formkitContainer section").each(function () {
					if ($(this).attr("class") !== screen) {
						$(this).hide();
					} else {
						$(this).show();
					}
				});
			}, 100);
		},
		loadMediaScreen() {
			this.active = "media";
			let that = this;
			// Jquery needs a small time to be able to find the elements
			setTimeout(function () {
				$(".medias_container").show();
				$(".formkitContainer section").each(function () {
					$(this).hide();
				});
				$('.modifications_container').hide();
			}, 100);
		},
		loadModificationsScreen() {
			this.active = "modifications";
			let that = this;
			// Jquery needs a small time to be able to find the elements
			setTimeout(function () {
				$(".medias_container").hide();
				$(".formkitContainer section").each(function () {
					$(this).hide();
				});
				$('.modifications_container').show();
			}, 100);
		}
	},
	computed: {

	},
	beforeUnmount() {
		if (this.saveDisabled && !this.dataHasChanged) {
			// if the data has not changed, remove the edit object
			db.db_objects.update(this.item_id, { edit: null });
		}
	},
	async mounted() {
		console.log("mounted");
		this.edit = {};
		this.item_id = this.$route.params.id;
		let test = await injectCaRelatedTableValues(_settings, "caRelatedTable", "ca_entities", searchEntities);
		console.log("test", test);
		console.log("_settings", _settings);

		this._settings = _settings;

		this.screens = this._settings._editor.ca_objects.screens;
		this.default = this.screens[0];
		this.schema = this._settings._editor.ca_objects.schema[0];

		

		this.active = this.default;
		this.loadScreen(this.active);

		// load data
		this.data = db.db_objects.get(this.item_id);
		console.log(this.item_id);
		let that = this;
		let result = await db.db_objects.get(this.item_id).then(function (item) {
			if (item.edit == null) {
				console.log("this object has not already been edited.");
			} else {
				console.log("this object has already been edited.");
				console.log(item.edit);
				return true;
			}


			//console.log(item);

			item.data.title = item.data.preferred_labels.fr_FR[0].name;
			edit.title = item.data.title;

			item.data.idno = item.data.idno.value;
			edit.idno = item.data.idno;

			// Treatment for complex data storage, where the first element is the one we want to display, and the locale to extract is fr_FR
			console.log("item.data", item.data);
			let temp_value = "";
			let temp = [];

			if (item.data.nonpreferred_labels) {
				edit['ca_objects.nonpreferred_labels'] = item.data.nonpreferred_labels[_settings._locale][0].name;
				console.log("nonpreferred_labels", item.data.nonpreferred_labels[_settings._locale][0].name);
			}

			if (item.data.preferred_labels) {
				temp = [];
				item.data.preferred_labels[_settings._locale].forEach(function (value) {
					temp.push({ name: value.name });
				});
			}
			edit['ca_objects.preferred_labels'] = temp;

			let conteneurs_targets = [
				{ conteneur: 'objet_present', target: 'objet_present' },
				{ conteneur: 'irpa', target: 'irpa' },
				{ conteneur: 'etat_conservation', target: 'etat' },
				{ conteneur: 'code_fabrique', target: 'code_fabrique' },
				{ conteneur: 'depot_remarques', target: 'depot_remarques' },
				{ conteneur: 'exemple_numero_auto', target: 'exemple_numero_auto' },
				{ conteneur: 'ref_image_irpa', target: 'ref_image_irpa' },
				{ conteneur: 'irpa_dimensions', target: 'irpa_dimensions' },
				{ conteneur: 'irpa_objet_type', target: 'irpa_objet_type' },
				{ conteneur: 'internal_notes', target: 'internal_notes' },
				{ conteneur: 'ancien_num_reference', target: 'ancien_num_reference' }
			];

			temp_value = "";
			conteneurs_targets.forEach(function (conteneur_target) {
				if (item.data['ca_objects.' + conteneur_target.conteneur]) {
					temp_value = Object.values(item.data['ca_objects.' + conteneur_target.conteneur])[0][_settings._locale][conteneur_target.target];
					if (temp_value) {
						edit['ca_objects.' + conteneur_target.target] = temp_value.replace(/<br[\s]\/>/gm, "");
					}

				}
			});


			// Techniques : répétable
			let target = 'cipar_techniques';
			temp = [];
			if (item.data['ca_objects.' + target] && typeof item.data['ca_objects.' + target] === 'object') {
				Object.values(item.data['ca_objects.' + target]).forEach(function (value) {
					temp.push({ cipar_techniques: value[_settings._locale][target] });
				});
			}
			edit['ca_objects.' + target] = temp;

			target = "date";
			if (item.data['ca_objects.date']) {
				edit['ca_objects.date'] = Object.values(item.data['ca_objects.date'])[0][_settings._locale]["dates_value"];
			}

			// materiau : répétable
			target = 'materiau';
			temp = [];
			if (item.data['ca_objects.' + target] && typeof item.data['ca_objects.' + target] === 'object') {
				Object.values(item.data['ca_objects.' + target]).forEach(function (value) {
					temp.push({ [target]: value[_settings._locale][target] });
				});
			}
			edit['ca_objects.' + target] = temp;

			// Relations répétables
			let relations_targets = [
				{ relation: 'ca_entities', target: 'displayname' },
				{ relation: 'ca_storage_locations', target: 'name' },
				{ relation: 'ca_list_items', target: 'name_singular' }
			]
			relations_targets.forEach(function (relation_target) {
				temp = [];
				if (item.data['related']) {
					if (item.data['related'][relation_target["relation"]]) {
						Object.values(item.data['related'][relation_target['relation']]).forEach(function (value) {
							temp.push({ [relation_target['target']]: value[relation_target['target']], relation: value.relationship_type_code });
						});
					};
				};
				edit[relation_target["relation"]] = temp;
			});

			// Dimensions : répétable
			target = 'dimensions';
			temp = [];
			if (item.data['ca_objects.' + target]) {
				Object.values(item.data['ca_objects.' + target]).forEach(function (value) {
					//console.log(value[_settings._locale]);
					temp.push(toRaw(value[_settings._locale]));
				});
			}
			//console.log("temp", temp);
			edit['ca_objects.' + target] = temp;

			let targets = ['ca_objects.precision_localisation', 'ca_objects.materiau', 'ca_objects.tournai_date'
			];
			targets.forEach(function (target) {
				// if target starts with ca_objects...
				if (target.startsWith('ca_objects.')) {
					// if we don't have the metadata, don't try to access it
					if (!item.data[target]) return;
					// get the last part of the target
					target = target.split('.').pop();
					// get the first element of the object
					if (!edit['ca_objects.' + target]) {
						edit['ca_objects.' + target] = Object.values(item.data['ca_objects.' + target])[0][_settings._locale][target];
					}
				}
			});

			if (item.data.representations !== undefined) {
				edit.offline_representations = [];
				let temp = null;
				Object.values(item.data.representations).forEach(function (value) {
					if (value.is_primary == "1") {
						edit.default_representation = value.urls.preview170;

						// if the url contains ".lescollections.test", replace it with ".lescollections.be"
						edit.default_representation = edit.default_representation.replace(".lescollections.test", ".lescollections.be");
					}
					temp = value.urls.preview170;
					// if the url contains ".lescollections.test", replace it with ".lescollections.be"
					edit.offline_representations.push(temp.replace(".lescollections.test", ".lescollections.be"));
				});
			}
			// get first element of object
			that.data = item.data;

			// copy the object
			return true;
		});

		// Clone edit object into that.edit, but removing all the references
		that.edit = JSON.parse(JSON.stringify(edit));
		that._edit = JSON.parse(JSON.stringify(edit));
	},
	watch: {
		'edit': async function () {
			var _edited = {};
			// loop through all the keys of this.edit
			for (var key in this.edit) {
				//loop through all the keys of this.edit, and compare them with the keys of global var edit
				// if the key is in the global var edit, add it to the _edited object
				// do this to avoid fetching an empty property at the beginning
				if (edit.hasOwnProperty(key)) {
					_edited[key] = toRaw(this.edit[key]);
				} else {
					//console.log("!edit.hasOwnProperty(key)", key);
					if (this.edit[key] !== undefined) {
						_edited[key] = toRaw(this.edit[key]);
					}
				}
			}

			let modifications = DeepDiff(edit, _edited);

			if (modifications) {
				this.modifications = [];
				//loop through all keys of modifications
				for (var key in modifications) {
					// push modifications to display
					if (modifications[key].kind == "A") {
						// Array
						//this.modifications.push({kind:modifications[key].kind, path:modifications[key].path, lhs:modifications[key].lhs, rhs:modifications[key].rhs});
						console.log("Array", modifications[key].item);
						this.modifications.push({ kind: "A" + modifications[key].item.kind, path: modifications[key].path.join(".") + "." + modifications[key].index, lhs: "", rhs: JSON.stringify(modifications[key].item.rhs) });
					} else {
						this.modifications.push({ kind: modifications[key].kind, path: modifications[key].path.join("."), lhs: modifications[key].lhs, rhs: modifications[key].rhs });
					}

				}
				this.saveDisabled = false;
				this.dataHasChanged = true;
				//console.log("data has changed : this.edit", this.edit);
			} else {
				this.modifications = [];
				//console.log("data has not changed");
				this.saveDisabled = true;
				this.dataHasChanged = false;
			}
		}
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

form h3,
.modifications_container h3,
.medias_container h3 {
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

.medias_container,
.modifications_container {
	padding: 10px 40px;
}

table tr th {
	background-color: transparent;
	border-bottom: #21b6c9 1px solid;
}
[data-type="repeater"][data-id="input_40"] .formkit-content {
	flex-direction: row;
}
[data-type="repeater"][data-id="input_40"] .formkit-content .formkit-outer {
	width: calc(50% - 8px);
	padding-right:8px;
}
</style>
