import { createRouter, createWebHistory } from 'vue-router'
import ListCollections from '/src/components/ListCollections.vue'
import ListEntities from '/src/components/ListEntities.vue'
import ListObjects from '/src/components/ListObjects.vue'
import ListPlaces from '/src/components/ListPlaces.vue'
import ListStorageLocations from '/src/components/ListStorageLocations.vue'
import LoadSettings from '/src/components/LoadSettings.vue'
import Edit from '/src/components/Edit.vue'

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
        path: '/offline/edit/:id',
        name: 'Edit',
        component: Edit,
    },

]
const router = createRouter({
    history: createWebHistory(),
    routes,
})
export default router