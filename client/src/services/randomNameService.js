import Api from '@/services/api';

export default {
	getRandomName() {
		return Api().get('random-name');
	}
};
