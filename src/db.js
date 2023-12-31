import Dexie from 'dexie';

// Bug, l'ajout de multiple stores ne fonctionne pas ; il faut fermer la connexion et la réouvrir

export const db = new Dexie('collectiveaccessOffline');

// Création du premier store en suivant la doc de Dexie
//db.open();
console.log("Numéro de version ", db.verno);
//db.close();
db.version(1).stores({ settings: 'id, type, table, data' });

// Autres stores : caca, l'ajout de stores multiples ne fonctionne pas
// du coup, on clos, on ouvre, on clos, on ouvre, etc. en upgradant le numéro de version
//db.close();
db.version(2).stores({db_objects: 'id,idno,data' });
//db.open();
//db.close();
db.version(3).stores({ db_entities: 'id,idno,data' });
//db.open();
//db.close();
db.version(4).stores({ db_collections: 'id,idno,data' });
//db.open();
//db.close();
db.version(5).stores({ db_places: 'id,idno,data' });
//db.open();
//db.close();
db.version(6).stores({ db_occurrences: 'id,idno,data' });
//db.open();
//db.close();
db.version(7).stores({ db_storage_locations: 'id,idno,data' });
db.version(8).stores({ db_list_items: 'id,idno,data' });
db.version(9).stores({ db_lists: 'id,idno,data' });
db.version(10).stores({ db_lists: 'id,list_code,data' });
//db.open();
db.open();
