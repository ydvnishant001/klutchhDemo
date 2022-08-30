import { configureStore } from '@reduxjs/toolkit';
import shiftReducers from '../reducers/shiftReducers';

const store = configureStore({
    reducer: {
    shiftReducers: shiftReducers,
  }
});

export default store;
