import { gql } from "apollo-server";

export const typeDefs = gql`
  type Sale {
    id: ID!
    category: String!
    brand: String!
    amount: Float!
  }

  type Query {
    sales(category: String, brand: String): [Sale]
    totalSalesByCategory(category: String!): Float
  }

  type Mutation {
    addSale(category: String!, brand: String!, amount: Float!): Sale
  }
`;
