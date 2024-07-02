export const mostPopular = `
query {
  mostPopularProducts(top_x_items: 2) {    
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
