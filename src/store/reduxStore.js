import homeReducer from '../reducer/homeReducer';
import stockReducer from '../reducer/stockReducer';
import {configureStore} from '@reduxjs/toolkit';
export const store = configureStore({
  reducer: {
    home: homeReducer,
    stock: stockReducer,
  },
});
