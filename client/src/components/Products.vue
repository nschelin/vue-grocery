<template>
	<div>
		<div class="column">
			<div class="columns is-mobile">
				<div class="column is-5 is-offset-7">
					<b-button type="is-primary" class="is-pulled-right">Add Product</b-button>
				</div>
			</div>
		</div>
		<div class="column">
			<b-table :data="products" 
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
	</div>
</template>

<script>

import productsService from '@/services/productsService';
export default {
	data() {
		return {
			removeProduct: {},
			products: [],
		}
	},
	computed: {
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
		validateRemove(product) {
			this.removeProduct = product;
		},

		async remove() {
			const response = productsService.deleteProduct(this.removeProduct);
			if(response.data.removed === 1) {	
				let index = this.products.findIndex((prod) => prod._id === this.removeProduct._id);
				this.products.splice(index, 1);
				this.removeProduct = {};
				this.removeList = {};
			}
			
		}
	},
	async mounted() {
		const response = await productsService.getProducts();
		this.products = response.data.products; 
	}
}

</script>
<style scoped>
</style>
