import { createRouter, createWebHistory } from 'vue-router'
import ListCollections from '/src/components/ListCollections.vue'
import ListEntities from '/src/components/ListEntities.vue'
import ListObjects from '/src/components/ListObjects.vue'
import ListOccurrences from '/src/components/ListOccurrences.vue'
import ListPlaces from '/src/components/ListPlaces.vue'
import ListStorageLocations from '/src/components/ListStorageLocations.vue'
import LoadSettings from '/src/components/LoadSettings.vue'
import ImportDatabase from '/src/components/ImportDatabase.vue'
import Edit2 from '/src/components/Edit2.vue'
import EditOccurrence from '/src/components/EditOccurrence.vue'

const routes = [{
        path: '/offline/',
        name: 'List',
        component: ListObjects,
    }, {
        path: '/offline/collections/',
        name: 'ListCollections',
        component: ListCollections,
    }, {
        path: '/offline/entities/',
        name: 'ListEntities',
        component: ListEntities,
    }, {
        path: '/offline/objects/',
        name: 'ListObjects',
        component: ListObjects,
    }, {
        path: '/offline/occurrences/',
        name: 'ListOccurrences',
        component: ListOccurrences,
    }, {
        path: '/offline/places/',
        name: 'ListPlaces',
        component: ListPlaces,
    }, {
        path: '/offline/storage_locations/',
        name: 'ListStorageLocations',
        component: ListStorageLocations,
    }, {
        path: '/offline/loadsettings',
        name: 'LoadSettings',
        component: LoadSettings,
    }, {
        path: '/offline/import_database',
        name: 'ImportDatabase',
        component: ImportDatabase,
    }, {
        path: '/offline/edit/:id',
        name: 'Edit',
        component: Edit2,
    }, {
        path: '/offline/edit/occurrence/:id',
        name: 'EditOccurrence',
        component: EditOccurrence,
    },

]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router