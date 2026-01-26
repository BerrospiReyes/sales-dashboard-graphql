import { gql } from "apollo-server";

export const typeDefs = gql`
  type Sale {
    id: ID!
    category: String!
    brand: String!
    quantity: Float!
    price: Float!
    amount: Float!
    month: String!
    goalQty: Float!
    goalAmt: Float!
  }

  type Query {
    sales(category: String, brand: String): [Sale]
  }

  type Mutation {
    addSale(
      category: String!, 
      brand: String!, 
      quantity: Float, 
      price: Float, 
      month: String!,
      goalQty: Float,
      goalAmt: Float
    ): Sale
  }
`;