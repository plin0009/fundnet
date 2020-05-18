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

      location {
        coords
        name
      }
      availability {
        sun {
          morning
          afternoon
          evening
        }
        mon {
          morning
          afternoon
          evening
        }
        tue {
          morning
          afternoon
          evening
        }
        wed {
          morning
          afternoon
          evening
        }
        thu {
          morning
          afternoon
          evening
        }
        fri {
          morning
          afternoon
          evening
        }
        sat {
          morning
          afternoon
          evening
        }
        sun {
          morning
          afternoon
          evening
        }
      }
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
      postings {
        _id
        title
        description
        website
        filters {
          geofence {
            coords
            distance
          }
          availabilities {
            sun {
              morning
              afternoon
              evening
            }
            mon {
              morning
              afternoon
              evening
            }
            tue {
              morning
              afternoon
              evening
            }
            wed {
              morning
              afternoon
              evening
            }
            thu {
              morning
              afternoon
              evening
            }
            fri {
              morning
              afternoon
              evening
            }
            sat {
              morning
              afternoon
              evening
            }
          }
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

      location {
        coords
        name
      }
      availability {
        sun {
          morning
          afternoon
          evening
        }
        mon {
          morning
          afternoon
          evening
        }
        tue {
          morning
          afternoon
          evening
        }
        wed {
          morning
          afternoon
          evening
        }
        thu {
          morning
          afternoon
          evening
        }
        fri {
          morning
          afternoon
          evening
        }
        sat {
          morning
          afternoon
          evening
        }
      }
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

export const REMOVE_BULLETIN = gql`
  mutation RemoveBulletin($id: ID!) {
    removeBulletin(id: $id) {
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

export const GET_FORWARD_GEOCODE = gql`
  query ForwardGeocode($input: String!) {
    forwardGeocode(input: $input) {
      coords
      name
    }
  }
`;

export const CHANGE_POSTING = gql`
  mutation ChangePosting($id: ID!, $changes: String!) {
    changePosting(id: $id, changes: $changes) {
      _id
    }
  }
`;

export const REMOVE_POSTING = gql`
  mutation RemovePosting($id: ID!) {
    removePosting(id: $id) {
      _id
    }
  }
`;
export const ADD_POSTING = gql`
  mutation AddPosting(
    $title: String!
    $description: String
    $website: String
    $filters: String!
  ) {
    addPosting(
      title: $title
      description: $description
      website: $website
      filters: $filters
    ) {
      title
    }
  }
`;
export const GET_POSTINGS = gql`
  {
    postings {
      _id
      title
      description
      website
      creator {
        name
      }
      filters {
        geofence {
          coords
          distance
        }
        availabilities {
          sun {
            morning
            afternoon
            evening
          }
          mon {
            morning
            afternoon
            evening
          }
          tue {
            morning
            afternoon
            evening
          }
          wed {
            morning
            afternoon
            evening
          }
          thu {
            morning
            afternoon
            evening
          }
          fri {
            morning
            afternoon
            evening
          }
          sat {
            morning
            afternoon
            evening
          }
        }
      }
    }
  }
`;
