<template>
	<div class="column" v-if="dinner !== null">
		<form @submit.prevent="saveDinner()">
            <div class="columns">
                <div class="column">
                    <b-field label="Dinner Name">
                        <b-input v-model="dinner.name" ref="dinnerName"></b-input>
                    </b-field>
                </div>
                <div class="column">
                    <div class="columns is-mobile">
                        <div class="column" v-if="total > 0">
                            <label class="label">Cost</label>
                            <div>
                                {{ total | currency }}
                            </div>
                        </div>
                        <div class="column">
                            <b-button type="is-primary is-pulled-right" @click="dinner.products.push({})">Add Product</b-button>
                        </div>
                    </div>
                </div>
            </div>

            <div v-if="dinner.products.length > 0">
                <h3 class="subtitle">Products</h3>
                
                <div class="box">
                    <div class="columns is-mobile" v-for="(product, index) in dinner.products" :key="index">
                        <div class="column is-6">
                            <b-field label="Product">
                                <b-select placeholder="Select Product" v-model="dinner.products[index]">
                                    <option v-for="product in products" :value="product" :key="product._id">
                                        {{ product.name }}
                                    </option>
                                </b-select>
                            </b-field>
                        </div>
                        <div class="column is-4">
                            <label class="label">Product Cost</label>
                            <div>
                                {{ product.price | currency }}
                            </div>
                        </div>
                        <div class="column is-2">
                            <b-button type="is-danger" outlined @click="dinner.products.splice(index, 1)">Remove</b-button>
                        </div>
                    </div>
                </div>
            </div>

            <div class="column is-clearfix">
                <div class="buttons is-pulled-right">
                    <b-button type="is-primary" native-type="submit" :disabled="!dinner.name">
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
            total: function() { return this.dinner !== null ? this.dinner.products.reduce((sum, product) => sum += (product.price ? product.price : 0), 0) : 0; }
        },
		methods: {
			saveDinner() {
				if(!this.dinner._id) {
					this.$store.dispatch('addDinner', this.dinner);				
				}
				else {
					this.$store.dispatch('updateDinner', this.dinner);				
				}

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
    .product-container {
        max-height: 500px;
        overflow-y: scroll;
        border: 1px solid lightgray ;
        border-radius: 3px;
        padding: 8px;
    }
</style>