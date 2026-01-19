import { gql } from "apollo-server";

export const typeDefs = gql`
  type Sale {
    id: ID!
    category: String!
    brand: String!
    quantity: Int!
    price: Float!
    amount: Float!
    month: String!
  }

  type Query {
    sales(category: String, brand: String, month: String): [Sale]
    totalSalesByCategory(category: String!): Float
  }

  type Mutation {
    addSale(
      category: String!, 
      brand: String!, 
      quantity: Int!, 
      price: Float!,
      month: String!
    ): Sale
  }
`;