import Api from '@/services/Api';

export default {
	getLists() {
		return Api().get('lists');
	},
	getList(id) {
		return Api().get(`lists/${id}`);
	},
	insertList(list) {
		return Api().post('list', list);
	},
	updateList(list) {
		return Api().put(`lists/${list._id}`, list);
	},
	deleteList(list) {
		return Api().delete(`lists/${list._id}`);
	}
}