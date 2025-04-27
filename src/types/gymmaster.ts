// src/types/gymmaster.ts
export interface ClassSchedule {
  id: number;
  name: string;
  classid: number;
  arrival: string;
  dayofweek: string;
  starttime: string;
  endtime: string;
  availability: string;
  resourceid: number;
  location: string;
  staffid: string;
  staffname: string;
  staffphoto: string;
  description: string;
  companyid: number;
  companyname: string;
  max_students: number;
  spacesfree: number;
  bgcolour: string;
  image: string;
  online_instruction: string;
}

export interface Member {
  id: number;
  firstname: string;
  surname: string;
  email: string;
  dob: string;
  gender: "M" | "F" | "O";
  phonecell: string;
  phonehome: string;
  addressstreet: string;
  addresssuburb: string;
  addresscity: string;
  addresscountry: string;
  addressareacode: string;
  receivesms: string;
  receiveemail: string;
  goal: string;
  joindate: string;
  sourcepromotion: string;
  memberphoto: string;
  totalvisits: number;
  totalpts: number;
  totalclasses: number;
  linked_members: LinkedMember[];
}

export interface LinkedMember {
  id: number;
  firstname: string;
  surname: string;
  relationship: string;
}

export interface Membership {
  id: number;
  name: string;
  description: string;
  price: string;
  price_tax: string;
  pricedescription: string;
  signupfee: string;
  signupfee_tax: string;
  signupfee_label: string;
  onlinecash: boolean;
  programme_ref: string;
  programmegroupid: string;
  startdate: string;
  divisionid: number;
  divisionname: string;
  bgcolour: string;
  hide_signupfee: boolean;
  maintenance_fee: string | null;
  maintenance_interval: string | null;
  promotional_period: string;
  promotional_price: string;
  promotion_period_description: string | null;
  freeuntil: string;
  freeuntil_available: boolean;
  promotion_freeuntil_description: string | null;
  show_pricedescription: boolean;
  account_credit: string;
  zero_signupfee: boolean;
  discountdescription: string;
  sortorder: number;
  companyids: number[];
}

export interface Service {
  serviceid: number;
  membershipid: number;
  benefitid: number;
  servicename: string;
  status: string;
  price: string;
}

export interface Room {
  id: number;
  name: string;
}

export interface Equipment {
  id: number;
  name: string;
}

export interface MemberCharge {
  postingid: number;
  occurred: string;
  note: string;
  total: string;
}

export interface Workout {
  id: number;
  name: string;
  workdate: string;
  notes: string;
  type: "weight" | "cardio";
  values: WorkoutExercise[];
}

export interface WorkoutExercise {
  id: number;
  name: string;
  description: string;
  imagelink: string;
  videolink: string;
  intensity: string;
  duration: string;
  reps: number;
  rest: number;
  sets: number;
  tempo: string;
  weight: number;
}

export interface Measurement {
  id: number;
  latest: boolean;
  measured_on: string;
  photos: string[];
  values: MeasurementValue[];
}

export interface MeasurementValue {
  category: string;
  measurementtypeid: number;
  name: string;
  value: number;
  unit: string;
  unitgroup: string;
}

export interface Club {
  id: number;
  name: string;
  billingprovider: string;
}

export interface Promotion {
  id: number;
  name: string;
}

export interface Product {
  productid: number;
  name: string;
  producttype: string;
  price: string;
  image: string;
}

export interface Questionnaire {
  id: number;
  name: string;
  questions: Question[];
}

export interface Question {
  id: number;
  label: string;
  required: boolean;
  type: "heading" | "notes" | "boolean" | "dropdown" | "date" | "text";
  textlength?: number;
  options: QuestionOption[];
  children: Question[];
}

export interface QuestionOption {
  id: number;
  name: string;
}

export interface Agreement {
  id: number;
  name: string;
  body: string;
  points: string[];
}
