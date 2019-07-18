import Vue from 'vue';

export default Vue.filter('date', value => {
	if (!value) return '';
	const d = new Date(value);
	const m = d.getMonth() + 1;
	const dd = d.getDate();
	return `${m > 9 ? m : `0${m}`}/${
		dd > 9 ? dd : `0${dd}`
	}/${d.getFullYear()}`;
});
