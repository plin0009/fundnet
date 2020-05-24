import { BulletinData } from './queries';

export type RootStackParamList = {
  Bulletins: undefined;
  Postings: undefined;
  Me: undefined;
};

export type MeStackParamList = {
  Me: undefined;
  Signup: undefined;
  Login: undefined;
};

export type BulletinsStackParamList = {
  Bulletins: undefined;
  Bulletin: BulletinData;
};

export type PostingsStackParamList = {
  Postings: undefined;
};

export type Attributes =
  | 'homeOwner'
  | 'autoOwner'
  | 'student'
  | 'veteran'
  | 'pregnant'
  | 'parent'
  | 'physicalCondition'
  | 'mentalCondition';
export const attributes: Record<Attributes, string> = {
  homeOwner: 'home owner',
  autoOwner: 'auto owner',
  student: 'student',
  veteran: 'veteran',
  pregnant: 'pregnant',
  parent: 'parent',
  physicalCondition: 'physical condition',
  mentalCondition: 'mental condition',
};

export enum Attribute {
  unspecified = 'UNSPECIFIED',
  yes = 'YES',
  no = 'NO',
}
export type EmploymentHours =
  | 'UNSPECIFIED'
  | 'FULL_TIME'
  | 'PART_TIME'
  | 'OTHER';
export type EmploymentStatus =
  | 'UNSPECIFIED'
  | 'EMPLOYEE'
  | 'WORKER'
  | 'SELF_EMPLOYED'
  | 'UNEMPLOYED'
  | 'OTHER';
export const employmentHours: Record<EmploymentHours, string> = {
  UNSPECIFIED: 'Unspecified',
  FULL_TIME: 'Full-time',
  PART_TIME: 'Part-time',
  OTHER: 'Other',
};
export const employmentStatus: Record<EmploymentStatus, string> = {
  UNSPECIFIED: 'Unspecified',
  EMPLOYEE: 'Employee',
  WORKER: 'Worker',
  SELF_EMPLOYED: 'Self-employed',
  UNEMPLOYED: 'Unemployed',
  OTHER: 'Other',
};
/*
 *export enum EmploymentHours {
 *  'Unspecified' = 'UNSPECIFIED',
 *  'Full-time' = 'FULL_TIME',
 *  'Part-time' = 'PART_TIME',
 *  'Other' = 'OTHER',
 *}
 *export enum EmploymentStatus {
 *  'Unspecified' = 'UNSPECIFIED',
 *  'Employee' = 'EMPLOYEE',
 *  'Worker' = 'WORKER',
 *  'Self-Employed' = 'SELF_EMPLOYED',
 *  'Unemployed' = 'UNEMPLOYED',
 *  'Other' = 'OTHER',
 *}
 */

export interface TimesOfDay {
  morning: Attribute;
  afternoon: Attribute;
  evening: Attribute;
}

export interface Location {
  coords: [number, number];
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

export type DayOfWeek = 'sun' | 'mon' | 'tue' | 'wed' | 'thu' | 'fri' | 'sat';

export const daysOfWeek: Record<DayOfWeek, string> = {
  sun: 'Sunday',
  mon: 'Monday',
  tue: 'Tuesday',
  wed: 'Wednesday',
  thu: 'Thursday',
  fri: 'Friday',
  sat: 'Saturday',
};
export type TimeOfDay = 'morning' | 'afternoon' | 'evening';
export const timesOfDay: TimeOfDay[] = ['morning', 'afternoon', 'evening'];
