import Api from '@/services/Api';

export default {
	getProducts () {
		return Api().get('products');
	},
	getProduct(id) {
		return Api().get(`products/${id}`);
	},
	insertProduct(product) {
		return Api().post('product', product);
	},
	updateProduct(product) {
		return Api().put(`products/${product._id}`, product);
	},
	deleteProduct(product) {
		return Api().delete(`products/${product._id}`);
	}
}