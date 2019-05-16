<template>
	<div class="container">
		<Navigation />
		<div class="column">
			<router-view></router-view>
		</div>
	</div>
</template>

<script>
import Navigation from '@/components/Navigation';
export default {
	name: 'app',
	data() {
		return { 
			drawer: false
		}
	},
	methods: {
		goHome() {
			this.$router.push({ name: 'Home' });
		},
		drawerClick () {		
			this.drawer = !this.drawer;
			//return this.drawer;
		},
		navigate(routeName) {		
			this.$router.push({ name: routeName });
			this.drawer = !this.drawer;
		}
	},
	mounted() {
	
	},
	components: {
		Navigation
	}

}
</script>

<style>
	.home {
		cursor: pointer;
	}
	.home:hover {
		text-decoration: underline;
	}

	.datatable__actions__select {
		display: none !important;
	}
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
