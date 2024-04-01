import { createSlice } from '@reduxjs/toolkit';
import threadService from '../services/threads';

const initialState = {
  threads: [],
  loading: false,
  comments: [],
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
      const findThread = state.threads.find((t) => t.id === action.payload.parentId);
      const newThread = { ...findThread, comments: [...findThread.comments, action.payload] };
      const newThreads = state.threads.filter((t) => t.id !== action.payload.parentId);
      return { ...state, threads: [...newThreads, newThread] };
    },
    initializeComments(state, action) {
      return { ...state, comments: action.payload };
    },
    appendReply(state, action) {
      return { ...state, comments: [...state.comments, action.payload] };
    },
    appendLikes(state, action) {
      const findThread = state.threads.find((t) => t.id === action.payload.id);
      const newThread = { ...findThread, likes: action.payload.likes };
      const newThreads = state.threads.filter((t) => t.id !== action.payload.id);
      return { ...state, threads: [...newThreads, newThread] };
    },
  },
});

export const {
  appendThread,
  initializeThreads,
  initializeComments,
  setLoading,
  appendComment,
  replyToComment,
  initializeThread,
  appendReply,
  appendLikes,
} = threadSlice.actions;

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

export const getComments = () => {
  return async (dispatch) => {
    const comments = await threadService.getComments();
    dispatch(initializeComments(comments));
  };
};

export const addComment = (id, comment) => {
  return async (dispatch) => {
    const newComment = await threadService.addComment(id, comment);
    console.log('addcomment', newComment);
    dispatch(appendComment(newComment));
  };
};

export const addReply = (id, comment) => {
  return async (dispatch) => {
    const newReply = await threadService.addReply(id, comment);
    console.log('reply', newReply);
    dispatch(appendReply(newReply));
  };
};

export const updateLikes = (newObj) => {
  return async (dispatch) => {
    const newPost = await threadService.update(newObj);
    console.log(newPost);
    dispatch(appendLikes(newPost));
  };
};

export default threadSlice.reducer;
