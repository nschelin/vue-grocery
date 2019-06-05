<template>
	<div class="column" v-if="dinner !== null">
		<form @submit.prevent="saveDinner()">
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <label class="label">Dinner Name</label>
                        <div class="control">
                            <input type="text" class="input" ref="dinnerName" v-model="dinner.name" />
                        </div>
                    </div>
                    <div class="field" v-if="total > 0">
                        <label class="label">Cost</label>
                        <div class="control">
                            {{ total | currency}}
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="field is-horizontal">
                <div class="field-body">
                    <div class="field">
                        <h3 class="subtitle" v-if="dinner.products.length > 0">Products</h3>
                    </div>
                    <div class="field">
                        <div class="control is-clearfix">
                            <button type="button" class="button is-primary is-pulled-right" @click="dinner.products.push({})">
                                Add Product
                            </button>
                        </div>
                    </div>
                </div>
            </div>
           
            <div v-if="dinner.products.length > 0">                
                <div class="box" style="margin-bottom: 20px;">
                    <div class="field is-horizontal" v-for="(product, index) in dinner.products" :key="index">
                        <div class="field-body">
                            <div class="field">
                                <label class="label">Product Name</label>
                                <b-select placeholder="Select Product" v-model="dinner.products[index]">
                                    <option v-for="product in products" :value="product" :key="product._id">
                                        {{ product.name }}
                                    </option>
                                </b-select>                                    
                            </div>
                            <div class="field">
                                <label class="label">Product Cost</label>
                                <div>
                                    {{ product.price | currency }}
                                </div>
                            </div>
                            <div class="field">
                                <div class="control is-clearfix">
                                    <button type="button" style="margin-top: 20px;" 
                                            class="button is-danger is-outlined is-pulled-right" 
                                            @click="dinner.products.splice(index, 1)">Remove</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div class="field">
                <div class="control is-clearfix">
                    <div class="buttons is-pulled-right">
                        <b-button type="is-primary" native-type="submit" :disabled="!dinner.name">
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
    import { mapState } from 'vuex';

	export default {
		props: ['value', 'active'],
		data: () => ({
			dinner: null,
        }),
        computed: {
            ...mapState({
                products: state => state.productsMod.products.slice().sort((a,b) => a.name > b.name ? 1 : -1)
            }),
            total: function() { return this.dinner !== null ? this.dinner.products.reduce((sum, product) => sum += (product.price ? product.price : 0), 0) : 0; }
        },
		methods: {
			saveDinner() {
                this.dinner.cost = this.total;
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
			this.$nextTick(() => setTimeout(() => 
                this.$refs.dinnerName.focus()
            , 100));
			
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