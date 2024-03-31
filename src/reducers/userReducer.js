import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    initializeUsers(state, action) {
      return action.payload;
    },
  },
});

export const { initializeUsers } = userSlice.actions;

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers();
    dispatch(initializeUsers(users));
  };
};

export default userSlice.reducer;
