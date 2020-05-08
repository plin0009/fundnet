import { gql, ApolloServer } from "apollo-server-express";
import { buildFederatedSchema } from "@apollo/federation";
import { radarSecret } from "../config";

const typeDefs = gql`
  # extend type Query {
  #   forwardGeocode(input: String!): [Location!]!
  # }
  type Location {
    coords: [Float!]!
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
    coords: [Float!]!
    distance: Int!
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
`;
const resolvers = {
  Query: {
    /* forwardGeocode: async (_, { input }) => {
      // add filtering by country / region
      console.log(`forward geocoding with ${input}`);
      const response = await fetch(
        `https://api.radar.io/v1/geocode/forward?query=${input}`,
        {
          headers: {
            Authorization: radarSecret,
          },
        }
      );

      console.log(`fetched(?) the data`);
      console.log(response);
      const { addresses } = await response.json();
      console.log(addresses);
      if (addresses) {
        return addresses.results.map((result) => ({
          coords: [result.latitude, result.longitude],
          name: result.formattedAddress,
        }));
      }
      return [];
    }, */
  },
};
export const PostingsService = new ApolloServer({
  schema: buildFederatedSchema([{ typeDefs, resolvers }]),
});
