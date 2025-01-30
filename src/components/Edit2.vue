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
					Objet en cours de modification : <br/>
					<b>{{ data.title }}</b><br/> ({{ data.idno }})
				</p>
				<div style="text-align: center;padding:10px;border-bottom:2px solid #eeeeee;">
					<img class="thumbnail" :src="data.default_representation">
				</div>
				<div class="screens">
					<div v-for="screen in screens" :class="((screen == active) ? 'active ' : '') + 'screen'" @click="loadScreen(screen)">
						{{ screen }}
					</div>
					<div class="screen" @click="loadMediaScreen()">
						MEDIA
					</div>
				</div>
			</div>
			<div class="col4">
				<div v-if="dataHasChanged" style="padding:4px;text-align: right;">
					<span style="background-color:#57b3c6;color:white;padding:4px 8px;border-radius: 8px;display: inline-block;">Données modifiées</span>
				</div>
				<div class="medias_container">
					<h3>MEDIA</h3>
					<div style="border:1px solid black;border-radius: 0.25em;padding:6px;">
						<span v-for="offline_representation in data.offline_representations">
							<img :src="offline_representation" style="display:inline-block;width:100px;height:100px;margin:4px;" />
						</span>
					</div>
				</div>

				<div class="formkitContainer">
					<FormKit type="form" v-model="edit" @submit="register">
						<FormKitSchema :schema="schema" />
  					</FormKit>
					
				<p>
					<button :disabled="saveDisabled" class="saveButton info" @click="save">Enregistrer</button>&nbsp;
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
import { defineComponent, ref, toHandlers } from 'vue';
import { FormKitSchema } from '@formkit/vue'
import $ from 'jquery'
import { db } from '../db'
import { _settings } from '../_settings'

export default defineComponent({
	components: {
	},

	data() {
		return {
			dataHasChanged: false,
			data: {},
			formerdata: {},
			_settings:{},
			schema: [],
			id: this.$route.params.id,
			// default & active screen name
			default: "",
			active: "",
			activeStep: "first",
			saveDisabled: true,
			screens:[]
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
		async save() {
			//localStorage[this.id] = JSON.stringify(this.data);
			let that = this;
			let dataToSave = await that.data;
			await db.db_objects.get(this.item_id).then(async function (item) {
				let result = db.db_objects.update(that.item_id, {data: dataToSave});
				console.log(result);
				return true;
			});
			console.log("saved");
		},
		loadScreen(screen) {
			this.active = screen;
			// set the current screen schema & uischema
			//this.data.activeStep = "first";
			let that=this;
			$(".medias_container").hide();
			// Jquery needs a small time to be able to find the elements
			setTimeout(function() {
				$(".formkitContainer section").each(function() {
					if($(this).attr("class") !== screen) {
						$(this).hide();
					} else {
						$(this).show();
					}
				});
			}, 100);
		},
		loadMediaScreen() {
			this.active = "media";
			// set the current screen schema & uischema
			//this.data.activeStep = "first";
			let that=this;
			// Jquery needs a small time to be able to find the elements
			setTimeout(function() {
				$(".medias_container").show();
				$(".formkitContainer section").each(function() {
					$(this).hide();
				});
			}, 100);
		}
	},
	computed: {
		
	},
	mounted() {
		this.item_id = this.$route.params.id;
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
		db.db_objects.get(this.item_id).then(function (item) {
			console.log(item);
			if(!item.edit) {
				item.edit = {};
			}
			item.data.title = item.data.preferred_labels.fr_FR[0].name;
			item.edit.title = item.data.title;
			item.data.idno = item.data.idno.value;
			item.edit.idno = item.data.idno.value;

			// Treatment for complex data storage, where the first element is the one we want to display, and the locale to extract is fr_FR
			item.edit['ca_objects.nonpreferred_labels'] = item.data.nonpreferred_labels[_settings._locale][0].name;

			// Storage simplification
			let target = 'objet_present';
			item.edit['ca_objects.'+target] = Object.values(item.data['ca_objects.'+target])[0][_settings._locale][target];

			// Etat de conservation : simple
			target = 'etat_conservation';
			item.edit['ca_objects.'+target] = Object.values(item.data['ca_objects.'+target])[0][_settings._locale]["etat"];

			// Etat de conservation : simple
			target = 'code_fabrique';
			item.edit['ca_objects.'+target] = Object.values(item.data['ca_objects.'+target])[0][_settings._locale]["code_fabrique"];

			// Etat de conservation : simple
			target = 'depot_remarques';
			item.edit['ca_objects.'+target] = Object.values(item.data['ca_objects.'+target])[0][_settings._locale]["depot_remarques"];
			
			// Matériau : simple
			target = 'materiau';
			item.edit['ca_objects.'+target] = Object.values(item.data['ca_objects.'+target])[0][_settings._locale]["materiau"];

			// Techniques : répétable
			target = 'cipar_techniques';
			let temp = [];
			Object.values(item.data['ca_objects.'+target]).forEach(function(value) {
				temp.push({cipar_techniques : value[_settings._locale][target]});
			});
			item.edit['ca_objects.'+target] = temp;

			// Dimensions : répétable
			target = 'dimensions';
			temp = [];
			Object.values(item.data['ca_objects.'+target]).forEach(function(value) {
				//console.log(value[_settings._locale]);
				temp.push(value[_settings._locale]);
			});
			item.edit['ca_objects.'+target] = temp;

			let targets = ['ca_objects.precision_localisation', 'ca_objects.materiau', 'ca_objects.tournai_date'
			];
			targets.forEach(function(target) {
				// if target starts with ca_objects...
				if(target.startsWith('ca_objects.')) {
					// if we don't have the metadata, don't try to access it
					if(!item.data[target]) return;
					// get the last part of the target
					target = target.split('.').pop();
					// get the first element of the object
					if(!item.edit['ca_objects.'+target]) {
						item.edit['ca_objects.'+target] = Object.values(item.data['ca_objects.'+target])[0][_settings._locale][target];
					}
				}
			});

			if(item.data.representations !== undefined) {
				item.edit.offline_representations = [];
				let temp = null;
				Object.values(item.data.representations).forEach(function(value) {
					if (value.is_primary == "1") {
						console.log(value.urls.preview170);
						item.edit.default_representation = value.urls.preview170;
						// if the url contains ".lescollections.test", replace it with ".lescollections.be"
						item.edit.default_representation = item.data.default_representation.replace(".lescollections.test", ".lescollections.be");
						// we only need the first one
						//return;
					}
					temp = value.urls.preview170;
					// if the url contains ".lescollections.test", replace it with ".lescollections.be"
					item.edit.offline_representations.push(temp.replace(".lescollections.test", ".lescollections.be"));
				});
			}
			// get first element of object
			that.data = item.data;
			that.formerdata = that.data;
		});
		
	},
	watch: {
		'data': function() {
			if(this.data != this.formerdata) {
				console.log("data has changed");
				this.saveDisabled = false;
			}
			//this.dataHasChanged = true;
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
	z-index:50;
	position:relative;
}

/* JSON FORM STYLES */


/* end of JSON FORM styling */
.saveButton {
}
.saveButton:disabled {
	cursor: not-allowed;
	background:lightgray;
	border:0;
}
.container h3 {
	padding-left:24px;
}
.screens .screen {
	padding:4px 10px;
	font-size:0.9em;
	text-transform: uppercase;
	cursor: pointer;
}
.screens .screen.active {
	background-color:#eeeeee;
}
img.thumbnail {
	max-width: 100%;
}
div.formkit-outer {
}
[data-type="repeater"]>.formkit-fieldset {
	padding:0;
	border:none;
}
.formkit-outer.formkit-add-button {
	margin-top:-8px;
	margin-left:4px;
	button {
		border-radius: 0 0 6px 6px;
		background-color:darkgray;
		padding-top:6px;
		padding-bottom: 6px;
	}
	
}
.formkit-actions {
	display: none;
}
.formkit-wrapper, .formkit-fieldset {
	max-width: 100%;
}
form h3,
.medias_container h3 {
	background: #21b6c9;
    color: white;
    padding: 4px;
	padding-left:6px !important;
	border-radius: 4px 4px 0 0;
    margin-bottom: 0;
}
.formkit-controls {
	padding:4px;
	>li {
		margin:2px 0;
		flex: 0 0 0.8em;
		width: 0.8em;
	}
}
.formkit-outer {
	margin-bottom: 8px;
}
.formkit-input {
	padding-top:6px;
	padding-bottom:6px;
	padding-left:6px;
}
.medias_container {
	padding: 10px 40px;
}
</style>
