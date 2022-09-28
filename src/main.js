/*
import { createApp } from 'vue'
import App from './App.vue'

createApp(App).mount('#app')
*/

import { createApp, h } from 'vue'
import App from './App.vue'
import { createRouter, createWebHistory } from 'vue-router'
import ColorFamilyCreator from './pages/ColorFamilyCreator'
import ColorFamilyCreatorGyro from './pages/ColorFamilyCreatorGyro'
import ColorFamilyEditor from './pages/ColorFamilyEditor'
import Playground from './pages/Playground'
import Hue from './pages/Hue'
import TailwindColorWheel from './pages/TailwindColorWheel'
import tooltip from "./directives/tooltip.js";
import axios from 'axios';
import VueAxios from 'vue-axios'
import './index.css'

const routes = [
    {path: '/', redirect: '/create'},
    {path: '/create', component: ColorFamilyCreator},
    {path: '/create-gyro', component: ColorFamilyCreatorGyro},
    {path: '/edit', component: ColorFamilyEditor},
    {path: '/playground', component: Playground},
    {path: '/hue', component: Hue},
    {path: '/tailwind-color-wheel', component: TailwindColorWheel},
]

const router = createRouter({
    history: createWebHistory(),
    routes,
})

const app = createApp({
    render: () => h(App)
});

app.use(router)

app.use(VueAxios, axios)

app.directive("tooltip", tooltip);
app.mount('#app')
