import { configureStore } from '@reduxjs/toolkit';
import { useSelector } from 'react-redux';
import { TypedUseSelectorHook, useDispatch } from 'react-redux';
import { productAPI } from './api/productAPI';
import productSlice from './features/productSlice';

export const store = configureStore({
  reducer: {
    [productAPI.reducerPath]: productAPI.reducer,
    productState: productSlice,
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({}).concat(productAPI.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
