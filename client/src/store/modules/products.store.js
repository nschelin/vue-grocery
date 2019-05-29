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
		state.products.splice(index, 1, product);
	},
	DELETE_PRODUCT(state, product) {
		const index = state.products.findIndex(p => p._id === product._id);
		state.products.splice(index, 1);
	}
};

const actions = {
	async getProducts({ commit }) {
		const {
			data: productsInfo,
			error
		} = await productService.getProducts();
		if (error) {
			console.error(error);
			return false;
		}

		commit('SET_PRODUCTS', productsInfo.products);
	},
	async addProduct({ commit }, product) {
		const {
			data: addedProduct,
			error
		} = await productService.insertProduct(product);
		if (error) {
			console.error(error);
			return false;
		}

		commit('ADD_PRODUCT', addedProduct);
	},
	async updateProduct({ commit }, product) {
		const {
			data: updatedProduct,
			error
		} = await productService.updateProduct(product);
		if (error) {
			console.error(error);
			return false;
		}

		commit('UPDATE_PRODUCT', updatedProduct);
	}
};

export default {
	state,
	mutations,
	actions
};
