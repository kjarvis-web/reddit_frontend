import { createSlice } from '@reduxjs/toolkit';
import threadService from '../services/threads';

const querySlice = createSlice({
  name: 'query',
  initialState: { key: '', posts: [], results: [] },
  reducers: {
    setQuery(state, action) {
      return { ...state, key: action.payload };
    },
    resetQuery(state) {
      return { ...state, key: '' };
    },
    setSearch(state, action) {
      return { ...state, posts: action.payload };
    },
    setResults(state, action) {
      return { ...state, results: action.payload };
    },
  },
});

export const { setQuery, resetQuery, setSearch, setResults } = querySlice.actions;
export const getAll = () => {
  return async (dispatch) => {
    const threads = await threadService.getAll();
    dispatch(setSearch(threads));
  };
};
export default querySlice.reducer;
