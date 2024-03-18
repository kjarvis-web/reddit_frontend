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
    setLoading(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { appendThread, initializeThreads, setLoading } = threadSlice.actions;

export const createThread = (object) => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const newThread = await threadService.create(object);
    dispatch(appendThread(newThread));
    dispatch(setLoading(false));
  };
};

export const getThreads = () => {
  return async (dispatch) => {
    dispatch(setLoading(true));
    const threads = await threadService.getAll();
    dispatch(initializeThreads(threads));
    dispatch(setLoading(false));
  };
};

export default threadSlice.reducer;
