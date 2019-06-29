<template>
	<div class="hey">
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
					<b-table-column field="name" label="Name">
						{{ props.row.name }}
					</b-table-column>  
				</teamplte>
			</b-table>
		</div>
		<div class="column" v-else>
			<div class="box no-items">
				No Lists Available
			</div>
		</div>

		<b-modal :active.sync="dialog"
				:can-cancel="false"
				full-screen>
			<div class="card">
				<div class="card-header">
					<div class="card-header-title has-background-primary has-text-white">
						Add/Edit List
					</div>
				</div>
				<div class="card-content">
					<ListDetails v-model="currentList" :active="dialog" />
				</div>
			</div>
		</b-modal>
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
				};

				this.dialog = true;
			}
		},
		mounted() {			
		},
		components: {
			ListDetails
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
