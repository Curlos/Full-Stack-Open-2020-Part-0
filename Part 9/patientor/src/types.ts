
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
  occupation: string;
  gender: Gender;
  ssn?: string;
  dateOfBirth?: string;
}

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
