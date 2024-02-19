<template>
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <a class="navbar-brand" href="#">Navbar</a>
    <button
      class="navbar-toggler"
      type="button"
      data-toggle="collapse"
      data-target="#navbarNav"
      aria-controls="navbarNav"
      aria-expanded="false"
      aria-label="Toggle navigation"
    >
      <span class="navbar-toggler-icon"></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
      <ul class="navbar-nav">
        <li class="nav-item" >
          <router-link to="/" class="nav-link">Home</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/login" class="nav-link">Login</router-link>
        </li>
        <li class="nav-item" v-if="!isAuthenticated">
          <router-link to="/signup" class="nav-link">Sign Up</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <router-link to="/posts" class="nav-link">Posts List</router-link>
        </li>
        <li class="nav-item" v-if="isAuthenticated">
          <a @click.prevent="onLogout" class="nav-link">Logout</a>
        </li>
      </ul>
    </div>
  </nav>
</template>
<script>
import { mapActions, mapGetters } from 'vuex';
import {
  IS_USER_AUTHENTICATED_GETTER,
  LOGOUT_ACTION,
} from '@/store/storeconstant';
export default {
  computed: {
    ...mapGetters('auth', {
      isAuthenticated: IS_USER_AUTHENTICATED_GETTER,
    }),
  },
  methods: {
    ...mapActions('auth', {
      logout: LOGOUT_ACTION,
    }),
    onLogout() {
      this.logout();
      this.$router.replace('/login');
    },
  },
};
</script>
