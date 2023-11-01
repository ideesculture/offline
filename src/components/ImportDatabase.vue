<template>
	<div id="content">Import base de données</div>
	<div>
		<div class="column" style="float:left;width:50%;">
			<p>
				<button class="button" id="exportLink" @click="exportDB">💾 Télécharger</button> &nbsp;
				<button class="button danger" id="purge" @click="purgeDB">🗑️ Supprimer</button>
			</p>
			<div id="dropzone" style="padding:100px;border:1px dotted gray;margin:20px;">
				Glisser ici le fichier à charger
			</div>
		</div>
		<div class="column" style="float:left;width:49%;">
			<table id="dbInfos">
				<thead></thead>
				<tbody></tbody>
			</table>
		</div>
	</div>
</template>

<script>
import $ from 'jquery'
import { db } from '../db'
//import {importDB, exportDB, importInto, peakImportFile} from "dexie-export-import";
import {exportDB} from "dexie-export-import";
import download from 'downloadjs';

export default {
	data() {
		return {
			defaultdata: {
			}
		}
	},
	mounted() {
		showContent().catch(err => console.error(''+err));

		const dropZoneDiv = document.getElementById('dropzone');
		// Configure dropZoneDiv
		dropZoneDiv.ondragover = event => {
			event.stopPropagation();
			event.preventDefault();
			event.dataTransfer.dropEffect = 'copy';
		};
		// Handle file drop:
		dropZoneDiv.ondrop = async ev => {
			ev.stopPropagation();
			ev.preventDefault();

			// Pick the File from the drop event (a File is also a Blob):
			const file = ev.dataTransfer.files[0];
			try {
				if (!file) throw new Error(`Only files can be dropped here`);
				console.log("Importing " + file.name);
				await db.delete();
				db.open();
				let result = await db.import(file, {
					progressCallback
				});
				console.log("Import complete");
				await showContent();
			} catch (error) {
				console.error(''+error);
			}
		}
	},
	methods: {
		exportDB() {
			db.export({
				prettyJson: true,
				blobs: true,
				progressCallback
			}).then(function (json) {
				//console.log(json);
				var blob = new Blob([json], { type: "application/json;charset=utf-8" });
				download(blob, "digital-heritage.json", "application/json");

				// TODO : use jszip to zip before download
			});
		},
		purgeDB() {
			db.delete();
			db.open();
			showContent().catch(err => console.error(''+err));
		}
	}
}

function progressCallback ({totalRows, completedRows}) {
  console.log(`Progress: ${completedRows} of ${totalRows} rows completed`);
}


async function showContent() {
  const tbody = document.getElementsByTagName('tbody')[0];
 
  const tables = await Promise.all(db.tables.map (async table => ({
    name: table.name,
    count: await table.count(),
    primKey: table.schema.primKey.src
  })));
  tbody.innerHTML = `
    <tr>
      <td>${db.name}</td>
      <td></td>
    </tr>
    ${tables.map(({name, count}) => `
      <tr>
        <th>${name}</th>
        <td>${count} enregistrements</td>
      </tr>`).join('')}
  `;
}
</script>

<style scoped>
#content {
	clear: both;
	text-align: left;
	margin: auto;
	width: 1000px;
}
</style>
<style>
table tr td,
table tr th {
	text-align: left;
}
table tr th {
	background:lightgray;
}
</style>
