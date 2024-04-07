import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const userSlice = createSlice({
  name: 'users',
  initialState: [],
  reducers: {
    initializeUsers(state, action) {
      return action.payload;
    },
    appendUser(state, action) {
      return [...state, action.payload];
    },
  },
});

export const { initializeUsers, appendUser } = userSlice.actions;

export const getUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers();
    dispatch(initializeUsers(users));
  };
};

export const addUser = (newUser) => {
  return async (dispatch) => {
    const user = await userService.createUser(newUser);
    console.log(user);
    dispatch(appendUser(user));
  };
};

export default userSlice.reducer;
