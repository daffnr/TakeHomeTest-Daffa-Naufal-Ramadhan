import { configureStore } from '@reduxjs/toolkit';
import authReducer from './authSlice';
import drugsReducer from './drugsSlice';
import cartReducer from './cartSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    drugs: drugsReducer,
    cart: cartReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
