<template>
	<div class="container">
		Lists!
	</div>
</template>

<script>
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
