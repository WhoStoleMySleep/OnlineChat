import { configureStore } from '@reduxjs/toolkit';
import author from './componentReducers/login';
import messages from './componentReducers/messages';
import unreadMessages from './componentReducers/unreadMessages';

export default configureStore({
  reducer: {
    messages,
    author,
    unreadMessages
  }
}); 