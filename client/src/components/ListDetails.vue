<template>
	<div class="column" v-if="list !== null">
		<form @submit.prevent="saveList()">
			<div class="field">
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
	</div>
</template>

<script>
	import { mapState } from 'vuex';

	export default {
		props: [ 'value', 'active' ],
		data: () =>({
			list: null
		}),
		computed: {
			...mapState({
				products: state => state.productsMod.products,
				dinners: state => state.dinnersMode.dinners,
			})
		},
		methods: {
			saveList() {

			},
			handleCancel(e) {
				if(e.altKey && e.code === 'KeyC') {
					this.$parent.close();
				}
			}
		},
		created() {
			this.$store.dispatch('getProducts');
			this.$store.dispatch('getDinners');
		},
		mounted() {
			this.list = this.value !== undefined ? { ...this.value } : null;
		}
	}
</script>
<style scoped>
	.date-info {
		font-size: 9pt;
		font-style: italic;
	}
</style>