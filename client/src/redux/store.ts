import { configureStore } from '@reduxjs/toolkit';
import messages from './componentReducers/messages';

export default configureStore({
  reducer: {
    messages
  }
}); 