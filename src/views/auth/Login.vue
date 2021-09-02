<template>
  <div class="login">
    <div class="column is-4 is-offset-4">
      <h1 class="title">Login</h1>

      <div class="box">
        <form action="" @submit.prevent="login">
          <div class="field">
            <div class="control">
              <input class="input" type="email" placeholder="Your Email" autofocus="" v-model="username">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input class="input" type="password" placeholder="Your Password" v-model="password">
            </div>
          </div>
          <button type="submit" class="button is-block is-primary is-fullwidth">Login <i class="fa fa-sign-in" aria-hidden="true"></i></button>
        </form>
      </div>

      <p class="has-text-grey">
        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
        <a href="../">Need Help?</a>
      </p>
    </div>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component';
import authHelpers from '@/helpers/authHelpers';

@Options({})
export default class Login extends Vue {
  username = '';
  password = '';

  async login() {
    await authHelpers.signIn(this.username, this.password);
  }
}
</script>

<style lang="scss" scoped>
.login {
  text-align: center;
}
</style>
