export type RootStackParamList = {
  Me: undefined;
  Bulletins: undefined;
};

export type MeStackParamList = {
  Me: undefined;
  Signup: undefined;
  Login: undefined;
};

export type BulletinsStackParamList = {
  Bulletins: undefined;
};

export enum AttributeList {
  homeOwner = 'home owner',
  autoOwner = 'auto owner',
  student = 'student',
  veteran = 'veteran',
  pregnant = 'pregnant',
  parent = 'parent',
  physicalCondition = 'physical condition',
  mentalCondition = 'mental condition',
}

export enum Attribute {
  unspecified = 'UNSPECIFIED',
  yes = 'YES',
  no = 'NO',
}
export enum EmploymentHours {
  unspecified = 'UNSPECIFIED',
  fullTime = 'FULL_TIME',
  partTime = 'PART_TIME',
  other = 'OTHER',
}
export enum EmploymentStatus {
  unspecified = 'UNSPECIFIED',
  employee = 'EMPLOYEE',
  worker = 'WORKER',
  selfEmployed = 'SELF_EMPLOYED',
  unemployed = 'UNEMPLOYED',
  other = 'OTHER',
}

export interface TimesOfDay {
  morning: Attribute;
  afternoon: Attribute;
  evening: Attribute;
}

export interface Location {
  coords: [number];
  name: string;
}
export interface Availability {
  sun: TimesOfDay;
  mon: TimesOfDay;
  tue: TimesOfDay;
  wed: TimesOfDay;
  thu: TimesOfDay;
  fri: TimesOfDay;
  sat: TimesOfDay;
}
