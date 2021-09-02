<template>
  <div class="login">
    <div class="column is-4 is-offset-4">
      <h1 class="title">Login</h1>

      <div class="box">
        <form action="">
          <div class="field">
            <div class="control">
              <input class="input" type="email" placeholder="Your Email" autofocus="">
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input class="input" type="password" placeholder="Your Password">
            </div>
          </div>
          <button class="button is-block is-primary is-fullwidth">Login <i class="fa fa-sign-in" aria-hidden="true"></i></button>
        </form>
      </div>

      <p class="has-text-grey">
        <a href="../">Forgot Password</a> &nbsp;·&nbsp;
        <a href="../">Need Help?</a>
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.login {
  text-align: center;
}
</style>
