<template>
    <nav class="navbar" role="navigation" aria-label="main navigation">
  <div class="navbar-brand">
    <router-link class="navbar-item is-size-1-mobile is-size-2-tablet has-text-weight-semibold" to="/" active-class="" exact>
      Grocery List
    </router-link>

    <div role="button" @click="show = !show" class="navbar-burger burger" :class="{ 'is-active': show }" aria-label="menu" aria-expanded="false">
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
      <span aria-hidden="true"></span>
    </div>
  </div>

  <div class="navbar-menu" :class="{ 'is-active': show }">

    <div class="navbar-end">
      <router-link class="navbar-item" to="lists">
        <span class="altkey">L</span>ists
      </router-link>

      <router-link class="navbar-item" to="products">
        <span class="altkey">P</span>roducts
      </router-link>

      <router-link class="navbar-item" to="dinners">
        <span class="altkey" title="Alt+D">D</span>inners
      </router-link>

      <!-- <div class="navbar-item">
        <div class="buttons">
          <a class="button is-light">
            Log in
          </a>
        </div>
      </div> -->
    </div>
  </div>
</nav>
</template>

<script>
    export default {
        data: () => ({
            show: false
        })
    }
</script>

<style lang="scss" scoped>
    .router-link-active {
        background-color: #fafafa;
        color: #7957d5;;
    }
</style>