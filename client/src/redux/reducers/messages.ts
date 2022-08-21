import { createSlice } from '@reduxjs/toolkit';

export const messages = createSlice({
  name: 'messages',
  initialState: {
    messages: [],
  },
  reducers: {
    setMessages: (state, action) => {
      // eslint-disable-next-line no-param-reassign
      state.messages = action.payload;
    },
  },
});

export const { setMessages } = messages.actions;

export default messages.reducer;
