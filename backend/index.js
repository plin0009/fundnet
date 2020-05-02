import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { ApolloServer } from "apollo-server-express";
import { ApolloGateway, RemoteGraphQLDataSource } from "@apollo/gateway";

import { serviceList, applyMiddlewareToServices } from "./services";
import { connectionURI, secret } from "./config";

import jwt from "jsonwebtoken";
import cookieParser from "cookie-parser";

const app = express();
const port = 8000;
const clientPort = 3000;
class CookieDataSource extends RemoteGraphQLDataSource {
  willSendRequest({ request, context }) {
    if (context.user) {
      request.http.headers.set("x-user-id", context.user.id);
    }
  }
  didReceiveResponse({ response, context }) {
    let token = null;
    if (response.data) {
      if (response.data.signup) {
        if (response.data.signup.token) {
          token = response.data.signup.token;
          response.data.signup.token = "Set as cookie";
        }
      } else if (response.data.login) {
        if (response.data.login.token) {
          token = response.data.login.cookie;
          response.data.login.token = "Set as cookie";
        }
      }
    }
    if (token) {
      context.res.cookie("user-jwt", token, {
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 2,
      });
    }
    return response;
  }
}

(async () => {
  await mongoose.connect(connectionURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log(`Connected to mongoose`);
  const gateway = new ApolloGateway({
    serviceList: serviceList(port),
    buildService: ({ url }) => new CookieDataSource({ url }),
  });
  const server = new ApolloServer({
    gateway,
    subscriptions: false,
    context: ({ req, res }) => {
      let user = null;
      if (req.cookies && req.cookies["user-jwt"]) {
        user = jwt.verify(req.cookies["user-jwt"], secret);
      }
      return { res, user };
    },
  });
  app.use(
    cors({
      origin: `http://localhost:${clientPort}`,
      credentials: true,
    })
  );
  app.use(cookieParser());
  applyMiddlewareToServices(app);
  server.applyMiddleware({ app, cors: false, path: "/" });
  app.listen(port, () => {
    console.log(`Server running on port ${port}`);
  });
})();
