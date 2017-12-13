<template>
	<div>
		<v-layout row>
			<v-flex md6>
				<h4>Grocery Lists</h4>
			</v-flex>
			<v-flex md-6>
				<!-- <v-btn 
					:to="{ name: 'ProductsAdd'}"
					fab 
					dark 
					color="indigo">
					<v-icon dark>add</v-icon>
				</v-btn> -->
			</v-flex>
		</v-layout>

		<v-layout 
			row
			v-for="list in lists" :key="list._id">
				<v-flex md2>
					<v-btn color="red" @click="remove(list)">Delete</v-btn>
				</v-flex>

				<v-flex md6 class="pt-3">
					
					 <router-link :to="{ name: 'ListEdit', 
												params: { id: list._id } }">
												{{ list.created | dateFormat('MM/DD/YYYY') }}
							</router-link>
				</v-flex>
		</v-layout>

	</div>

</template>

<script>
	import ListService from '@/services/ListService';
	export default {
		data() {
			return {
				lists: []
			}
		},
		methods: {
			remove(list) {
				console.log(list);
				ListService.deleteList(list).then((response) => {
					if(response.data.removed === 1) {
						let index = this.lists.findIndex((ll) => ll._id === list._id);
						this.lists.splice(index, 1);
					}
				})
			}
		},
		mounted() {
			ListService.getLists().then((response) => {
				this.lists = response.data.lists.sort((a, b) => {
					return a.created < b.created;
				});
			});
		}
	}
</script>
