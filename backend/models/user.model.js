import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: [true, "user must have username"],
      unique: [true, "this user name pick bye another user try another One"],
    },
    name: {
      type: String,
      required: [true, "user must have a name"],
    },
    password: {
      type: String,
      required: [true, "user must have password"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    gender: {
      type: String,
      required: [true, "user must have gender"],
      enum: ["male", "female"],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);

export default User;
