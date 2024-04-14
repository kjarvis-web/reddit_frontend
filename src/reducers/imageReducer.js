import { createSlice } from '@reduxjs/toolkit';
import imageService from '../services/images';

const imageSlice = createSlice({
  name: 'images',
  initialState: [],
  reducers: {
    initializeImages(state, action) {
      return action.payload;
    },
  },
});

export const { initializeImages } = imageSlice.actions;

export const getImages = () => {
  return async (dispatch) => {
    const images = await imageService.getImages();
    dispatch(initializeImages(images));
  };
};

export default imageSlice.reducer;
