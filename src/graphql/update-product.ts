export const updateProduct = `
mutation {
  updateProduct(updateProductInput: {
    id: "16a48c25-30cf-4c02-a2c8-05f9f97c06f5",
    name: "updated name!!!",
    sold: 6
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
