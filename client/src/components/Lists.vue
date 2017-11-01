<template>
  
</template>

<script>
	import ListService from '@/services/ProductsService'
	export default {
		data() {
			return {
				lists: []
			}
		},
		mounted: {
			ListService.getLists().then((response) => {
				this.lists = response.data.lists;
			});
		}
	}
</script>
