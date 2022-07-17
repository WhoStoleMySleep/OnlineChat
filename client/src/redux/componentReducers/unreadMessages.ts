import { createSlice } from '@reduxjs/toolkit';

export const unreadMessages = createSlice({
  name: 'unreadMessages',
  initialState: {
    unreadMessages: [],
  },
  reducers: {
    setUnreadMessages: (state, action) => {
      state.unreadMessages = action.payload;
    },
  },
});

export const { setUnreadMessages } = unreadMessages.actions;

export default unreadMessages.reducer;
