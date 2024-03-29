import { createSlice } from '@reduxjs/toolkit';
import commentService from '../services/comments';

const commentSlice = createSlice({
  name: 'comments',
  initialState: { all: [] },
  reducers: {
    initializeComments(state, action) {
      return { all: [action.payload] };
    },
    appendReply(state, action) {
      return { all: [...state.all, action.payload] };
    },
  },
});

export const { initializeComments, appendReply } = commentSlice.actions;

export const getComments = () => {
  return async (dispatch) => {
    const comments = await commentService.getComments();
    console.log(comments);
    dispatch(initializeComments(comments));
  };
};

export const addReply = (id, comment) => {
  return async (dispatch) => {
    const newReply = await commentService.addReply(id, comment);
    console.log('reply', newReply);
    dispatch(appendReply(newReply));
  };
};

export default commentSlice.reducer;
