import { productService } from '../../services';
const state = {
	products: []
};

const mutations = {
	SET_PRODUCTS(state, products) {
		state.products = products;
	},
	ADD_PRODUCT(state, product) {
		state.products.push(product);
	},
	UPDATE_PRODUCT(state, product) {
		const index = state.products.findIndex(p => p._id === product._id);
		state.products[index] = product;
	},
	DELETE_PRODUCT(state, product) {
		const index = state.products.findIndex(p => p._id === product._id);
		state.products.splice(index, 1);
	}
};

const actions = {
	async getProducts({ commit }) {
		const { data, error } = await productService.getProducts();
		if (error) {
			console.error(error);
			return false;
		}

		commit('SET_PRODUCTS', data);
	}
};

export default {
	state,
	mutations,
	actions
};
