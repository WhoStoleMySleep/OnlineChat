import { configureStore } from '@reduxjs/toolkit';
import author from './reducers/login';
import messages from './reducers/messages';
import unreadMessages from './reducers/unreadMessages';

export default configureStore({
  reducer: {
    messages,
    author,
    unreadMessages
  }
});
