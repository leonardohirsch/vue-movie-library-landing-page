import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import vSelect from 'vue-select'
import 'vue-select/dist/vue-select.css'

const app = createApp(App)

app.use(createPinia()).component('v-select', vSelect)

app.mount('#app')
