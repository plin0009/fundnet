import gql from "graphql-tag";

export const SIGNUP = gql`
  mutation Signup($handle: String!, $pass: String!) {
    signup(handle: $handle, pass: $pass) {
      token
    }
  }
`;
export const LOGIN = gql`
  mutation Login($handle: String!, $pass: String!) {
    login(handle: $handle, pass: $pass) {
      token
    }
  }
`;

export const GET_ME = gql`
  {
    me {
      handle

      minAge
      maxAge
      homeOwner
      autoOwner
      student
      veteran
      specialNeeds
      physicalCondition
      mentalCondition

      employmentHours
      employmentStatus
      income
    }
  }
`;
