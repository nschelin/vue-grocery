<template>
	<div class="column" v-if="list !== null">
		<form @submit.prevent="saveList()">
			<div class="field is-horizontal">
				<div class="field-body">
					<div class="field">
						<label class="label">List Name</label>
						<div class="control">
							<input type="text" class="input" ref="listName" v-model="list.name">
						</div>
					</div>
				</div>
			</div>

			<div class="field is-horizontal">
				<div class="field-body">
					<div class="field">
						<div class="control is-clearfix">
							<button class="button is-primary is-pulled-right" type="button" @click="list.dinners.push({})" :disabled="list.dinners.length === days.length">Add Dinner</button>
						</div>
					</div>
				</div>
			</div>

			<div v-if="list.dinners.length > 0">
				<div class="box">
					<div class="field is-horizontal" v-for="(dinner, index) in list.dinners" :key="index">
						<div class="field-body">
							<div class="field">
								<label class="label">Dinner</label>
								<b-select placeholder="Select Dinner" v-model="list.dinners[index].dinner">
									<option v-for="dinner in dinners" :value="dinner" :key="dinner._id">
										{{ dinner.name }}
									</option>
								</b-select>
							</div>
							<div class="field">
								<label class="label">Day</label>
								<b-select placeholder="Select Day" v-model="list.dinners[index].day">
									<option v-for="(day, dIndex) in days" :value="day" :key="dIndex">
										{{ day }}
									</option>
								</b-select>
							</div>
						</div>
					</div>
				</div>
			</div>


			<div class="field">
                <div class="control is-clearfix">
                    <div class="buttons is-pulled-right">
                        <b-button type="is-primary" native-type="submit" :disabled="!list.name">
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
				dinners: state => state.dinnersMod.dinners,
				days: state => state.days
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
			this.$nextTick(() => setTimeout(() => 
					this.$refs.listName.focus()
			, 100));
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