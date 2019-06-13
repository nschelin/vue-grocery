<template>
	<div>
		
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
		
		},
		created() {
			this.$store.dispatch('getProducts');
			this.$store.dispatch('getDinners');
		},
		mounted() {
			
		}
	}
</script>
<style scoped>
	.date-info {
		font-size: 9pt;
		font-style: italic;
	}
</style>