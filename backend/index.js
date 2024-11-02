import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";

import passport from "passport";
import session from "express-session";
import connectMongo from "connect-mongodb-session";

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";

import { buildContext } from "graphql-passport";

import mergedResolvers from "./resolvers/index.js";
import mergedTypeDefs from "./typeDefs/index.js";

import { connectDb } from "./db/connectDb.js";
import { configurePassport } from "./passport/passport.config.js";

dotenv.config({ path: "./config.env" });
configurePassport();

const __dirname = path.resolve();
const app = express();

const httpServer = http.createServer(app);

const MongoDBStroe = connectMongo(session);
const store = new MongoDBStroe({
  uri: process.env.MONGO_URI,
  collection: "sessions",
});

store.on("error", (err) => {
  console.log(err);
});

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days for expire cookie
      httpOnly: true, // this prevent (XSS) attack
    },
    store: store,
  })
);

app.use(passport.initialize());
app.use(passport.session());

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();

const port = process.env.PORT || 4000;
app.use(
  "/graphql",
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
  express.json(),

  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  })
);

//render.com +> deploy backend and frontend uder same domain
app.use * express.static(path.join(__dirname, "frontend/dist"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist", "index.html"));
});

await new Promise((resolver) => httpServer.listen({ port }, resolver));
await connectDb();

console.log(`Server Ready at http://localhost:4000/graphql`);
