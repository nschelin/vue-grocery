import Vue from 'vue';

Vue.filter('currency', value => {
  if (value && +value) {
    return `$${value}`;
  }
});
