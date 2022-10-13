import { createApp } from 'vue'
import './style.css'
import '@/styles/main.scss'
import * as bootstrap from 'bootstrap';
import router from '@/router';
import App from './App.vue'

const app = createApp(App);
app.use(router);
app.mount('#app')
