import { createSlice } from '@reduxjs/toolkit';
import threadService from '../services/threads';

const initialState = {
  threads: [],
  loading: false,
};

// Redux no toolkit
// const threadReducer = (state = initialState, action) => {
//   switch (action.type) {
//     case 'CREATE':
//       return { ...state, threads: [...state.threads, action.payload] };
//     case 'INITIALIZE_THREADS':
//       return { ...state, threads: action.payload };
//     default:
//       return state;
//   }
// };

// const appendThread = (payload) => {
//   return {
//     type: 'CREATE',
//     payload,
//   };
// };

// const initializeThreads = (payload) => {
//   return {
//     type: 'INITIALIZE_THREADS',
//     payload,
//   };
// };

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
