import SignUpValidation from '@/services/SignUpValidation';
import {
  SIGNUP_ACTION,
  SET_USER_TOKEN_DATA_MUTATION,
  LOADING_SPINNER_SHOW_MUTATION,
  LOGIN_ACTION,
  LOGOUT_ACTION,
  AUTO_LOGIN_ACTION,
  AUTO_LOGOUT_ACTION,
} from '@/store/storeconstant';

import axios from 'axios';
let timer = '';
export default {
  [AUTO_LOGOUT_ACTION](context) {
    context.dispatch(LOGOUT_ACTION);
  },

  [AUTO_LOGIN_ACTION](context) {
    let userData = JSON.parse(localStorage.getItem('userData'));
  
    if (userData) {
      let expiresTime = userData.expiresIn - new Date().getTime();
      if (expiresTime < 10000) {
        context.dispatch(AUTO_LOGOUT_ACTION);
      } else {
        timer = setTimeout(() => {
          context.dispatch(AUTO_LOGOUT_ACTION);
        }, expiresTime);
      }
      
      context.commit(SET_USER_TOKEN_DATA_MUTATION, userData);
      
    }
  },  
  [LOGOUT_ACTION](context) {
    context.commit(SET_USER_TOKEN_DATA_MUTATION, {
      email: null,
      token: null,
      expiresIn: null,
      refreshToken: null,
      userId: null,
    });
    localStorage.removeItem('userData');
    if (timer) {
      clearTimeout(timer);
    }
  },
  async [LOGIN_ACTION](context, payload) {
    let postData = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };
    let response = ' ';
    context.commit(LOADING_SPINNER_SHOW_MUTATION, true, { root: true });
    try {
      response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDrOMIEht6JaIB9H3bwYlZNScYy8QpM1zc`,
        postData
      );
      if (response.status === 200) {
        const exTime = response.data.expiresIn;
        const tokenData = {
          email: response.data.email,
          token: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshToken: response.data.refreshToken,
          userId: response.data.userId,
        };
        timer = setTimeout(() => {
          context.dispatch(AUTO_LOGOUT_ACTION);
        }, exTime * 1000);
        localStorage.setItem('userData', JSON.stringify(tokenData));
        context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData);
      }
    } catch (error) {
      let errorMessage = SignUpValidation.getErrorMessageFromCode(
        error.response.data.error.errors[0].message
      );
      throw errorMessage;
    } finally {
      context.commit(LOADING_SPINNER_SHOW_MUTATION, false, { root: true });
    }
  },
  async [SIGNUP_ACTION](context, payload) {
    let postData = {
      email: payload.email,
      password: payload.password,
      returnSecureToken: true,
    };
    let response = ' ';
    context.commit(LOADING_SPINNER_SHOW_MUTATION, true, { root: true });
    try {
      response = await axios.post(
        `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyDrOMIEht6JaIB9H3bwYlZNScYy8QpM1zc`,
        postData
      );
      if (response.status === 200) {
        const tokenData = {
          email: response.data.email,
          token: response.data.idToken,
          expiresIn: response.data.expiresIn,
          refreshToken: response.data.refreshToken,
          userId: response.data.lccalId,
        };
        localStorage.setItem('userData', JSON.stringify(tokenData));
        context.commit(SET_USER_TOKEN_DATA_MUTATION, tokenData);
      }
    } catch (error) {
      let errorMessage = SignUpValidation.getErrorMessageFromCode(
        error.response.data.error.errors[0].message
      );
      throw errorMessage;
    } finally {
      context.commit(LOADING_SPINNER_SHOW_MUTATION, false, { root: true });
    }
  },
};
