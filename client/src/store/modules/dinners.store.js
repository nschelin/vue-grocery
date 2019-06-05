import { dinnerService } from '../../services';
const state = {
	dinners: []
};

const mutations = {
	SET_DINNERS(state, dinners) {
		state.dinners = dinners;
	},
	ADD_DINNER(state, dinner) {
		state.dinners.push(dinner);
	},
	UPDATE_DINNER(state, dinner) {
		const index = state.dinners.findIndex(d => d._id === dinner._id);
		state.dinners.splice(index, 1, dinner);
	},
	DELETE_DINNER(state, dinner) {
		const index = state.dinners.findIndex(d => d._id === dinner._id);
		state.dinners.splice(index, 1);
	}
};

const actions = {
	async getDinners({ commit }) {
		const { data: dinners, error } = await dinnerService.getDinners();

		if (error) {
			console.error(error);
			return false;
		}

		commit('SET_DINNERS', dinners);
	},
	async addDinner({ commit }, dinner) {
		const { data: addedDinner, error } = await dinnerService.insertDinner(
			dinner
		);
		if (error) {
			console.error(error);
			return false;
		}

		commit('ADD_DINNER', addedDinner);
	},
	async updateDinner({ commit }, dinner) {
		const { data: updatedDinner, error } = await dinnerService.updateDinner(
			dinner
		);
		if (error) {
			console.error(error);
			return false;
		}

		commit('UPDATE_DINNER', updatedDinner);
	},
	async deleteDinner({ commit }, dinner) {
		const { error } = await dinnerService.deleteDinner(dinner);
		if (error) {
			console.error(error);
			return false;
		}

		commit('DELETE_DINNER', dinner);
	}
};

export default {
	state,
	mutations,
	actions
};
