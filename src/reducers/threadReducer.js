import { createSlice } from '@reduxjs/toolkit';
import threadService from '../services/threads';

const initialState = {
  threads: [],
  loading: false,
};

//toolkit
const threadSlice = createSlice({
  name: 'threads',
  initialState,
  reducers: {
    appendThread(state, action) {
      return { ...state, threads: [...state.threads, action.payload] };
    },
    initializeThreads(state, action) {
      return { ...state, threads: action.payload };
    },
  },
});

export const { appendThread, initializeThreads } = threadSlice.actions;

export const createThread = (object) => {
  return async (dispatch) => {
    const newThread = await threadService.create(object);
    dispatch(appendThread(newThread));
  };
};

export const getThreads = () => {
  return async (dispatch) => {
    const threads = await threadService.getAll();
    dispatch(initializeThreads(threads));
  };
};

export default threadSlice.reducer;
