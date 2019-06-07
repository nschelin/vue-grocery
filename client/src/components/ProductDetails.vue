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
			<div class="field">
				<div class="control is-clearfix">
					<div class="buttons is-pulled-right">
						<b-button type="is-primary" native-type="submit" :disabled="!product.name">
							Save
						</b-button>
						<b-button @click="$parent.close()">
							<span class="altkey">C</span>ancel
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
			},
			handleCancel(e) {
                if(e.altKey && e.code === 'KeyC') {
				    this.$parent.close();
			    }
            }
		},
		created() {
            window.addEventListener('keypress', this.handleCancel);
        },
        destroyed() {
            window.removeEventListener('keypress', this.handleCancel);
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