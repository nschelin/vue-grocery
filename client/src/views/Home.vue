<template>
    <div class="container">
        <Products />
    </div>
</template>

<script>
    //import Lists from '../components/Lists.vue';
    import Products from '../components/Products.vue';
    export default {
        name: 'home',
        components: {
            // Lists
            Products
        }        
    }
</script>

<style scoped>

</style>