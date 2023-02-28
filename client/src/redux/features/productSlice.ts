import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProductResponse } from '../../types/Product';

interface IProductState {
  product: IProductResponse | null;
}

const initialState: IProductState = {
  product: null,
};

export const productSlice = createSlice({
  initialState,
  name: 'productSlice',
  reducers: {
    productState: (state, action: PayloadAction<IProductResponse>) => {
      state.product = action.payload;
    },
  },
});

export default productSlice.reducer;

export const { productState } = productSlice.actions;
