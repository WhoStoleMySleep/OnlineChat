import { createSlice } from '@reduxjs/toolkit';

export const messages = createSlice({
  name: 'messages',
  initialState: {
    messages: []
  },
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    }
  }
});

export const { setMessages } = messages.actions;

export default messages.reducer;