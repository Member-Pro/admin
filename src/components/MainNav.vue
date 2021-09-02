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

          <!-- <a class="navbar-item is-active">Home</a> -->

          <a class="navbar-item">Members</a>

          <a class="navbar-item">Achievements</a>

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
          <div class="navbar-item">
            <div class="buttons">
              <router-link to="/login" class="button is-primary">Log In</router-link>
            </div>
          </div>
        </div>
      </div>
    </div>
  </nav>
</template>
