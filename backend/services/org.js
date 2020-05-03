import { gql, ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { Org } from "../models";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret } from "../config";

const typeDefs = gql`
  extend type Mutation {
    orgSignup(handle: String!, name: String!, pass: String!): AuthPayload
    orgLogin(handle: String!, pass: String!): AuthPayload
  }
  type AuthPayload {
    token: String
  }
  extend type Bulletin @key(fields: "_id") {
    _id: ID! @external
  }
  type Org @key(fields: "_id") {
    _id: ID!
    handle: String!
    pass: String!
    name: String
    website: String
    bulletins: [Bulletin!]!
  }
`;
const resolvers = {
  Mutation: {
    orgSignup: async ({ handle, name, pass }) => {
      const hashedPass = await bcrypt.hash(pass, 10);
      const org = new Org({
        handle,
        name,
        pass: hashedPass,
      });
      await org.save();
      const token = jwt.sign(
        {
          id: org._id,
        },
        secret
      );
      return { token };
    },
    orgLogin: async ({ handle, pass }) => {
      const org = await Org.findOne({ handle });
      if (!org) return { token: null };
      const valid = await bcrypt.compare(pass, org.pass);
      if (!valid) return { token: null };
      const token = jwt.sign(
        {
          id: org._id,
        },
        secret
      );
      return { token };
    },
  },
  Org: {
    __resolveReference: async ({ _id }) => {
      return await Org.findById(_id);
    },
  },
};

export const OrgsService = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: ({ req }) => {
    return {
      me: {
        id: req.header("x-org-id"),
      },
    };
  },
});
