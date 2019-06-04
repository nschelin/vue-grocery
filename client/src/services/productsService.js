import api from '@/services/api';

export default {
	getProducts() {
		return api().get('products');
	},
	getProduct(id) {
		return api().get(`product/${id}`);
	},
	insertProduct(product) {
		return api().post('product', product);
	},
	updateProduct(product) {
		return api().put(`product/${product._id}`, product);
	},
	deleteProduct(product) {
		return api().delete(`product/${product._id}`);
	}
};
