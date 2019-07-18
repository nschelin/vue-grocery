import Vue from 'vue';
import Buefy from 'buefy';
//import Vuetify from 'vuetify';
import App from './App';
import router from './router';
import store from './store';
import filters from './filters';
//import 'vuetify/dist/vuetify.min.css';
// import 'buefy/dist/buefy.css';

//Vue.use(Vuetify);
Vue.use(Buefy);
Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
	router,
	store,
	filters,
	render: h => h(App)
}).$mount('#app');
