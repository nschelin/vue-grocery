<template>
	<div class="container">
		<Navigation />
		<div class="column">
			<transition name="slide-left">
				<router-view></router-view>
			</transition>
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
	created() {
		window.addEventListener('keyup', (e) => {
		
			if(e.altKey && e.code === 'KeyP') {
				this.$router.push({ name: 'Products' });
			}
			else if(e.altKey && e.code === 'KeyD') {
				this.$router.push({ name: 'Dinners' });
			}
			else if(e.altKey && e.code === 'KeyL') {
				this.$router.push({ name: 'Lists' });
			}
			else if(e.altKey && e.code === 'KeyG') {
				this.$router.push({ name: 'Home' });
			}
			else {
				const altKeys = Array.from(document.querySelectorAll('.altkey'));
				altKeys.forEach(altKey => altKey.classList.remove('underline'));
			}
		});

		window.addEventListener('keydown', (e) => {
			if(e.altKey) {
				const altKeys = Array.from(document.querySelectorAll('.altkey'));
				altKeys.forEach(altKey => altKey.classList.add('underline'));
			}
			
		})
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

	.slide-left-enter {
		opacity: 0;
		transform: translate(100%, 0);
	}
	
	.slide-left-leave-to {
		opacity: 0;
		transform: translate(-100%, 0);
	}
	
	.slide-left-enter-active, 
	.slide-left-leave-active {		
		position: absolute !important;
		transition: all .8s cubic-bezier(.35,0,.25,1);
	}

	.underline {
		text-decoration: underline;
	}

	@media (max-width: 768px) {
		.slide-left-enter-active, 
		.slide-left-leave-active {		
			margin: 0 auto;
			width: 98%;
		}
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
