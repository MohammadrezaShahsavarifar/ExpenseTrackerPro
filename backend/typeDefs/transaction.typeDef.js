const transactionTypeDef = `#graphql
type Trancaction {
_id:ID!
userId:ID!
description : String!
paymentType:String!
category: String!
amount : Float!
location : String
date : String!
}

type Query {
transactions : [Trancaction!]
transaction(transactionId:ID!): Trancaction

}
type Mutation {
    createTransaction(input : CreateTransactionInput!) : Trancaction!
    updateTransaction(input : UpdateTransactionInput!) : Trancaction!
    deleteTransaction(transactionId:ID!) : Trancaction!
}

input CreateTransactionInput {
    description : String!
    paymentType: String!
    category: String!
    amount : Float!
    date: String!
    location : String
}
input UpdateTransactionInput {
    transactionId :ID!
    description : String
    paymentType: String
    category: String
    amount : Float
    date: String
    location : String
}
`;

export default transactionTypeDef;
