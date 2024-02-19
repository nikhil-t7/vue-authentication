<template>
  <div class="row">
    <div class="col-md-6" offset-md-3>
      <div>
        <div>
          <h3>Sign Up</h3>
          <hr />
        </div>
        <div v-if="error" class="alert alert-danger">{{ error }}</div>
        <form action="" @submit.prevent="onSignUp">
          <div class="form-group">
            <label for="">Email: </label>
            <input type="text" class="form-control" v-model="email" />
            <div class="error" v-if="errors.email">{{ errors.email }}</div>
          </div>
          <div class="form-group">
            <label for="">Password: </label>
            <input type="password" class="form-control" v-model="password" />
            <div class="error" v-if="errors.password">
              {{ errors.password }}
            </div>
          </div>
          <div class="my-3">
            <button type="submit" class="btn btn-primary">Sign Up</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
<script>
import SignUpValidation from '@/services/SignUpValidation';
import { mapActions } from 'vuex';
import { SIGNUP_ACTION } from '@/store/storeconstant';
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
      signup: SIGNUP_ACTION,
    }),
    onSignUp() {
      let validations = new SignUpValidation(this.email, this.password);
      this.errors = validations.checkValidations();
      if ('email' in this.errors || 'password' in this.errors) {
        return false;
      }
      this.signup({ email: this.email, password: this.password }).catch(
        (error) => {
          this.error = error;
        }
      );
    },
  },
};
</script>
