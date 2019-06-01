<template>
	<div>
		<div class="column">
			<div class="columns is-mobile">
				<div class="column is-5 is-offset-7">
					<b-button type="is-primary" class="is-pulled-right" @click="addDinner()"><span class="altkey">A</span>dd Dinner</b-button>
				</div>
			</div>
		</div>
		<div class="column" v-if="dinners.length > 0">
			<b-table :data="dinners" 
					:paginated="true"
					:per-page="10"
					:default-sort-direction="'asc'"
					:default-sort="dinners.name">
				<template slot-scope="props">
					<b-table-column field="name" label="Name">
						<a @click="editDinner(props.row)">{{ props.row.name }}</a>
					</b-table-column>
					<b-table-column field="price" label="Price">
						{{ props.row.price | currency }}
					</b-table-column>
					<b-table-column field="created" label="Created">
						{{ props.row.created | date }}
					</b-table-column>
					<b-table-column field="modified" label="Modified">
						{{ props.row.modified | date }}
					</b-table-column>
					<b-table-column label="Delete">
						<a @click="deleteDinner(props.row)" class="button has-background-danger has-text-white">Delete</a>
					</b-table-column>
				</template>
			</b-table>
		</div>
		<b-modal :active.sync="dialog" 
				 :can-cancel="false">
				 <div class="card">
					 <div class="card-header">
						 <div class="card-header-title has-background-primary has-text-white">
						 	Add/Edit Dinner
						 </div>
					 </div>
					 <div class="card-content">
						<!-- <DinnerDetails v-model="currentDinner" :active="dialog"  /> -->
					 </div>
				 </div>
		</b-modal>
	</div>
</template>

<script>


import { mapState } from 'vuex';

export default {
	data: () => ({
		dialog: false,
		currentDinner: null		
	}),
	computed: {
		...mapState({
			// NOTE: state.moduleName.dinnersObject.dinnersArrayOfActualDinnerss
			dinners: state => state.dinnersMod.dinners
		}),
		sortedDinners: function() {
			if(this.dinners && this.dinners.length) {
				return this.dinners.slice().sort((a,b) => {
					return a.name > b.name ? 1 : -1;
				});
			}
			else
				return [];
		}
	},
	methods: {
		addDinner() {
			this.currentDinner = {
				name: '',
				price: 0
			}
			this.dialog = true;
		},
		editDinner(dinner) {
			this.currentDinner = dinner;
			this.dialog = true;
		},
		deleteDinner(dinner) {
			if(confirm('Delete Dinner?')) {
				this.$store.dispatch('deleteDinner', dinner);
			}
		},
		handleAdd(e) {
			if(e.altKey && e.code === 'KeyA') {
				this.addDinner();
			}
		}
	},
	created() {
		this.$store.dispatch('getDinners');
		window.addEventListener('keypress', this.handleAdd);
	},
	destroyed() {
		window.removeEventListener('keypress', this.handleAdd);
	},
	components: {
		// DinnerDetails
	}
}

</script>
<style scoped>
	.card {
		border-radius: 5px;
	}

	.card-header-title {
		border-top-left-radius: 5px;
		border-top-right-radius: 5px;
	}
</style>
