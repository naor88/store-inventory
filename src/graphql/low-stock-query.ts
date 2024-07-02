export const lowStockProductsQuery = `
query {
  findLowStock(threshold: 2) {
    ...ProductFields
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
