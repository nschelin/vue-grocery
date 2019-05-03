<template>
	<div>
		<v-layout row>
			<v-flex md9>
				<h4>{{ heading }}</h4>
			</v-flex>
			<v-flex md3>
				<v-btn @click="addProduct()" color="green">Add</v-btn>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex md6>
				<div v-if="list && list.created" class="date-info">Created: {{ list.created | date }}</div>
			</v-flex>
		</v-layout>
		<v-layout row v-if="list.products && !isEdit">
			<v-flex md12>
				<ul>
					<li v-for="p in list.products" :key="p._id">
						{{ p.product.name }}
					</li>
				</ul>
			</v-flex>
		</v-layout>
		<template v-if="isEdit && list.products && list.products.length > 0">
			<v-layout row>
				<v-flex md3>
					<!-- item -->
				</v-flex>
			</v-layout>
		</template>
		<v-layout row>
			<v-flex 
				style="position: absolute; bottom: 50px;"
				xs8 sm6 md3 
				offset-xs4 offset-sm6 offset-md9
				>
				<v-btn
					v-if="isEdit"
					right
					dark
					color="indigo">
					Save
				</v-btn>
				<v-btn
					right
					:to="{ name: 'Home' }"
					dark
					color="red"> 
					Cancel
				</v-btn>
			</v-flex>
		</v-layout>
		
	</div>
</template>

<script>
	import listService from '@/services/listService';
	import productsService from '@/services/productsService';
	import moment from 'moment';

	export default {
		data() {
			return {
				isEdit: false,
				heading: '',
				list: {
					_id: '',
					products: [],
					modified: '',
					created: ''
				},
				availableProducts: []
			}
		},
		methods: {
			addProduct() {
				const now = moment().format();
				let item = {
					_id: '',
					name: '',
					price: '',
					unit: ''
				};
				this.list.products.push(item);
				
				if(!this.list.created) {
					this.list.created = now;
					this.list.modified = now;
				}
			}
		},
		mounted() {
			let id = this.$route.params.id;
			if(id) {
				this.heading = 'Edit Grocery List';
				listService.getList(id).then((response) => {
					this.list = response.data.list; 
					
				})
			}
			else { 
				this.isEdit = true;
				this.heading = 'Add Grocery List';
			}
			// Get available products
			productsService.getProducts().then((response) => {
				this.availableProducts = response.data.items;
			})
		}
	}
</script>
<style scoped>
	.date-info {
		font-size: 9pt;
		font-style: italic;
	}
</style>