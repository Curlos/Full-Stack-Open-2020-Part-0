
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

export enum EntryTypes {
  HospitalEntry = "Hospital",
  OccupationalHealthcareEntry = "OccupationalHealthcare",
  HealthCheckEntry = "HealthCheck"
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: Gender;
  dateOfBirth: string;
  entries: Entry[];
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
};

export interface HospitalEntry extends BaseEntry {
  type: "Hospital";
  discharge: Discharge;
}

export type SickLeave = {
  startDate: string;
  endDate: string;
};

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

export type NewEntry = 
  | Omit<HospitalEntry, 'id'> 
  | Omit<OccupationalHealthcareEntry, 'id'>
  | Omit<HealthCheckEntry, 'id'>;
  
export type NewHospitalEntry = Omit<HospitalEntry, 'id'>;

export const SET_PATIENT_LIST = 'SET_PATIENT_LIST';
export const SET_DIAGNOSIS_LIST = 'SET_DIAGNOSIS_LIST';
export const ADD_PATIENT = 'ADD_PATIENT';
export const ADD_ENTRY = 'ADD_ENTRY';

interface SetPatientListAction {
  type: typeof SET_PATIENT_LIST;
  payload: Patient[];
}

interface AddPatientAction {
  type: typeof ADD_PATIENT;
  payload: Patient;
}

export interface AddEntryAction {
  type: typeof ADD_ENTRY;
  payload: NewEntry;
  patientID: string;
}

export interface SetDiagnosisListAction {
  type: typeof SET_DIAGNOSIS_LIST;
  payload: Diagnosis[];
}

export type PatientActionTypes = SetPatientListAction | AddPatientAction;
