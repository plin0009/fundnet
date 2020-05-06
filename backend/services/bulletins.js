import { gql, ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { Bulletin, Org } from "../models";

const typeDefs = gql`
  extend type User @key(fields: "_id") {
    _id: ID! @external
  }
  extend type Org @key(fields: "_id") {
    _id: ID! @external
  }
  # union Creator = User | Org
  type Bulletin @key(fields: "_id") {
    _id: ID!
    title: String!
    creator: Org #Creator!
    description: String
    website: String
    filters: Filters!
  }
  type Filters {
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

    employmentHours: [EmploymentHours!]!
    employmentStatus: [EmploymentStatus!]!
    minIncome: Int
    maxIncome: Int
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
  Query: {},
  Mutation: {},
  Bulletin: {
    __resolveReference: async ({ _id }) => {
      return await Bulletin.findById(_id);
    },
    creator: async ({ creator }) => {
      const org = await Org.findById(creator._id);
      if (org) return org;
    },
  },
};

export const BulletinsService = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
  /* context: ({ req }) => {
    return {
      me: {
        id: req.header("x-user-id"),
      },
    };
  }, */
});
