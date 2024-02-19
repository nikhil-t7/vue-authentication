<template>
  <div>
    <h2>Posts Details</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
          <td>{{ post.description }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>
<script>
import axios from 'axios';
import { mapGetters, mapMutations } from 'vuex';
import {
  GET_USER_TOKEN_GETTER,
  LOADING_SPINNER_SHOW_MUTATION,
} from '@/store/storeconstant';
export default {
  data() {
    return {
      posts: [],
    };
  },
  computed: {
    ...mapGetters('auth', {
      token: GET_USER_TOKEN_GETTER,
    }),
  },
  methods: {
    ...mapMutations('auth', {}),
  },
  mounted() {
    this.$store.commit(LOADING_SPINNER_SHOW_MUTATION, true, { root: true });
    try {
      axios
        .get(
          `https://vue-js-155b4-default-rtdb.firebaseio.com/posts.json?auth=${this.token}`
        )
        .then((response) => {
          this.posts = Object.keys(response.data).map((key) => ({
            ...response.data[key],
            id: key,
          }));
        });
    } catch (error) {
      console.log(error);
    } finally {
      this.$store.commit(LOADING_SPINNER_SHOW_MUTATION, false, { root: true });
    }
  },
};
</script>
