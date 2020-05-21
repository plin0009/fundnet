import gql from 'graphql-tag';

export interface AuthVars {
  handle: string;
  pass: string;
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

enum Attribute {
  unspecified = 'UNSPECIFIED',
  yes = 'YES',
  no = 'NO',
}
enum EmploymentHours {
  unspecified = 'UNSPECIFIED',
  fullTime = 'FULL_TIME',
  partTime = 'PART_TIME',
  other = 'OTHER',
}
enum EmploymentStatus {
  unspecified = 'UNSPECIFIED',
  employee = 'EMPLOYEE',
  worker = 'WORKER',
  selfEmployed = 'SELF_EMPLOYED',
  unemployed = 'UNEMPLOYED',
  other = 'OTHER',
}

interface TimesOfDay {
  morning: Attribute;
  afternoon: Attribute;
  evening: Attribute;
}

interface Location {
  coords: [number];
  name: string;
}
interface Availability {
  sun: TimesOfDay;
  mon: TimesOfDay;
  tue: TimesOfDay;
  wed: TimesOfDay;
  thu: TimesOfDay;
  fri: TimesOfDay;
  sat: TimesOfDay;
}
export interface MeData {
  handle: string;
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

  location: Location;
  availability: Availability;
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
