<template>
	<div class="column" v-if="product !== null">
		<form @submit.prevent="saveProduct()">
			<b-field label="Product Name">
				<b-input v-model="product.name" ref="productName"></b-input>
			</b-field>
			<div class="field">
				<label class="label"> Product Price</label>
				<div class="control">
					<money v-model="product.price" v-bind="moneyConfig" class="input" icon="currency-usd"></money>
				</div>
			</div>

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
	import { Money } from 'v-money'
	export default {
		props: ['value', 'active'],
		data: () => ({
			product: null,
			moneyConfig: {
				decimal: '.',
				thousands: ',',
				precision: 2,
				prefix: '$ ',
				masked: false
			}
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
			this.$nextTick(() => setTimeout(() => this.$refs.productName.$el.querySelector('input').focus(), 100));
			
			this.product = this.value !== undefined ? { ...this.value } : null

			// NOTE: Temporary
			if(!this.product.price) {
				this.product.price = 0;
			}
		},
		components: {
			Money
		}
	}
</script>

<style lang="scss" scoped>

	.buttons {
		float: right;
	}
</style>