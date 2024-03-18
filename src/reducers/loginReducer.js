import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import threadService from '../services/threads';

const loginSlice = createSlice({
  name: 'login',
  initialState: null,
  reducers: {
    setUser(state, action) {
      return action.payload;
    },
    logout() {
      return null;
    },
  },
});

export const { setUser, logout } = loginSlice.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    const user = await loginService.login({
      username,
      password,
    });
    threadService.setToken(user.token);
    dispatch(setUser(user));
  };
};

export default loginSlice.reducer;
