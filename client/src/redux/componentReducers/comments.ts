import { createSlice } from '@reduxjs/toolkit';

export const comments = createSlice({
  name: 'comments',
  initialState: {
    comments: []
  },
  reducers: {
    setComments: (state, action) => {
      state.comments = action.payload;
    }
  }
});

export const { setComments } = comments.actions;

export default comments.reducer;