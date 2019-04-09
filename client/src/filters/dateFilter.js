import Vue from 'vue';

export default Vue.filter('date', value => {
  if (!value) return '';
  const d = new Date(value);
  return `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`;
});
