import {
  productsQuery,
  productsQueryVariables,
} from '../graphql/products-query';
import { removeProduct } from '../graphql/remove-mutation';
import { createProduct } from '../graphql/create-product';
import { updateProduct } from '../graphql/update-product';
import { lowStockProductsQuery } from '../graphql/low-stock-query';
import { mostPopular } from '../graphql/most-popular';
import { RenderPageOptions } from 'graphql-playground-html';

export const playgroundConfig: RenderPageOptions = {
  settings: {
    'editor.theme': 'dark',
  },
  tabs: [
    {
      endpoint: '/graphql',
      query: '',
    },
    {
      endpoint: '/graphql',
      query: productsQuery,
      name: 'products',
      variables: productsQueryVariables,
    },
    {
      endpoint: '/graphql',
      query: createProduct,
      name: 'create-product',
    },
    {
      endpoint: '/graphql',
      query: updateProduct,
      name: 'update-product',
    },
    {
      endpoint: '/graphql',
      query: removeProduct,
      name: 'remove-product',
    },
    {
      endpoint: '/graphql',
      query: lowStockProductsQuery,
      name: 'low-stock-products',
    },
    {
      endpoint: '/graphql',
      query: mostPopular,
      name: 'most-popular-products',
    },
  ],
};
