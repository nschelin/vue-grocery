<template>
	<div>
		<!-- <v-layout row>
			<v-flex md6>
				<h4>Products</h4>
			</v-flex>
		</v-layout> -->
		
		<v-card-title>
      		<h4 style="padding: 0; margin: 18px 0 0;">Products</h4>
		<v-spacer></v-spacer>
		<v-text-field
			append-icon="search"
			label="Search"
			single-line
			hide-details
			v-model="search"
		></v-text-field>
		</v-card-title>
		<v-data-table
			:items="sortedProducts"
			item-key="_id"
			:rows-per-page-items="[10]"
			:search="search"
			>
			<template slot="headers" slot-scope="props">
				<tr>
					<th>Name</th>
					<th>Price</th>
					<th>Unit</th>
					<th>Actions</th>
				</tr>
			</template>
			<template slot="items" slot-scope="props">
				<tr>
					<td>{{ props.item.name }}</td>
					<td>{{ props.item.price | currency }}</td>
					<td>{{ props.item.unit }}</td>
					<td style="text-align: center;">
						<v-btn 	color="indigo" 
								:to="{ 	name: 'ProductsEdit', 
										params: { id: props.item._id } }">
							Edit
						</v-btn>
						<v-btn color="red" @click="validateRemove(props.item)">Delete</v-btn>
					</td>
				</tr>
			</template>		
		</v-data-table>

		<v-layout row justify-center>
			<v-dialog v-model="dialog" persistent max-width="290">
					<v-card light>
						<v-card-title class="headline">Delete this Product?</v-card-title>
						<v-card-text>
							Deleting this Product cannot be undone.
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="red" @click.native="remove()">OK</v-btn>
							<v-btn color="indigo" @click.native="dialog = false">Cancel</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
		</v-layout>

		<v-snackbar
			:timeout="snackbar.timeout"
			:color="snackbar.color"
			v-model="snackbar.show"
		>
			{{ snackbar.text }}
			<v-btn dark flat @click.native="snackbar = false">Close</v-btn>
		</v-snackbar>


		<v-fab-transition>
			<v-btn 
				fab 
				dark 
				right
				bottom
				fixed
				style="bottom: 5px;"
				color="indigo"
				:to="{ name: 'ProductsAdd'}"
				>
					<v-icon dark>add</v-icon>
			</v-btn>
		</v-fab-transition>
	</div>
</template>

<script>

import ProductService from '@/services/ProductsService'
export default {
	data() {
		return {
			search: '',
			dialog: false,
			removeProduct: {},
			snackbar: {
				show: false,
				color: '',
				timeout: 6000,
				text: 'Product Deleted',
			},
			products: []
		}
	},
	computed: {
		sortedProducts: function() {
			return this.products.sort((a,b) => {
				return a.name > b.name ? 1 : -1;
			});

		}
	},
	methods: {
		validateRemove(product) {
			this.dialog = true;
			this.removeProduct = product;
		},

		remove() {
			ProductService.deleteProduct(this.removeProduct).then((response) => {
				if(response.data.removed === 1) {	
					let index = this.products.findIndex((prod) => prod._id === this.removeProduct._id);
					this.products.splice(index, 1);
					this.removeProduct = {};
					this.dialog = false;
					this.removeList = {};
					this.snackbar.show = true;
					this.snackbar.color = 'success';
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
<style scoped>
</style>
