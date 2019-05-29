<template>
	<div class="column">
		<b-field label="Product Name">
			<b-input v-model="productName"></b-input>
		</b-field>
		<b-field label="Product Price">
			<b-input v-model="productPrice"></b-input>
		</b-field>

		<div class="columns">
			<div class="column is-offset-9">
				<div class="buttons">
					<b-button type="is-primary" @click="$parent.close()">
						Save
					</b-button>
					<b-button @click="$parent.close()">
						Cancel
					</b-button>
				</div>
			</div>
		</div>

	</div>
</template>

<script>
	export default {
		props: ['value', 'active'],
		data: () => ({
			productId: 0,
			productName: '',
			productPrice: null
		})
	}
</script>

<style lang="scss" scoped>

	.buttons {
		float: right;
	}
</style>