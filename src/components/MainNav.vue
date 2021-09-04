<template>
  <nav class="navbar is-dark" role="navigation" aria-label="main navigation">
    <div class="container">
      <div class="navbar-brand">
        <a class="navbar-item" href="#">
          MP ADMIN
        </a>

        <a role="button" class="navbar-burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
          <span aria-hidden="true"></span>
        </a>
      </div>

      <div id="navbarBasicExample" class="navbar-menu">
        <div class="navbar-start">
          <router-link to="/" class="navbar-item">Home</router-link>

          <a class="navbar-item">Members</a>
          <router-link to="/achievements" class="navbar-item">Achievements</router-link>

          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              Configuration
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                Geography
              </a>
              <a class="navbar-item">
                Regions &amp; Divisions
              </a>
            </div>
          </div>
        </div>

        <div class="navbar-end">
          <div v-if="!isAuthenticated" class="navbar-item">
            <div class="buttons">
              <router-link to="/login" class="button is-primary">Log In</router-link>
            </div>
          </div>

          <div v-else class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link">
              {{ userName }}
            </a>

            <div class="navbar-dropdown">
              <a class="navbar-item">
                Settings
              </a>

              <hr class="navbar-divider">

              <a @click.prevent="signOut" class="navbar-item">
                Logout
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import authService from '@/services/authService';

@Options({
  watch: {
    $route: 'authenticate',
  },
})
export default class Login extends Vue {
  isAuthenticated = false;
  userName = '';

  async created() {
    await this.authenticate();
  }

  async authenticate() {
    this.isAuthenticated = await authService.isAuthenticated();
    this.userName = await authService.getUserName();
  }

  async signOut() {
    await authService.signOut();

    this.$router.push('/login');
  }
}
</script>
