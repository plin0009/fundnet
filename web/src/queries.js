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
      pregnant
      parent
      physicalCondition
      mentalCondition

      employmentHours
      employmentStatus
      income
    }
  }
`;

export const CHANGE_ME = gql`
  mutation ChangeMe($changes: String!) {
    changeMe(changes: $changes) {
      handle

      minAge
      maxAge
      homeOwner
      autoOwner
      student
      veteran
      pregnant
      parent
      physicalCondition
      mentalCondition

      employmentHours
      employmentStatus
      income
    }
  }
`;
