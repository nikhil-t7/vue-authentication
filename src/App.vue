<template>
  <NavigationBar></NavigationBar>
  <TheLoader v-if="isLoading"></TheLoader>
  <div class="container">
    <div class="row">
      <div class="col-md-12">
        <div>
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import NavigationBar from './components/NavigationBar.vue';
import TheLoader from './components/TheLoader.vue';
import { AUTO_LOGIN_ACTION } from '@/store/storeconstant';
export default {
  name: 'App',
  components: {
    NavigationBar,
    TheLoader,
  },
  computed: {
    ...mapState({
      isLoading: (state) => state.showLoading,
    }),
  },
  created() {
    this.$store.dispatch(`auth/${AUTO_LOGIN_ACTION}`);
  },
};
</script>

<style></style>
