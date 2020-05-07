import { gql, ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { positionStackAccessKey } from "../config";

const typeDefs = gql`
  extend type Query {
    forwardGeocode(input: String!): [Location!]!
  }
  type Location {
    coords: [Int!]!
    name: String!
  }
  type Posting @key(fields: "_id") {
    _id: ID!
    title: String!
    description: String
    website: String
    filters: PostingFilters!
  }
  type PostingFilters {
    geofence: Geofence
    availabilities: [Availability!]!
  }
  type Geofence {
    coords: [Int!]!
    distance: Int!
  }
  type Availability {
    sun: [TimeOfDay!]
    mon: [TimeOfDay!]
    tue: [TimeOfDay!]
    wed: [TimeOfDay!]
    thu: [TimeOfDay!]
    fri: [TimeOfDay!]
    sat: [TimeOfDay!]
  }
  enum TimeOfDay {
    MORNING
    AFTERNOON
    EVENING
  }
`;
const resolvers = {
  Query: {
    forwardGeocode: async (_, { input }) => {
      // add filtering by country / region
      const response = await fetch(
        `http://api.positionstack.com/v1/forward?access_key=${positionStackAccessKey}&query=${input}`
      );
      const { data } = await response.json();
      if (data && data.results) {
        return data.results.map((result) => ({
          coords: [result.latitude, result.longitude],
          name,
        }));
      }
      return [];
    },
  },
};

export const PostingsService = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});
