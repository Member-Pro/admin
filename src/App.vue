<template>
  <div class="app">
    <main-nav />

    <section class="body container">
      <div class="section">
        <router-view/>
      </div>
    </section>
  </div>
<!-- <div id="nav">
<router-link to="/">Home</router-link> |
<router-link to="/about">About</router-link>
</div> -->
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import MainNav from '@/components/MainNav.vue';

@Options({
  components: {
    MainNav,
  },
})
export default class App extends Vue { }
</script>

<style lang="scss">
@import '@/assets/scss/main.scss';

</style>
