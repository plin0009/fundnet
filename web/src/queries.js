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
export const ORG_SIGNUP = gql`
  mutation OrgSignup($handle: String!, $name: String!, $pass: String!) {
    orgSignup(handle: $handle, name: $name, pass: $pass) {
      token
    }
  }
`;
export const ORG_LOGIN = gql`
  mutation OrgLogin($handle: String!, $pass: String!) {
    orgLogin(handle: $handle, pass: $pass) {
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

export const GET_ORG_ME = gql`
  {
    orgMe {
      handle
      name
      website
      bulletins {
        _id
        title
        description
        website
        filters {
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
          minIncome
          maxIncome
        }
      }
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

export const CHANGE_BULLETIN = gql`
  mutation ChangeBulletin($id: ID!, $changes: String!) {
    changeBulletin(id: $id, changes: $changes) {
      _id
    }
  }
`;

export const ADD_BULLETIN = gql`
  mutation AddBulletin(
    $title: String!
    $description: String
    $website: String
    $filters: String!
  ) {
    addBulletin(
      title: $title
      description: $description
      website: $website
      filters: $filters
    ) {
      _id
    }
  }
`;

export const GET_BULLETINS = gql`
  {
    bulletins {
      _id
      title
      description
      website
      creator {
        name
      }
      filters {
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
        minIncome
        maxIncome
      }
    }
  }
`;

export const LOGOUT = gql`
  mutation {
    logout
  }
`;
