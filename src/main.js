import { createApp } from 'vue'
import App from './App.vue'
//import axios from 'axios'
import router from './router'


export const eventBus = createApp(App)


createApp(App).use(router).mount('#app')








