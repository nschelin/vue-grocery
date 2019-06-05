import Vue from 'vue';
import Router from 'vue-router';
//import Home from '@/components/Home'
// import Lists from '@/components/Lists';
// import ListDetails from '@/components/ListDetails';
// import Products from '@/components/Products';
// import ProductDetails from '@/components/ProductDetails';

import Home from '../views/HomeView.vue';

Vue.use(Router);

export default new Router({
	mode: 'history',
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
		},
		// {
		// 	path: '/lists/add',
		// 	name: 'ListAdd',
		// 	component: ListDetails
		// },
		// {
		// 	path: '/lists/:id',
		// 	name: 'ListEdit',
		// 	component: ListDetails
		// },
		{
			path: '/lists',
			name: 'Lists',
			component: () => import('../views/ListsView.vue')
		},
		{
			path: '/products',
			name: 'Products',
			component: () => import('../views/ProductsView.vue')
		},
		{
			path: '/dinners',
			name: 'Dinners',
			component: () => import('../views/DinnersView.vue')
		}
		// {
		// 	path: '/products/add',
		// 	name: 'ProductsAdd',
		// 	component: ProductDetails
		// },
		// {
		// 	path: '/products/:id',
		// 	name: 'ProductsEdit',
		// 	component: ProductDetails
		// }
	]
});
