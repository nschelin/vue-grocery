import api from '@/services/api';

export default {
	getDinners() {
		return api().get('dinners');
	},
	getDinner(id) {
		return api().get(`dinner/${id}`);
	},
	insertDinner(dinner) {
		return api().post('dinner', dinner);
	},
	updateDinner(dinner) {
		return api().put(`dinner/${dinner._id}`, dinner);
	},
	deleteDinner(dinner) {
		return api().delete(`dinner/${dinner._id}`);
	}
};
