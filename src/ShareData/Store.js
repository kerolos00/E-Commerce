import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from '../ShareData/CategorySlice';
export let Store = configureStore({
  reducer: {
    category: categoryReducer
  }
})