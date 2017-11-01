import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Products from '@/components/Products'
import ProductDetails from '@/components/ProductDetails'

Vue.use(Router)

export default new Router({
	routes: [
		{
			path: '/',
			name: 'Home',
			component: Home
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
