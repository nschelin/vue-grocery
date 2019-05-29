<template>
	<div class="column" v-if="product !== null">
		<form @submit.prevent="saveProduct()">
			<b-field label="Product Name">
				<b-input v-model="product.name"></b-input>
			</b-field>
			<b-field label="Product Price">
				<b-input v-model="product.price" icon="currency-usd"></b-input>
			</b-field>

			<div class="columns">
				<div class="column is-offset-9">
					<div class="buttons">
						<b-button type="is-primary" native-type="submit">
							Save
						</b-button>
						<b-button @click="$parent.close()">
							Cancel
						</b-button>
					</div>
				</div>
			</div>
		</form>
	</div>
</template>

<script>
	export default {
		props: ['value', 'active'],
		data: () => ({
			product: null
		}),
		methods: {
			saveProduct() {
				if(!this.product._id) {
					this.$store.dispatch('addProduct', this.product);				
				}
				else {
					this.$store.dispatch('updateProduct', this.product);				
				}

				this.$parent.close();
			}
		},
		mounted() {
			this.product = this.value !== undefined ? { ...this.value } : null

			// NOTE: Temporary
			if(!this.product.price) {
				this.product.price = 0;
			}
		}
	}
</script>

<style lang="scss" scoped>

	.buttons {
		float: right;
	}
</style>