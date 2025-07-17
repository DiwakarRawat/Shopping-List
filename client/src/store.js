import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './reducers'; // Make sure this exists and exports combined reducers

const store = configureStore({
  reducer: rootReducer, // Must be a valid reducer function or object
});

export default store;
