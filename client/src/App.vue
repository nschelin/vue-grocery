<template>
	<div class="container">
		<div class="column">
			<router-view></router-view>
		</div>
	</div>
  <!-- <v-app dark>
  	<v-navigation-drawer 
	  v-model="drawer"
	  clipped
	  disable-route-watcher
	  app>
		<v-list dense>
			<v-list-tile @click="navigate('Home')">
				<v-list-tile-content>
					<v-list-tile-title>Home</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>

			<v-list-tile @click="navigate('Products')">
				<v-list-tile-content>
					<v-list-tile-title>Products</v-list-tile-title>
				</v-list-tile-content>
			</v-list-tile>

		</v-list>
	</v-navigation-drawer>
  	<v-toolbar app fixed clipped-left>
		<v-toolbar-side-icon @click.stop="drawerClick()"></v-toolbar-side-icon>
    	<v-toolbar-title class="white--text home" @click="goHome()">
			Grocery List
		</v-toolbar-title>
	</v-toolbar>
	<v-content>
			<v-container>
				<router-view></router-view>
			</v-container>
		</v-content>
	<v-footer app fixed>
		<span right>2017</span>
	</v-footer>
</v-app> -->
</template>

<script>
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
