import moment from 'moment';
import Vue from 'vue';

Vue.filter('dateFormat', (value, formatString) => {
	if(value) {
		return moment(value).format(formatString);
	}
});
