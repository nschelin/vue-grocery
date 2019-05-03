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
		<v-data-table
			:items="sortedLists" 
			item-key="_id"
			:rows-per-page-items="[10]"
			>
			<template slot="headers" slot-scope="props">
				<tr>
					<th>Grocery List Date</th>
					<th>Actions</th>
				</tr>
			</template>
			<template slot="items" slot-scope="props">
				<tr>
					<td>
						{{ props.item.created | date }}
					</td>
					<td style="text-align: center;">	
						<v-btn color="red" small @click="validateRemove(props.item)">Delete</v-btn>
						<v-btn color="indigo" small :to="{
							name: 'ListEdit',
							params: { id: props.item._id }}">Edit</v-btn>
					</td>
				</tr>
			</template>
		</v-data-table>

		<v-layout row justify-center>
			<v-dialog v-model="dialog" persistent max-width="290">
					<v-card light>
						<v-card-title class="headline">Delete this Grocery List?</v-card-title>
						<v-card-text>
							Deleting this Grocyer List cannot be undone.
						</v-card-text>
						<v-card-actions>
							<v-spacer></v-spacer>
							<v-btn color="red" @click.native="remove()">OK</v-btn>
							<v-btn color="indigo" @click.native="dialog = false">Cancel</v-btn>
						</v-card-actions>
					</v-card>
				</v-dialog>
		</v-layout>
		<v-fab-transition>
			<v-btn
              dark
              fab
              right
			  bottom
			  fixed
			  style="bottom: 5px"
              color="indigo"
			  :to="{ name: 'ListAdd' }"
            >
              <v-icon>add</v-icon>
            </v-btn>
		</v-fab-transition>

		<v-snackbar
			:timeout="snackbar.timeout"
			:color="snackbar.color"
			v-model="snackbar.show"
		>
			{{ snackbar.text }}
			<v-btn dark flat @click.native="snackbar = false">Close</v-btn>
		</v-snackbar>

	</div>
</template>

<script>
	import listService from '@/services/listService';
	export default {
		data() {
			return {
				lists: [],
				dialog: false,
				removeList: { },
				snackbar: {
					show: false,
					color: '',
					timeout: 6000,
					text: 'List Deleted',

				}
			}
		},
		computed: {
			sortedLists: function() {
				return this.lists.sort((a, b) => {
					return a.created > b.created ? -1 : 1;
				});
			}
		},
		methods: {
			validateRemove(list) {
				this.dialog = true;
				this.removeList = list;
			},
			remove() {
				listService.deleteList(this.removeList).then((response) => {
					if(response.data.removed === 1) {
						let index = this.lists.findIndex((ll) => ll._id === this.removeList._id);
						this.lists.splice(index, 1);
						this.dialog = false;
						this.removeList = {};
						this.snackbar.show = true;
						this.snackbar.color = 'success';
					}
				});
			}
		},
		mounted() {
			listService.getLists().then((response) => {
				this.lists = response.data.lists;
				console.log(this.lists);
			});
		}
	}
</script>
