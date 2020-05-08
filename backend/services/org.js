import { gql, ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { Org, Bulletin } from "../models";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret } from "../config";

const typeDefs = gql`
  extend type Query {
    orgMe: Org
  }
  extend type Mutation {
    orgSignup(handle: String!, name: String!, pass: String!): AuthPayload
    orgLogin(handle: String!, pass: String!): AuthPayload

    addBulletin(
      title: String!
      description: String
      website: String
      filters: String
    ): Bulletin
    changeBulletin(id: ID!, changes: String!): Bulletin
    removeBulletin(id: ID!): Bulletin

    addPosting(
      title: String!
      description: String
      website: String
      filters: String
    ): Posting
    changePosting(id: ID!, changes: String!): Posting
    removePosting(id: ID!): Posting
  }
  type AuthPayload {
    token: String
  }
  extend type Bulletin @key(fields: "_id") {
    _id: ID! @external
  }
  extend type Posting @key(fields: "_id") {
    _id: ID! @external
  }
  type Org @key(fields: "_id") {
    _id: ID!
    handle: String!
    pass: String!
    name: String
    website: String
    bulletins: [Bulletin!]!
    postings: [Posting!]!
  }
`;
const resolvers = {
  Query: {
    orgMe: async (_, __, { me }) => {
      if (!me.id) {
        return null;
      }
      return await Org.findById(me.id);
    },
  },
  Mutation: {
    orgSignup: async (_, { handle, name, pass }) => {
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
    orgLogin: async (_, { handle, pass }) => {
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
    addBulletin: async (
      _,
      { title, description, website, filters },
      { me }
    ) => {
      if (!me.id) {
        return null;
      }
      console.log(title, description, website, filters);
      const bulletin = new Bulletin({
        creator: me.id,
        title,
        description,
        website,
        filters: JSON.parse(filters),
      });
      const org = await Org.findById(me.id);
      org.bulletins.push({ _id: bulletin._id });
      await org.save();
      return await bulletin.save();
    },
    changeBulletin: async (_, { id, changes }, { me }) => {
      if (!me.id) {
        return null;
      }
      console.log(id, changes);
      const bulletin = await Bulletin.findById(id);
      if (!bulletin) {
        return null;
      }
      if (bulletin.creator._id.toString() !== me.id) {
        console.log(`${bulletin.creator._id.toString()} !== ${me.id}`);
        return null;
      }
      await bulletin.update({
        ...JSON.parse(changes),
      });
      return bulletin;
    },
    removeBulletin: async (_, { id }, { me }) => {
      if (!me.id) {
        return null;
      }
      const bulletin = await Bulletin.findById(id);
      if (!bulletin) {
        return null;
      }
      if (bulletin.creator._id.toString() !== me.id) {
        console.log(`${bulletin.creator._id.toString()} !== ${me.id}`);
        return null;
      }
      const org = await Org.findById(me.id);
      console.log(org.bulletins.splice(org.bulletins.indexOf(id), 1));
      await org.save();
      return await bulletin.remove();
    },
    addPosting: async () => {},
    changePosting: async () => {},
    removePosting: async () => {},
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
