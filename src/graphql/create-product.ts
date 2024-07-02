export const createProduct = `
mutation {
  createProduct(createProductInput: {
    name: "Naor Test Product",
    description: "Naor Ben David product description :)",
    price: 77.7,
    quantity: 55,
    sold: 22,
    pending_orders: 0
  }) {
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
}
`;
