
export interface Diagnosis {
  code: string;
  name: string;
  latin?: string;
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other"
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[]
}
export interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<Diagnosis['code']>;
}

export type Discharge = {
  date: string;
  criteria: string;
}

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type SickLeave = {
  startDate: string;
  endDate: string;
}

export interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string;
  sickLeave: SickLeave;
}

export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

export interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

export type Entry = 
  | HospitalEntry 
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export const SET_PATIENT_LIST = 'SET_PATIENT_LIST'
export const ADD_PATIENT = 'ADD_PATIENT'

interface SetPatientListAction {
  type: typeof SET_PATIENT_LIST
  payload: Patient[]
}

interface AddPatientAction {
  type: typeof ADD_PATIENT
  payload: Patient
}

export type PatientActionTypes = SetPatientListAction | AddPatientAction
