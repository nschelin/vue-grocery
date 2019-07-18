<template>
	<div>
		<div class="column">
			<div class="columns is-mobile">
				<div class="column is-5 is-offset-7">
					<b-button
						type="is-primary"
						class="is-pulled-right"
						@click="addProduct()"
						><span class="altkey">A</span>dd Product</b-button
					>
				</div>
			</div>
		</div>
		<div class="column" v-if="products.length > 0">
			<b-table
				:data="products"
				:paginated="true"
				:per-page="10"
				:default-sort-direction="'asc'"
				:default-sort="products.name"
			>
				<template slot-scope="props">
					<b-table-column
						field="name"
						label="Name"
						width="250"
						sortable
					>
						<a @click="editProduct(props.row)">{{
							props.row.name
						}}</a>
					</b-table-column>
					<b-table-column
						field="price"
						label="Price"
						width="100"
						sortable
					>
						{{ props.row.price | currency }}
					</b-table-column>
					<b-table-column field="created" label="Created" sortable>
						{{ props.row.created | date }}
					</b-table-column>
					<b-table-column field="modified" label="Modified" sortable>
						{{ props.row.modified | date }}
					</b-table-column>
					<b-table-column label="Delete">
						<a
							@click="deleteProduct(props.row)"
							class="button has-background-danger has-text-white"
							>Delete</a
						>
					</b-table-column>
				</template>
			</b-table>
		</div>
		<b-modal :active.sync="dialog" :can-cancel="false">
			<div class="card">
				<div class="card-header">
					<div
						class="card-header-title has-background-primary has-text-white"
					>
						Add/Edit Product
					</div>
				</div>
				<div class="card-content">
					<ProductDetails v-model="currentProduct" :active="dialog" />
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
		dialog: false,
		currentProduct: null
	}),
	computed: {
		...mapState({
			// NOTE: state.moduleName.productsObject.productsArrayOfActualProducts
			products: state => state.productsMod.products
		}),
		sortedProducts: function() {
			if (this.products && this.products.length) {
				return this.products.slice().sort((a, b) => {
					return a.name > b.name ? 1 : -1;
				});
			} else return [];
		}
	},
	methods: {
		addProduct() {
			this.currentProduct = {
				name: '',
				price: 0
			};
			this.dialog = true;
		},
		editProduct(product) {
			this.currentProduct = product;
			this.dialog = true;
		},
		deleteProduct(product) {
			if (confirm('Delete Product?')) {
				this.$store.dispatch('deleteProduct', product);
			}
		},
		handleAdd(e) {
			if (e.altKey && e.code === 'KeyA') {
				this.addProduct();
			}
		}
	},
	created() {
		this.$store.dispatch('getProducts');
		window.addEventListener('keypress', this.handleAdd);
	},
	destroyed() {
		window.removeEventListener('keypress', this.handleAdd);
	},
	components: {
		ProductDetails
	}
};
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
