# Store Inventory Management

This project is a home assignment task that implements a store inventory management system using NestJS and GraphQL. The application provides functionality for managing products, including creating, updating, deleting, and querying products with various features like sorting, pagination, filtering and querying.

## Table of Contents

- [Features](#features)
- [Technology Stack](#technology-stack)
- [Development Approach](#development-approach)
- [Setup Instructions](#setup-instructions)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
  - [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [Running Tests](#running-tests)
- [GraphQL Playground](#graphql-playground)
- [Additional Information](#additional-information)
- [Suggestions for Further Improvement](#suggestions-for-further-improvement)
- [Useful Links](#useful-links)

## Features

- **Create New Products**: Allow creating new products with validation to ensure that the name is unique.
- **Update Existing Products**: Enable updating existing products with validation to ensure that the name is unique if you update the name.
- **Delete Products**: Enable deleting existing products, but products with pending orders cannot be deleted.
- **Display List of Products**: Display a list of products with default sorting by creation date. Provide options for sorting and pagination. Allow querying by name or description.
- **Retrieve Products with Low Stock**: Provide functionality to retrieve products with low stock.
- **Retrieve Most Popular Products**: Implement functionality to retrieve the most popular items based on the number of items sold.

## Technology Stack

- **Node.js**
- **NestJS**
- **GraphQL**
- **Apollo Server**
- **TypeScript**
- **Class Validator**
- **Jest** (for testing)

## Development Approach

- **Soft Delete**: Products are not permanently deleted but marked as deleted to maintain historical data integrity and allow for potential recovery. The pagination and query functionalities are designed to filter out these soft-deleted products.
- **Pagination, Sorting and Querying**: Implemented cursor-based pagination and sorting with default values handled in the resolver.

## Setup Instructions

### Prerequisites

Ensure you have the following installed:

- Node.js (>=14.x)
- npm (>=6.x)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/naor88/store-inventory.git
   cd store-inventory
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a `.env` file in the root directory and configure the following environment variables:
   ```env
   NODE_ENV=development
   PORT=3000
   ```

### Running the Application

1. Start the development server:

   ```bash
   npm run start:dev
   ```

2. Navigate to the GraphQL Playground:
   ```
   http://localhost:3000/graphql
   ```

### Running Tests

1. Run all tests:

   ```bash
   npm run test
   ```

2. Run tests with coverage:
   ```bash
   npm run test:cov
   ```

### Tests Included

- **ProductService**: Unit tests for all CRUD operations and specific functionalities like retrieving low stock and most popular products.
- **ProductResolver**: Integration tests for GraphQL queries and mutations.

## GraphQL Playground

- **URL**: Navigate to `http://localhost:3000/graphql` to access the GraphQL Playground.
- **Predefined Queries**:
  - Fetch paginated products:
    ```graphql
    query {
      getPaginatedProducts {
        products {
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
        nextCursor
      }
    }
    ```
  - Create a product:
    ```graphql
    mutation {
      createProduct(
        createProductInput: {
          name: "New Product"
          description: "Description"
          price: 100
          quantity: 50
          sold: 0
          pending_orders: 0
        }
      ) {
        id
        name
        description
      }
    }
    ```
  - Update a product:
    ```graphql
    mutation {
      updateProduct(
        updateProductInput: { id: "product-id", name: "Updated Name" }
      ) {
        id
        name
        description
      }
    }
    ```
  - Delete a product:
    ```graphql
    mutation {
      removeProduct(id: "product-id")
    }
    ```
  - Retrieve low stock products:
    ```graphql
    query {
      lowStockProducts(threshold: 5) {
        id
        name
        quantity
      }
    }
    ```
  - Retrieve most popular products:
    ```graphql
    query {
      mostPopularProducts {
        id
        name
        sold
      }
    }
    ```

## Additional Information

- **Class Validator**: Used for validating input data to ensure data integrity.
- **Soft Delete Approach**: Chosen to keep historical data and manage product states without permanent loss. Soft-deleted products are filtered out in queries and pagination.

## Suggestions for Further Improvement

- **Authentication and Authorization**: Implement user authentication and authorization to secure the API.
- **Database Integration**: Integrate with a database like PostgreSQL or MongoDB for persistent data storage.
- **Performance Optimization**: Caching can be added to improve performance for frequently accessed data
- **CI/CD Pipeline**: Set up continuous integration and deployment pipeline using GitHub Actions or similar tools.
- **Front-End**: Implement a user-friendly, responsive front-end for system interaction using a modern framework (React, Angular, or Vue)
- **Notification System**: Implement a notification system to alert users about low stock or other important events

## Useful Links

- [NestJS Documentation](https://docs.nestjs.com/)
- [GraphQL Documentation](https://graphql.org/learn/)
- [Apollo Server Documentation](https://www.apollographql.com/docs/apollo-server/)
- [TypeScript Documentation](https://www.typescriptlang.org/docs/)

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any features, bugs, or improvements.

## License

This project is licensed under the MIT License
