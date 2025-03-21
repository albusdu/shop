import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

import StaticButton from '@/elements/StaticButton.vue'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.component('StaticButton', StaticButton)

app.mount('#app')
