import Transaction from "../models/transaction.model.js";

const transactionResolver = {
  Query: {
    transactions: async (_, _, contex) => {
      try {
        if (!contex.getUsrizeder()) {
          throw new Error("Unatho");
        }
        const userId = await contex.getUser()._id;

        const transaction = await Transaction.find({ userId });
        return transaction;
      } catch (err) {
        console.error("Error getting transaction :", err);
        throw new Error("Error Getting transaction");
      }
    },
    transaction: async (_, { transactionID }) => {
      try {
        const transaction = await Transaction.findById({ transactionID });
        return transaction;
      } catch (err) {
        console.error("Error getting transaction");
        throw new Error("Error Getting one transaction");
      }
    },
  },
  Mutation: {
    createTransaction: async (_, { input }, context) => {
      try {
        const newTransaction = new Transaction({
          ...input,
          userId: context.getUser()._id,
        });
        await newTransaction.save();
        return newTransaction;
      } catch (err) {
        console.error("Error creating transaction");
        throw new Error("Error creating one transaction");
      }
    },
    updateTransaction: async (_, { input }) => {
      try {
        const updatedTransaction = await Transaction.findByIdAndUpdate(
          input.transactionId,
          input,
          { new: true }
        );
        return updatedTransaction;
      } catch (err) {
        console.error("Error Updating transaction");
        throw new Error("Error Updating one transaction");
      }
    },
    deleteTransaction: async (_, { transactionId }) => {
      try {
        const deleteTransaction = await Transaction.findByIdAndDelete(
          transactionId
        );
        return deleteTransaction;
      } catch (err) {
        console.error("Error Deleting transaction");
        throw new Error("Error Deleting one transaction");
      }
    },
  },
};

export default transactionResolver;
