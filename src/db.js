import Dexie from 'dexie';

// Bug, l'ajout de multiple stores ne fonctionne pas ; il faut fermer la connexion et la réouvrir

export const db = new Dexie('collectiveaccessOffline');

// Création du premier store en suivant la doc de Dexie

console.log("Numéro de version ", db.verno);
db.version(1).stores({ settings: 'id, type, table, data' });
db.version(2).stores({db_objects: 'id,idno,data' });
db.version(3).stores({ db_entities: 'id,idno,data' });
db.version(4).stores({ db_collections: 'id,idno,data' });
db.version(5).stores({ db_places: 'id,idno,data' });
db.version(6).stores({ db_occurrences: 'id,idno,data' });
db.version(7).stores({ db_storage_locations: 'id,idno,data' });
db.version(8).stores({ db_list_items: 'id,idno,data' });
db.version(9).stores({ db_lists: 'id,idno,data' });
db.version(10).stores({ db_lists: 'id,list_code,data' });
db.version(11).stores({ db_object_representations: 'id,data' });

db.open();
