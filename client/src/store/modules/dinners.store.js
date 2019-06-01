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
		state.products.splice(index, 1, dinner);
	},
	DELETE_DINNER(state, dinner) {
		const index = state.dinners.findIndex(d => d._id === dinner._id);
		state.dinners.splice(index, 1);
	}
};

const actions = {
	async getDinners({ commit }) {
		const { data: dinnerInfo, error } = await dinnerService.getDinners();

		if (error) {
			console.error(error);
			return false;
		}

		commit('SET_DINNERS', dinnerInfo.dinners);
	}
};

export default {
	state,
	mutations,
	actions
};
