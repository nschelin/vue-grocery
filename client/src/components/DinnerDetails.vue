<template>
	<div class="column form-container" v-if="dinner !== null">
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
                        <div class="control">
                            <div class="buttons is-pulled-right">
                                <button type="button" class="button is-primary" :disabled="noSelection" @click="dinner.products.push({})">
                                    Add Product
                                </button>
                                <button type="button" class="button is-danger" v-if="dinner.products.length > 0" @click="addProduct()">
                                    Create Product
                                </button>
                            </div>
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

            <div class="field button-row">
                <div class="control is-clearfix">
                    <div class="buttons is-pulled-right">
                        <b-button type="is-primary" native-type="submit" :disabled="!dinner.name">
                            Save
                        </b-button>
                        <b-button @click="$parent.close()">
                            <span class="altkey">C</span>ancel
                        </b-button>
                    </div>
                </div>
            </div>
		</form>

        <b-modal :active.sync="dialog" 
				 :can-cancel="false">
				 <div class="card">
					 <div class="card-header">
						 <div class="card-header-title has-background-primary has-text-white">
						 	Add Product
						 </div>
					 </div>
					 <div class="card-content">
						<ProductDetails v-model="newProduct" :active="dialog" @productSaved="handleSavedProduct"  />
					 </div>
				 </div>
		</b-modal>
        
	</div>
</template>

<script>
	import ProductDetails from './ProductDetails';
    import { mapState } from 'vuex';
	export default {
		props: ['value', 'active'],
		data: () => ({
            dinner: null,
            dialog: false,
            newProduct: null
        }),
        computed: {
            ...mapState({
                products: state => state.productsMod.products.slice().sort((a,b) => a.name > b.name ? 1 : -1)
            }),
            total: function() { return this.dinner !== null ? this.dinner.products.reduce((sum, product) => sum += (product.price ? product.price : 0), 0) : 0; },
            noSelection: function() { 
                // If no products added, allow adding
                if(this.dinner.products.length === 0) 
                    return false;
                
                // check if any product hasn't been selected or not by check if any objects with _id of a product
                const index = this.dinner.products.findIndex(c => !c.hasOwnProperty('_id'));
                
                return index > -1;
            }
        },
        watch: {
            products: function(nv,ov) {
                if(nv.length > ov.length && ov.length !== 0) {
                    const diff = nv.filter(x => !ov.some(y => y._id == x._id));
                    if(diff.length === 1) {
                        this.$nextTick(function(){
                            console.log(diff[0]);
                            this.dinner.products.push(diff[0]);


                        });
                    }
                }
            }
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
            },
            addProduct() {
                this.newProduct = {
                    name: '',
                    price: 0
                }
                this.dialog = true;
            },
            handleSavedProduct(e) {
                if(e.message === 'saved') {
                    this.$store.dispatch('getProducts');
                    
                }
            },
            handleCancel(e) {
                if(e.altKey && e.code === 'KeyC') {
				    this.$parent.close();
			    }
            }
        },
        created() {
            this.$store.dispatch('getProducts');
            window.addEventListener('keypress', this.handleCancel);
        },
        destroyed() {
            window.removeEventListener('keypress', this.handleCancel);
        },
		mounted() {
			this.$nextTick(() => setTimeout(() => 
                this.$refs.dinnerName.focus()
            , 100));
			
			this.dinner = this.value !== undefined ? { ...this.value } : null
        },
        components: {
            ProductDetails
        }
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

    // .form-container {
    //     display: flex;
    //     flex: 1;
    //     flex-direction: column;

    //     & > form {
    //         @extend .form-container
    //     }

    //     form {
    //         :last-child {
    //             margin-top: auto;
    //         }
    //     }
    // }


</style>