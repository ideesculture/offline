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
					<img class="thumbnail" :src="data._default_representation">
				</div>
				<div class="screens">
					<div v-for="screen in screens" :class="((screen == active) ? 'active ' : '') + 'screen'" @click="loadScreen(screen)">
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
		save() {
			localStorage[this.id] = JSON.stringify(this.data);
			console.log("saved");
		},
		loadScreen(screen) {
			this.active = screen;
			// set the current screen schema & uischema
			//this.data.activeStep = "first";
			let that=this;
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
			item.data.title = item.data.preferred_labels.fr_FR[0].name;
			item.data.idno = item.data.idno.value;
			
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
form h3 {
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
</style>
