import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products.store';
import lists from './modules/lists.store';
import dinners from './modules/dinners.store';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		days: [
			'Sunday',
			'Monday',
			'Tuesday',
			'Wednesday',
			'Thursday',
			'Friday',
			'Saturday'
		]
	},
	modules: {
		productsMod: products,
		listsMod: lists,
		dinnersMod: dinners
	}
});
