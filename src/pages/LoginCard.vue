<template>
  <div class="row">
    <div class="col-md-6" offset-md-3>
      <div>
        <div>
          <h3>Login</h3>
          <hr />
        </div>
        <div class="alert alert-danger" v-if="error">{{ error }}</div>
        <form action="" @submit.prevent="onLogin">
          <div class="form-group">
            <label for="">Email: </label>
            <input type="text" class="form-control" v-model.trim="email" />
            <div class="error" v-if="errors.email">{{ errors.email }}</div>
          </div>
          <div class="form-group">
            <label for="">Password: </label>
            <input
              type="password"
              class="form-control"
              v-model.trim="password"
            />
            <div class="error" v-if="errors.password">
              {{ errors.password }}
            </div>
          </div>
          <div class="my-3">
            <button type="submit" class="btn btn-primary">Login</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import { LOGIN_ACTION } from '@/store/storeconstant';
import { mapActions } from 'vuex';
import SignUpValidation from '../services/SignUpValidation';
export default {
  data() {
    return {
      email: '',
      password: '',
      errors: [],
      error: '',
    };
  },
  methods: {
    ...mapActions('auth', {
      login: LOGIN_ACTION,
    }),
    onLogin() {
      let validations = new SignUpValidation(this.email, this.password);
      this.errors = validations.checkValidations();
      if (this.errors.length > 0) {
        return false;
      }
      this.login({ email: this.email, password: this.password })
        .then(() => {
          this.$router.push('/posts');
        })
        .catch((error) => {
          this.error = error;
        });
    },
  },
};
</script>
