export const productsQuery = `
  query getPaginatedProducts($paginationInput: PaginationInput, $sortingInput: SortingInput, $filterInput: FilterInput) {
    findPaginatedProducts(paginationInput: $paginationInput, sortingInput: $sortingInput, filterInput: $filterInput) {
      products {
        ...ProductFields
      }
      nextCursor
    }
  }

  fragment ProductFields on Product {
    id
    name
    description
    price
    quantity
    sold
    pending_orders
    created_at
    updated_at
  }
`;

export const productsQueryVariables = JSON.stringify(
  {
    paginationInput: {
      cursor: null,
      limit: 3,
    },
    sortingInput: {
      field: 'created_at',
      order: 'DESC',
    },
    filterInput: {
      query: 'ght',
    },
  },
  null,
  2,
);
