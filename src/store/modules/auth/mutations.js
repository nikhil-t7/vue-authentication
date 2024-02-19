import { SET_USER_TOKEN_DATA_MUTATION } from '@/store/storeconstant';
export default {
  [SET_USER_TOKEN_DATA_MUTATION](state, payload) {
    state.email = payload.email;
    state.token = payload.token;
    state.expiresIn = payload.expiresIn;
    state.userId = payload.userId;
    state.refreshToken = payload.refreshToken;
  },
};
