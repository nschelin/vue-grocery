<template>
	<div class="column" v-if="dinner !== null">
		<form @submit.prevent="saveDinner()">
			<b-field label="Dinner Name">
				<b-input v-model="dinner.name" ref="dinnerName"></b-input>
                <div>{{ total | currency }}</div>
			</b-field>
            <div class="column is-clearfix">
                <b-button type="is-primary is-pulled-right" @click="dinner.products.push({})">Add Product</b-button>
            </div>
            
			<div class="field" v-for="(product, index) in dinner.products" :key="product._id">
				<label class="label">Product</label>
				<div class="control">
					<b-select placeholder="Select Product" v-model="dinner.products[index]">
                        <option v-for="product in products" :value="product" :key="product._id">
                            {{ product.name }}
                        </option>
					</b-select>
				</div>
                <div class="control">
                   Cost {{ product.price | currency }}
                </div>
			</div> 

			<div class="column is-clearfix">
                <div class="buttons is-pulled-right">
                    <b-button type="is-primary" native-type="submit">
                        Save
                    </b-button>
                    <b-button @click="$parent.close()">
                        Cancel
                    </b-button>
                </div>
			</div>
		</form>
	</div>
</template>

<script>
    import { mapState } from 'vuex';

	export default {
		props: ['value', 'active'],
		data: () => ({
			dinner: null,
        }),
        computed: {
            ...mapState({
                products: state => state.productsMod.products
            }),
            total: function() { return this.dinner !== null ? this.dinner.products.reduce((sum, product) => sum += product.price, 0) : 0; }
        },
		methods: {
			saveDinner() {
				// if(!this.product._id) {
				// 	this.$store.dispatch('addProduct', this.product);				
				// }
				// else {
				// 	this.$store.dispatch('updateProduct', this.product);				
				// }

				this.$parent.close();
			}
        },
        created() {
            this.$store.dispatch('getProducts');
        },
		mounted() {
			this.$nextTick(() => setTimeout(() => this.$refs.dinnerName.$el.querySelector('input').focus(), 100));
			
			this.dinner = this.value !== undefined ? { ...this.value } : null
		},
	}
</script>

<style lang="scss" scoped>

	// .buttons {
	// 	float: right;
	// }
</style>