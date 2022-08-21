import { createSlice } from '@reduxjs/toolkit';

export const unreadMessages = createSlice({
  name: 'unreadMessages',
  initialState: {
    unreadMessages: [],
  },
  reducers: {
    setUnreadMessages: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.unreadMessages = action.payload;
    },
  },
});

export const { setUnreadMessages } = unreadMessages.actions;

export default unreadMessages.reducer;
