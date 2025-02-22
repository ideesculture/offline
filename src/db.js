import Dexie from 'dexie';

export const db = new Dexie('collectiveaccessOffline');

console.log("Numéro de version ", db.verno);
db.version(1).stores({ settings: 'id, type, table, data' });
db.version(2).stores({ db_objects: 'id,idno,data' });
db.version(3).stores({ db_entities: 'id,idno,data' });
db.version(4).stores({ db_collections: 'id,idno,data' });
db.version(5).stores({ db_places: 'id,idno,data' });
db.version(6).stores({ db_occurrences: 'id,idno,data' });
db.version(7).stores({ db_storage_locations: 'id,idno,data' });
db.version(8).stores({ db_list_items: 'id,idno,data' });
db.version(9).stores({ db_lists: 'id,idno,data' });
db.version(10).stores({ db_lists: 'id,list_code,data' });
db.version(11).stores({ db_object_representations: 'id,data' });
db.version(12).stores({ db_objects: 'id,idno,data,edit,_edit' });

// adding labels for search speed increase
db.version(13).stores({ db_entities: 'id,idno,label,data' });
db.version(14).stores({ db_storage_locations: 'id,idno,label,data' });
db.version(15).stores({ db_places: 'id,idno,label,data' });
db.open();
