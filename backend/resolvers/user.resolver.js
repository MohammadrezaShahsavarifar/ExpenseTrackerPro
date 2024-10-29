import User from "../models/user.model.js";
import { users } from "../ShiteData/data.js";
import bcrypt from "bcryptjs";

const userResolver = {
  Mutation: {
    signUp: async (_, { input }, context) => {
      try {
        const { username, name, password, gender } = input;
        if (!username || !name || !password || !gender) {
          throw new Error("All fields are require");
        }
        const existingUser = await User.findOne({ username });
        if (existingUser) {
          throw new Error("user already exist");
        }
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
        const boyProfilePic = ` https://avatar.iran.liara.run/public/boy?username={$username}`;
        const girleProfilePic = ` https://avatar.iran.liara.run/public/girl?username={$username}`;

        const newUser = new User({
          username,
          name,
          password: hashedPassword,
          gender,
          profilePicture: gender === "male" ? boyProfilePic : girleProfilePic,
        });
        await newUser.save();
        await context.login(newUser);
        return newUser;
      } catch (err) {
        console.error("Error in signUp :", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    login: async (_, { input }, context) => {
      try {
        const { username, password } = input;
        const { user } = await context.authenticate("graphql-local", {
          username,
          password,
        });

        await context.login(user);
        return user;
      } catch (err) {
        console.error("Error in login :", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    logout: async (_, __, context) => {
      try {
        await context.logout();

        req.session.destroy((err) => {
          if (err) {
            throw err;
          }
        });

        res.clearCookie("connect.sid");

        return { message: "logout Successfully" };
      } catch (err) {
        console.error("Error in logout :", err);
        throw new Error(err.message || "Internal server error");
      }
    },
  },

  Query: {
    authUser: async (_, __, context) => {
      try {
        const user = await context.getUser();
        return user;
      } catch (err) {
        console.error("Error in authUser :", err);
        throw new Error(err.message || "Internal server error");
      }
    },
    user: async (_, { userId }) => {
      try {
        const user = await User.findById(userId);
        return user;
      } catch (err) {
        console.error("Error in user query :", err);
        throw new Error(err.message || "Error Getting User");
      }
    },
  },
};

export default userResolver;
