<template>
  <div id="app">
    <nav class="navbar navbar-expand navbar-dark bg-dark">
      <a href="/" class="navbar-brand">Persona 5</a>
      <div class="navbar-nav mr-auto">
        <li class="nav-item">
          <router-link to="/home" class="nav-link">
            <font-awesome-icon icon="list" /> Tables
          </router-link>
        </li>
<!--        <li class="nav-item">-->
<!--          <router-link v-if="currentUser" to="/add" class="nav-link">-->
<!--            <font-awesome-icon icon="plus" /> Add New Project-->
<!--          </router-link>-->
<!--        </li>-->
      </div>

      <div v-if="!currentUser" class="navbar-nav ml-auto">
        <li class="nav-item">
          <router-link to="/register" class="nav-link">
            <font-awesome-icon icon="user-plus" /> Sign Up
          </router-link>
        </li>
        <li class="nav-item">
          <router-link to="/login" class="nav-link">
            <font-awesome-icon icon="sign-in-alt" /> Login
          </router-link>
        </li>
      </div>

      <div v-if="currentUser" class="navbar-nav ml-auto">
<!--        <li class="nav-item">-->
<!--          <router-link to="/notifications" class="nav-link">-->
<!--            <font-awesome-icon icon="bell"/>-->
<!--            Notifications-->
<!--            <label v-if="currentNotifications !== 0">-->
<!--              ({{ currentNotifications }})-->
<!--            </label>-->
<!--          </router-link>-->
<!--        </li>-->
        <li class="nav-item">
          <router-link to="/profile" class="nav-link">
            <font-awesome-icon icon="user" />
            {{ currentUser.username }}
          </router-link>
        </li>
        <li class="nav-item">
          <a class="nav-link" @click.prevent="logOut">
            <font-awesome-icon icon="sign-out-alt" /> LogOut
          </a>
        </li>
      </div>
    </nav>

    <div class="container">
      <router-view />
    </div>
  </div>
</template>

<script>
import EventBus from "./common/EventBus";

export default {


  computed: {
    currentUser() {
      // return true
      return this.$store.state.auth.user;
    },
  },
  methods: {
    logOut() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    },
  },
  mounted() {
    EventBus.on("logout", () => {
      this.logOut();
    });
  },
  beforeUnmount() {
    EventBus.remove("logout");
  },
};
</script>
