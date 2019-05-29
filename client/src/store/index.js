import Vue from 'vue';
import Vuex from 'vuex';
import products from './modules/products.store';
import lists from './modules/lists.store';

Vue.use(Vuex);

export default new Vuex.Store({
	modules: {
		productsMod: products,
		listsMod: lists
	}
});
