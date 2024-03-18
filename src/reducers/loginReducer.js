import { createSlice } from '@reduxjs/toolkit';
import loginService from '../services/login';
import threadService from '../services/threads';

const loginSlice = createSlice({
  name: 'login',
  initialState: { user: null, loading: false },
  reducers: {
    setUser(state, action) {
      return { ...state, user: action.payload };
    },
    logout() {
      return null;
    },
    setLoading(state, action) {
      return { ...state, loading: action.payload };
    },
  },
});

export const { setUser, logout, setLoading } = loginSlice.actions;

export const loginUser = (username, password) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const user = await loginService.login({
      username,
      password,
    });
    threadService.setToken(user.token);
    dispatch(setUser(user));
    dispatch(setLoading(false));
  };
};

export default loginSlice.reducer;
