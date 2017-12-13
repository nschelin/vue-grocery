<template>
	<div>
		<v-layout row>
			<v-flex md6>
				<h4>Grocery List</h4>
			</v-flex>
			<v-flex md3>
				<v-btn
					:to="{ name: 'Home' }"
					dark
					color="indigo"> 
					BACK
				</v-btn>
			</v-flex>
		</v-layout>
		<v-layout row>
			<v-flex md6>
				<div class="date-info">Created: {{ list.created | dateFormat('MM/DD/YYYY') }}</div>
			</v-flex>
		</v-layout>
		<ul>
			<li v-for="p in list.products" :key="p._id">
				{{ p.product.name }}
			</li>
		</ul>
	</div>
</template>

<script>
	import ListService from '@/services/ListService';
	export default {
		data() {
			return {
				list: {
					_id: '',
					products: [],
					modified: '',
					created: ''
				}
			}
		},
		mounted() {
			let id = this.$route.params.id;
			if(id) {
				ListService.getList(id).then((response) => {
					this.list = response.data.list; 
					
				})
			}
		}
	}
</script>
<style scoped>
	.date-info {
		font-size: 9pt;
		font-style: italic;
	}
</style>