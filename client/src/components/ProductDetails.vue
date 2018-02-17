<template>
  <v-form v-model="valid" ref="form">
	  <v-text-field
	  	label="Product Name"
		v-model="product.name"
		required
		autofocus
		:rules="nameRules"
	  >
	  </v-text-field>
	  <v-text-field
	  	label="Price"
		v-model="product.price"
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
	  <v-btn @click="submit" :disabled="!valid" color="indigo">Submit</v-btn>
	  <v-btn @click="cancel" color="red" >Cancel</v-btn>
  </v-form>
</template>

<script>
	import ProductService from '@/services/ProductsService'

	export default {
		data() {
			return {
				valid: true,
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
					(v) => /\d+(\.\d{2})?/.test(v) || 'A valid currency amount is required',//(!isNaN(v) && v.toString().indexOf('.') != -1) || 'A number is required',
					(v) => +v > -1 || 'Please enter a positive number'
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
				if(this.product._id && this.$refs.form.validate()) {
					console.log('in update')
					ProductService.updateProduct(this.product).then(() => {
						this.$router.push({ name: 'Products' });
					});
				}
				else {
					if(this.$refs.form.validate()) {
						console.log('in new')
						ProductService.insertProduct(this.product).then(() => {
							this.$router.push({ name: 'Products' });
						});
					}
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