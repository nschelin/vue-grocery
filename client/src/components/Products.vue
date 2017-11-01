<template>
	<div>
		<v-layout row>
			<v-flex md6>
				<h4>Products</h4>
			</v-flex>
			<v-flex md-6>
				<v-btn 
					:to="{ name: 'ProductsAdd'}"
					fab 
					dark 
					color="indigo">
					<v-icon dark>add</v-icon>
				</v-btn>
			</v-flex>
		</v-layout>
		

		<v-layout 
			row
			v-for="product in products" :key="product._id">
				<v-flex md2>
					<v-btn @click="deleteItem(product)">Delete</v-btn>
				</v-flex>

				<v-flex md6 class="pt-3">
					<router-link :to="{ name: 'ProductsEdit', 
												params: { id: product._id } }">
												{{ product.name }}
							</router-link>
				</v-flex>
		</v-layout>
	</div>
</template>

<script>

import ProductService from '@/services/ProductsService'
export default {
	data() {
		return {
			products: []
		}
	},
	methods: {
		deleteItem(p) {
			ProductService.deleteProduct(p).then((response) => {
				if(response.data.removed === 1) {	
					let index = this.products.findIndex((prod) => prod._id === p._id);
					this.products.splice(index, 1);
				}
			})
		}
	},
	mounted() {
		ProductService.getProducts().then((response) => {
			this.products = response.data.items; 
		})
		// .catch((err) => {
		// 	console.log('error')
		// })
	}
}

</script>
