import { gql } from "@apollo/client";

export const GET_AUTHENTICATED_USER = gql`
  query GetAuthenticatedUser {
    authUser {
      _id
      username
      name
      profilePicture
    }
  }
`;

export const GET_USER_AND_TRANSACTIONS = gql`
  query GetUseAndTransactions($userId: ID!) {
    user(userId: $userId) {
      _id
      name
      username
      profilePicture
      # relationships
      transactions {
        _id
        description
        amount
        paymentType
        category
        location
        date
      }
    }
  }
`;
