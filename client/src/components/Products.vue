<template>
	<div>
		<div class="column">
			<div class="columns is-mobile">
				<div class="column is-5 is-offset-7">
					<b-button type="is-primary" class="is-pulled-right" @click="dialog = true">Add Product</b-button>
				</div>
			</div>
		</div>
		<div class="column">
			<b-table v-if="products" 
					:data="products" 
					:paginated="true"
					:per-page="10"
					:default-sort-direction="'asc'"
					:default-sort="products.name">
				<template slot-scope="props">
					<b-table-column field="name" label="Name">
						{{ props.row.name }}
					</b-table-column>
					<b-table-column field="created" label="Created">
						{{ props.row.created | date }}
					</b-table-column>
					<b-table-column field="modified" label="Modified">
						{{ props.row.created | date }}
					</b-table-column>
				</template>
			</b-table>
		</div>
		<b-modal :active.sync="dialog" 
				 :can-cancel="false">
				 <div class="card">
					 <div class="card-header">
						 <div class="card-header-title has-background-primary has-text-white">
						 	Add/Edit Product
						 </div>
					 </div>
					 <div class="card-content">
						<ProductDetails v-model="dialog" />
					 </div>
				 </div>
		</b-modal>
	</div>
</template>

<script>

import ProductDetails from './ProductDetails';
import { mapState } from 'vuex';

export default {
	data: () => ({
		dialog: false
	}),
	computed: {
		...mapState({
			products: state => state.products.products.products
		}),
		sortedProducts: function() {
			if(this.products && this.products.length) {
				return this.products.slice().sort((a,b) => {
					return a.name > b.name ? 1 : -1;
				});
			}
			else
				return [];
		}
	},
	methods: {
		// validateRemove(product) {
		// 	this.removeProduct = product;
		// },

		// async remove() {
		// 	const response = productsService.deleteProduct(this.removeProduct);
		// 	if(response.data.removed === 1) {	
		// 		let index = this.products.findIndex((prod) => prod._id === this.removeProduct._id);
		// 		this.products.splice(index, 1);
		// 		this.removeProduct = {};
		// 		this.removeList = {};
		// 	}
			
		// }
	},
	async created() {
		await this.$store.dispatch('getProducts');
		// const response = await productsService.getProducts();
		// this.products = response.data.products; 
	},
	components: {
		ProductDetails
	}
}

</script>
<style scoped>
	.card {
		border-radius: 5px;
	}

	.card-header-title {
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
</style>
