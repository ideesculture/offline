<template>
	<div id="edit">
		<p>Modification de <span v-html="id"></span></p>
		<textarea v-model="name">

		</textarea>

	</div>
	<json-forms
    :data="data"
    :schema="schema"
    :uischema="uischema"
    :renderers="renderers"
    @change="onChange"
  />
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
			name: "",
			id: this.$route.params.id
		}
	},
	methods: {
		onChange(event) {
			this.data = event.data;
		},
	},

	mounted() {
		console.log();
		let thisname = this.$route.params.id;
		if (localStorage[thisname]) {
			this.name = localStorage[thisname];
		}
		this._settings = JSON.parse(localStorage["_settings"]);
		this.schema = this._settings.schema;
		this.uischema = this._settings.uischema;
		console.log(this.uischema);
	},
	watch: {
		name(newName) {
			let thisname = this.$route.params.id;
			localStorage[thisname] = newName;
		}
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
	padding: 8px;

	textarea {
		width: calc(100% - 28px);
		min-height: 300px;
	}
}

/* JSON FORM STYLES */
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
</style>
