import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

import { connectDb } from "./db/connectDb.js";

dotenv.config({ path: "./config.env" });
const app = express();
const httpServer = http.createServer(app);

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

const port = process.env.PORT || 4000;
app.use(
  "/",
  cors(),
  express.json(),

  expressMiddleware(server, {
    context: async ({ req }) => ({ req }),
  })
);
await new Promise((resolver) => httpServer.listen({ port }, resolver));
await connectDb();

console.log(`your server run op port: ${port}`);
