<template>
	<div>
		<Navigation />
		<div class="column main-container">
			<transition name="slide-left" mode="out-in">
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

	.main-container {
		position: relative mode="out-in";
	}
	.home {
		cursor: pointer;
	}

	.home:hover {
		text-decoration: underline;
	}

	.underline {
		text-decoration: underline;
	}

	.datatable__actions__select {
		display: none !important;
	}

	/* 	transition taken from:
		https://markus.oberlehner.net/blog/vue-router-page-transitions/
	*/
	.slide-left-enter-active,
	.slide-left-leave-active {
		transition-duration: 0.5s;
		transition-property: height, opacity, transform;
		transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
		overflow: hidden;
	}

	.slide-left-enter {
		opacity: 0;
		transform: translate(2em, 0);
	}

	.slide-left-leave-active {
		opacity: 0;
		transform: translate(-2em, 0);
	}


	/* .slide-left-enter {
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

	

	@media (max-width: 768px) {
		.slide-left-enter-active, 
		.slide-left-leave-active {		
			margin: 0 auto;
			width: 98%;
		}
	} */
/*#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}*/
</style>
