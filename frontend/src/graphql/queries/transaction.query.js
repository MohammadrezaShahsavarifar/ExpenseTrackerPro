import { gql } from "@apollo/client";

export const GET_TRANSACTION = gql`
  query GetTarnsactions {
    transactions {
      _id
      description
      paymentType
      category
      amount
      location
      date
    }
  }
`;
