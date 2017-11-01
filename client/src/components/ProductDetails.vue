<template>
  <v-form ref="form">
	  <v-text-field
	  	label="Product Name"
		v-model="product.name"
		required
		:rules="nameRules"
	  >
	  </v-text-field>
	  <v-text-field
	  	label="Price"
		v-model.number="product.price"
		:rules="priceRules"
		required
		prefix="$"
	  >
	  </v-text-field>
	  <v-select
	  	label="Unit"
		:items="units"
		single-line
		bottom
	  	v-model="product.unit"
		:rules="unitRules"
		required
	  ></v-select>
	  <v-btn @click="submit">Submit</v-btn>
	  <v-btn @click="cancel" >Cancel</v-btn>
  </v-form>
</template>

<script>
	import ProductService from '@/services/ProductsService'

	export default {
		data() {
			return {
				product: {
					_id: '',
					name: '',
					price: '0.00',
					unit: ''
				},
				nameRules: [
					(v) => !!v || 'Name is required'
				],
				priceRules: [
					(v) => !!v || 'Price is required',
					(v) => !isNaN(v) && v.toString().indexOf('.') != -1 || 'A number is required'
				],
				unitRules: [
					() => this.product.unit.length > 0 || 'Please select a unit'
				],
				units: [
					{ text: 'pound (lb)', value: 'pound' },
					{ text: 'item', value: 'item' }
				],
				
			}
		},
		methods: {
			submit() {
				if(this.product._id) {
					console.log('in update')
					ProductService.updateProduct(this.product).then(() => {
						this.$router.push({ name: 'Products' });
					});
				}
				else {
					console.log('in new')
					ProductService.insertProduct(this.product).then(() => {
						this.$router.push({ name: 'Products' });
					})
				}
			},
			cancel() {
				this.$router.push({ name: 'Products' });
			}
		},
		mounted() {
			let id = this.$route.params.id;

			if(id) {
				ProductService.getProduct(id).then((response) => {
					this.product = response.data.item; 
					console.log(this.product);
				})
			}
			// else {
			// 	console.log('else');
			// 	this.proudct = {
			// 		id: '',
			// 		name: '',
			// 		price: 0,
			// 		unit: ''
			// 	}
			// }
		}
	}
</script>