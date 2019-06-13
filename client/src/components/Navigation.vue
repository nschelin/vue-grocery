<template>
    <nav class="navbar has-shadow is-transparent is-fixed-top" role="navigation" aria-label="main navigation">
      <div class="navbar-brand">
        <router-link class="navbar-item has-text-weight-bold" to="/" active-class="" exact>
          <span class="altkey">G</span>rocery List
        </router-link>
        <!-- <div class="theme-button" @click="clicked = !clicked"><span :class="[clicked ? 'mdi-lightbulb' : 'mdi-lightbulb-on-outline' ]" class="mdi"></span></div> -->
        <div role="button" @click="show = !show" class="navbar-burger burger" :class="{ 'is-active': show }" aria-label="menu" aria-expanded="false">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </div>
      </div>

      <div class="navbar-menu" :class="{ 'is-active': show }">

        <div class="navbar-end">
          <router-link class="navbar-item" to="lists" @click.native="show = false">
            <span class="altkey">L</span>ists
          </router-link>

          <router-link class="navbar-item" to="products" @click.native="show = false">
            <span class="altkey">P</span>roducts
          </router-link>

          <router-link class="navbar-item" to="dinners" @click.native="show = false">
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
            show: false,
            clicked: false
        }),
        watch: {
          clicked(newVal) {
            const body = document.querySelector('body');
            const el = this.$el;
            const anchors = Array.from(el.querySelectorAll('a'));
            if(newVal) {
              body.classList.add('has-background-dark');
              el.classList.add('has-background-dark');
              anchors.forEach(a => a.classList.add('has-text-light'));
            }
            else {
              body.classList.remove('has-background-dark');
              el.classList.remove('has-background-dark');
              anchors.forEach(a => a.classList.remove('has-text-light'));
            }
          } 
        }
    }
</script>

<style lang="scss" scoped>
    nav {
      padding-left: 15px;
      padding-right: 15px;
    }
    .router-link-active {
        background-color: #fafafa;
        color: #7957d5;;
    }

    // .theme-button {
    //   display: block;
    //   margin-left: auto;
    //   padding: 10px;
    // }
    // .navbar-burger {
    //   margin-left: 0;
    // }
</style>