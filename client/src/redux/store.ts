import { configureStore } from '@reduxjs/toolkit';
import author from './componentReducers/login';
import messages from './componentReducers/messages';

export default configureStore({
  reducer: {
    messages,
    author
  }
}); 