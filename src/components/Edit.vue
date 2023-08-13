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
					<b>{{ data.preferred_labels }}</b><br/> ({{ data.idno }})
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
				<json-forms
					:data="data"
					:schema="schema"
					:uischema="uischema"
					:renderers="renderers"
					@change="onChange"
				/>
				<p>
					<button class="saveButton info" @click="save">Enregistrer</button>&nbsp;
					<router-link class="routerlink" to="/offline/">
						<button class="cancelButton">Annuler</button>
					</router-link>
				</p>
			</div>
		</div>
	</div>
	
</template>

<script>
import { JsonForms } from '@jsonforms/vue';
import { vanillaRenderers } from '@jsonforms/vue-vanilla';
import { defineComponent, ref } from 'vue'

const renderers = [
	...vanillaRenderers,
	// here you can add custom renderers
];

//import $ from 'jquery'

export default defineComponent({
	components: {
		JsonForms,
	},

	data() {
		return {
			renderers: Object.freeze(renderers),
			data: {
				number: 5,
			},
			_settings:{},
			schema: {},
			uischema: {},
			id: this.$route.params.id,
			// default & active screen name
			default: "",
			active: "",
			
			screens:[]
		}
	},
	methods: {
		machin(text) {
			console.log("machin");
			console.log(text);
		},
		onChange(event) {
			this.data = event.data;
		},
		save() {
			localStorage[this.id] = JSON.stringify(this.data);
			console.log("saved");
		},
		loadScreen(screen) {
			console.log(screen);
			this.active = screen;
			// set the current screen schema & uischema
			this.schema = this._settings._editor.ca_objects[screen].schema;
			this.uischema = this._settings._editor.ca_objects[screen].uischema;
		}
	},
	computed: {
		
	},
	mounted() {
		this.item_id = this.$route.params.id;
		this._settings = JSON.parse(localStorage["_settings"]);
		
		// screen names are inside _settings._editor.ca_objects
		// we take the first one
		this.screens = Object.keys(this._settings._editor.ca_objects);
		this.default = this.screens[0];
		this.active = this.default;

		this.loadScreen(this.active);

		// load data
		this.data = JSON.parse(localStorage[this.item_id]);
	},
	watch: {
	}
});

const count = ref(0)
</script>

<style lang="scss">
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

#edit > .vertical-layout {
	padding-top:0;
}
.vertical-layout {
	text-align: left;
	padding:25px;
}
.vertical-layout .control {
	margin-bottom:8px;
}
.vertical-layout .control label {
	font-size:0.8em;
}
.vertical-layout .control input {
	width:100%;
	border:none;
	border-radius:4px;
	padding:8px 4px;
	background:#fbfbfb;
	border-bottom:1px solid darkgray;
}
.vertical-layout .control textarea {
	width:100%;
	border:none;
	border-radius:4px;
	padding:8px 4px;
	background:#fbfbfb;
	border-bottom:1px solid darkgray;
	font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
}
.horizontal-layout {
	display:flex;
	flex-direction:row;
	align-items:center;
}
.horizontal-layout .horizontal-layout-item {
	flex:1;
	flex-grow: 1;
	padding:10px;
}
.horizontal-layout .horizontal-layout-item:first-child {
	padding-left:0;
}
.horizontal-layout .horizontal-layout-item:last-child {
	padding-right:0;
}

.horizontal-layout .horizontal-layout-item .control input {
	width:100%;
}
fieldset {
	display: block;
    margin-inline-start: 2px;
    margin-inline-end: 2px;
    padding-block-start: 0.15em;
    padding-inline-start: 0.75em;
    padding-inline-end: 0.75em;
    padding-block-end: 0.125em;
    min-inline-size: min-content;
    border-width: 1px;
    border-style: groove;
    border-color: darkgray;
	border-left:1px solid darkgray;
	border-bottom:1px solid darkgray;
	border-right:none;
	border-top:none;
	border-radius:4px;
	.vertical-layout {
		padding-bottom:10px;
	}
	margin-bottom:20px;
}
fieldset .array-list-label {
	font-size:0.8em;
	padding-left:10px;
}
fieldset .vertical-layout {
	display:flex;
	padding:0;
}
fieldset .vertical-layout .vertical-layout-item{
	flex:1;
	flex-grow: 1;
	padding-left:10px;
	padding-right:10px;
}
fieldset .vertical-layout .vertical-layout-item:first-child {
	padding-left:0;
}
fieldset .vertical-layout .vertical-layout-item:last-child {
	padding-right:0;
}

fieldset .vertical-layout .vertical-layout-item .control input {
	width:100%;
}

/* end of JSON FORM styling */
.saveButton {
	margin-left:20px;
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
</style>
