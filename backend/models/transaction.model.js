import mongoose from "mongoose";

const transactionScema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId must be valid"],
  },
  description: {
    type: String,
    required: true,
  },
  paymentType: {
    type: String,
    enum: ["cash", "card"],
    required: true,
  },
  category: {
    type: String,
    enum: ["saving", "expense", "investment"],
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  location: {
    type: String,
    default: "Unknown",
  },
  date: {
    type: Date,
    required: true,
  },
});

const Transaction = mongoose.model("Transaction", transactionScema);

export default Transaction;
