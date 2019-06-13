import { listService } from '../../services';

const state = {
	lists: []
};

const mutations = {
	SET_LISTS(state, lists) {
		state.lists = lists;
	},
	ADD_List(state, list) {
		state.lists.push(list);
	},
	UPDATE_List(state, list) {
		const index = state.lists.findIndex(d => d._id === list._id);
		state.lists.splice(index, 1, list);
	},
	DELETE_List(state, list) {
		const index = state.lists.findIndex(d => d._id === list._id);
		state.lists.splice(index, 1);
	}
};

const actions = {
	async getLists({ commit }) {
		const { data: lists, error } = await listService.getLists();

		if (error) {
			console.error(error);
			return false;
		}

		commit('SET_LISTS', lists);
	},
	async addList({ commit }, list) {
		const { data: addedList, error } = await listService.inserList(list);
		if (error) {
			console.error(error);
			return false;
		}

		commit('ADD_LIST', addedList);
	},
	async updateList({ commit }, list) {
		const { data: updatedList, error } = await listService.updateList(list);
		if (error) {
			console.error(error);
			return false;
		}

		commit('UPDATE_LIST', updatedList);
	},
	async deleteList({ commit }, list) {
		const { error } = await listService.deleteList(list);
		if (error) {
			console.error(error);
			return false;
		}

		commit('DELETE_LIST', list);
	}
};

export default {
	state,
	mutations,
	actions
};
