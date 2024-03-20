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
    appendComment(state, action) {
      // const updatedThreads = state.threads.filter((t) => t.id !== action.payload.id);
      // return { ...state, threads: [...updatedThreads, action.payload] };
      const findThread = state.threads.find((t) => t.id === action.payload.originalId);
      const newThread = { ...findThread, comments: [...findThread.comments, action.payload] };
      console.log(newThread);
      const newThreads = state.threads.filter((t) => t.id !== action.payload.originalId);
      return { ...state, threads: [...newThreads, newThread] };
    },
  },
});

export const { appendThread, initializeThreads, setLoading, appendComment } = threadSlice.actions;

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

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const newComment = await threadService.addComment(id, comment);
    console.log('addcomment', newComment);
    dispatch(appendComment(newComment));
  };
};

export default threadSlice.reducer;
