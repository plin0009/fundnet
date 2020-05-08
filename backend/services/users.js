import { gql, ApolloServer } from "apollo-server-express";
import { User, Bulletin } from "../models";
import { buildFederatedSchema } from "@apollo/federation";

import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { secret } from "../config";

const typeDefs = gql`
  extend type Query {
    # users: [User]!
    me: User
    bulletins: [Bulletin!]!
  }
  extend type Mutation {
    signup(handle: String!, pass: String!): AuthPayload
    login(handle: String!, pass: String!): AuthPayload
    changeMe(changes: String!): User
    logout: Boolean
  }
  type AuthPayload {
    token: String
  }
  extend type Bulletin @key(fields: "_id") {
    _id: ID! @external
  }
  type User @key(fields: "_id") {
    _id: ID!
    handle: String!
    pass: String!

    minAge: Int
    maxAge: Int

    homeOwner: Attribute
    autoOwner: Attribute
    student: Attribute
    veteran: Attribute
    pregnant: Attribute
    parent: Attribute
    physicalCondition: Attribute
    mentalCondition: Attribute

    employmentHours: EmploymentHours!
    employmentStatus: EmploymentStatus!
    income: Int

    location: Location
    availability: Availability

    bulletins: [Bulletin!]!
  }
  type Location {
    coords: [Float!]!
    name: String!
  }
  type Availability {
    sun: TimeOfDay
    mon: TimeOfDay
    tue: TimeOfDay
    wed: TimeOfDay
    thu: TimeOfDay
    fri: TimeOfDay
    sat: TimeOfDay
  }
  type TimeOfDay {
    morning: Attribute
    afternoon: Attribute
    evening: Attribute
  }
  enum Attribute {
    UNSPECIFIED
    YES
    NO
  }
  enum EmploymentHours {
    UNSPECIFIED
    FULL_TIME
    PART_TIME
    OTHER
  }
  enum EmploymentStatus {
    UNSPECIFIED
    EMPLOYEE
    WORKER
    SELF_EMPLOYED
    UNEMPLOYED
    OTHER
  }
`;

const resolvers = {
  Query: {
    /* users: async () => {
      return await User.find();
    }, */
    me: async (_, __, { me }) => {
      if (!me.id) {
        return null;
      }
      return await User.findById(me.id);
    },
    bulletins: async (_, __, { me }) => {
      const allBulletins = await Bulletin.find();
      if (!me.id) {
        return allBulletins;
      }
      return allBulletins;
    },
  },
  Mutation: {
    signup: async (_, { handle, pass }) => {
      const hashedPass = await bcrypt.hash(pass, 10);
      // TODO: check if duplicate or illegal handle
      const user = new User({
        handle,
        pass: hashedPass,
        bulletins: [],
      });
      await user.save();
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );
      return {
        token,
      };
    },
    login: async (_, { handle, pass }) => {
      const user = await User.findOne({
        handle,
      });
      if (!user) {
        return { token: null };
      }
      const valid = await bcrypt.compare(pass, user.pass);
      if (!valid) {
        return { token: null };
      }
      const token = jwt.sign(
        {
          id: user._id,
        },
        secret
      );
      return {
        token,
      };
    },
    changeMe: async (_, { changes }, { me }) => {
      if (!me.id) {
        // no
        return null;
      }
      const user = await User.findById(me.id);
      if (!user) {
        // no
        return null;
      }
      console.log(changes);
      const updated = await user.update(JSON.parse(changes));
      console.log(user);
      return user;
    },
    logout: () => true,
  },
  User: {
    __resolveReference: async ({ _id }) => {
      return await User.findById(_id);
    },
  },
};

export const UsersService = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  context: ({ req }) => {
    return {
      me: {
        id: req.header("x-user-id"),
      },
    };
  },
});
