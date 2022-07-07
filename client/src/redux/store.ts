import { configureStore } from '@reduxjs/toolkit';
import comments from './componentReducers/comments';

export default configureStore({
  reducer: {
    comments
  }
}); 