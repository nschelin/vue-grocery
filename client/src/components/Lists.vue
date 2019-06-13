<template>
	<div>
		<div class="column">
			<div class="columns is-mobile">
				<div class="column is-5 is-offset-7">
					<b-button type="is-primary" class="is-pulled-right" @click="addList()">
						<span class="altkey">A</span>dd List
					</b-button>
				</div>
			</div>
		</div>
		<div class="column" v-if="lists.length > 0">
			<b-table :data="lists"
					:paginated="true"
					:per-page="10"
					:default-sort-direction="'asc'"
					:default-sort="lists.name">
				<teamplte slot-scope="props">

				</teamplte>
			</b-table>
		</div>
	</div>
</template>

<script>
	import ListDetails from './ListDetails';
	import { randomNameService } from '@/services';
	import { mapState } from 'vuex';

	export default {
		data: () => ({
			dialog: false,
			currentList: null
		}),
		computed: {
			...mapState({
				lists: state => state.listsMod.lists
			}),
			sortedLists() {
				if(this.lists && this.lists.length) {
					return this.lists.slice().sort((a,b) => {
						return a.name > b.name ? 1 : -1;
					});
				}
				else {
					return [];
				}
			}
		},
		methods: {
			async addList() {
				const { data: { name } = name } = await randomNameService.getRandomName();
				this.currentList = {
					name,
					products:[],
					dinners:[],
					cost: 0
				}
			}
		},
		mounted() {			
		}
	}

	// import listService from '@/services/listService';
	// export default {
	// 	data() {
	// 		return {
	// 			lists: [],
	// 			dialog: false,
	// 			removeList: { },
	// 			snackbar: {
	// 				show: false,
	// 				color: '',
	// 				timeout: 6000,
	// 				text: 'List Deleted',

	// 			}
	// 		}
	// 	},
	// 	computed: {
	// 		sortedLists: function() {
	// 			return this.lists.sort((a, b) => {
	// 				return a.created > b.created ? -1 : 1;
	// 			});
	// 		}
	// 	},
	// 	methods: {
	// 		validateRemove(list) {
	// 			this.dialog = true;
	// 			this.removeList = list;
	// 		},
	// 		remove() {
	// 			listService.deleteList(this.removeList).then((response) => {
	// 				if(response.data.removed === 1) {
	// 					let index = this.lists.findIndex((ll) => ll._id === this.removeList._id);
	// 					this.lists.splice(index, 1);
	// 					this.dialog = false;
	// 					this.removeList = {};
	// 					this.snackbar.show = true;
	// 					this.snackbar.color = 'success';
	// 				}
	// 			});
	// 		}
	// 	},
	// 	mounted() {
	// 		listService.getLists().then((response) => {
	// 			this.lists = response.data.lists;
	// 			console.log(this.lists);
	// 		});
	// 	}
	// }
</script>
