import {
  GET_USER_TOKEN_GETTER,
  IS_USER_AUTHENTICATED_GETTER,
} from '@/store/storeconstant';
export default {
  [GET_USER_TOKEN_GETTER]: (state) => state.token,
  [IS_USER_AUTHENTICATED_GETTER]: (state) => !!state.token,
};
