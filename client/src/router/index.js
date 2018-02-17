import Vue from 'vue'
import Router from 'vue-router'
//import Home from '@/components/Home'
import Lists from '@/components/Lists'
import ListDetails from '@/components/ListDetails'
import Products from '@/components/Products'
import ProductDetails from '@/components/ProductDetails'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Lists
		},
		{
			path: '/lists/add',
			name: 'ListAdd',
			component: ListDetails
		},
		{
			path: '/lists/:id',
			name: 'ListEdit',
			component: ListDetails
		},
		{
			path: '/products',
			name: 'Products',
			component: Products,
		},
		{
			path: '/products/add',
			name: 'ProductsAdd',
			component: ProductDetails
		},
		{
			path: '/products/:id',
			name: 'ProductsEdit',
			component: ProductDetails
		}
	]
})
