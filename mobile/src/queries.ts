import gql from 'graphql-tag';
import {
  Attribute,
  EmploymentHours,
  EmploymentStatus,
  Location,
  Availability,
} from './types';

export interface AuthVars {
  handle: string;
  pass: string;
}
export interface OrgSignupVars extends AuthVars {
  name: string;
}
export interface AuthData {
  token: string;
}
export const SIGNUP = gql`
  mutation signup($handle: String!, $pass: String!) {
    signup(handle: $handle, pass: $pass) {
      token
    }
  }
`;
export const LOGIN = gql`
  mutation login($handle: String!, $pass: String!) {
    login(handle: $handle, pass: $pass) {
      token
    }
  }
`;
export const LOGOUT = gql`
  mutation {
    logout
  }
`;

export const ORG_SIGNUP = gql`
  mutation orgSignup($handle: String!, $name: String!, $pass: String!) {
    orgSignup(handle: $handle, name: $name, pass: $pass) {
      token
    }
  }
`;
export const ORG_LOGIN = gql`
  mutation orgLogin($handle: String!, $pass: String!) {
    orgLogin(handle: $handle, pass: $pass) {
      token
    }
  }
`;

interface BulletinFilterData {
  minAge: number;
  maxAge: number;
  homeOwner: Attribute;
  autoOwner: Attribute;
  student: Attribute;
  veteran: Attribute;
  pregnant: Attribute;
  parent: Attribute;
  physicalCondition: Attribute;
  mentalCondition: Attribute;

  employmentHours: EmploymentHours;
  employmentStatus: EmploymentStatus;
  income: number;
  minIncome: number;
  maxIncome: number;
}

interface PostingFilterData {
  geofence: {
    coords: [number, number];
    distance: number;
  };
  availabilities: Availability[];
}

export interface MeData extends BulletinFilterData {
  handle: string;
  location: Location;
  availability: Availability;
}

export interface OrgMeData {
  handle: string;
  name: string;
  website: string;
  bulletins: BulletinData[];
  postings: PostingData[];
}

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
        creator {
          name
        }
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
        creator {
          name
        }
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
  mutation changeMe($changes: String!) {
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
        sun {
          morning
          afternoon
          evening
        }
      }
    }
  }
`;

export interface ListingData {
  _id: string;
  title: string;
  description: string;
  website: string;
  creator: {
    name: string;
  };
}

export interface BulletinData extends ListingData {
  filters: BulletinFilterData;
}

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

export interface PostingData extends ListingData {
  filters: PostingFilterData;
}
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
