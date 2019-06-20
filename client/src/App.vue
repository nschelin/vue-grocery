<template>
	<div class="container">
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

<style lang="scss">
	@import './styles/main.scss';
</style>
