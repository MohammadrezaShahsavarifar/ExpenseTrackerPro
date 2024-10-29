import { mergeTypeDefs } from "@graphql-tools/merge";

// our typeDefs
import userTypeDef from "./user.typeDef.js";
import transactionTypeDef from "./transaction.typeDef.js";

const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef]);

export default mergedTypeDefs;
