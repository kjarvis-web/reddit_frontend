import { createSlice } from '@reduxjs/toolkit';
import threadService from '../services/threads';
const pageSlice = createSlice({
  name: 'page',
  initialState: { number: 0, total: 0 },
  reducers: {
    nextPage(state) {
      return { ...state, number: state.number + 1 };
    },
    previousPage(state) {
      return { ...state, number: state.number - 1 };
    },
    setTotal(state, action) {
      return { ...state, total: action.payload };
    },
  },
});

export const { nextPage, previousPage, setTotal } = pageSlice.actions;

export const next = () => {
  return nextPage();
};

export const previous = () => {
  return previousPage();
};

export const totalPages = () => {
  return async (dispatch) => {
    const { total } = await threadService.getTotalPages();

    dispatch(setTotal(total));
  };
};

export default pageSlice.reducer;
