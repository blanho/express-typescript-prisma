import { BaseQueryFn, createApi, FetchArgs, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { IProductResponse } from '../../types/Product';

export interface CustomError {
  data: {
    message: string;
    stack: string;
  };
  status: number;
}

export const productAPI = createApi({
  reducerPath: 'productAPI',
  baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' }) as BaseQueryFn<
    string | FetchArgs,
    unknown,
    CustomError,
    {}
  >,
  endpoints: builder => ({
    getProducts: builder.query<IProductResponse[], void>({
      query: () => 'products',
    }),
    getProduct: builder.query<IProductResponse, number>({
      query: id => `products/${id}`,
    }),
  }),
});

export const { useGetProductsQuery, useGetProductQuery } = productAPI;
