import api from '@/services/api';

export default {
	getProducts() {
		return api().get('products');
	},
	getProduct(id) {
		return api().get(`products/${id}`);
	},
	insertProduct(product) {
		return api().post('product', product);
	},
	updateProduct(product) {
		return api().put(`products/${product._id}`, product);
	},
	deleteProduct(product) {
		return api().delete(`products/${product._id}`);
	}
};
