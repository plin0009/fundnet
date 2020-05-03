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
    if (context.org) {
      request.http.headers.set("x-org-id", context.org.id);
    }
  }
  didReceiveResponse({ response, context }) {
    let token = null;
    let type = null;
    if (response.data) {
      if (response.data.signup) {
        if (response.data.signup.token) {
          type = "user";
          token = response.data.signup.token;
          response.data.signup.token = "Set as cookie";
        }
      } else if (response.data.login) {
        if (response.data.login.token) {
          type = "user";
          token = response.data.login.cookie;
          response.data.login.token = "Set as cookie";
        }
      } else if (response.data.orgSignup) {
        if (response.data.orgSignup.token) {
          type = "org";
          token = response.data.orgSignup.token;
          response.data.orgSignup.token = "Set as cookie";
        }
      } else if (response.data.orgLogin) {
        if (response.data.orgLogin.token) {
          type = "org";
          token = response.data.orgLogin.token;
          response.data.orgLogin.token = "Set as cookie";
        }
      }
    }
    if (token) {
      context.res.cookie(`${type}-jwt`, token, {
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
      let org = null;
      if (req.cookies) {
        if (req.cookies["user-jwt"]) {
          user = jwt.verify(req.cookies["user-jwt"], secret);
        }
        if (req.cookies["org-jwt"]) {
          org = jwt.verify(req.cookies["org-jwt"], secret);
        }
      }
      return { res, user, org };
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
