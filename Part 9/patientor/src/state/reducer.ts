import { State } from "./state";
import { Patient, SET_PATIENT_LIST, ADD_PATIENT, ADD_ENTRY, PatientActionTypes, Diagnosis, SET_DIAGNOSIS_LIST, SetDiagnosisListAction, NewEntry, AddEntryAction } from "../types";

export type Action =
  | {
      type: "SET_PATIENT_LIST";
      payload: Patient[];
    }
  | {
      type: "ADD_PATIENT";
      payload: Patient;
    }
  | {
      type: "ADD_ENTRY";
      payload: NewEntry;
      patientID: string;
    }
  | {
    type: "SET_DIAGNOSIS_LIST";
    payload: Diagnosis[];
  }

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "SET_PATIENT_LIST":
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case "SET_DIAGNOSIS_LIST":
      return {
        ...state,
        diagnoses: {
          ...action.payload.reduce(
            (info, diagnosis) => ({ ...info, [diagnosis.code]: diagnosis }),
            {}
          ),
          ...state.patients
        }
      }
    case "ADD_PATIENT":
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case "ADD_ENTRY":
      const patientsWithNewEntry = Object.values(state.patients).map(patient => {
        if(patient.id === action.patientID) {
          
          return {...patient, entries: [patient.entries, action.payload], }
        } else {
          return patient;
        }
      })
      return {
        ...state,
        patientsWithNewEntry,
      };
    default:
      return state;
  }
};

export const setPatientList = (patientListFromApi: Patient[]): PatientActionTypes => {
  return { 
    type: SET_PATIENT_LIST, 
    payload: patientListFromApi 
  }
}

export const setDiagnosisList = (diagnosisListFromApi: Diagnosis[]): SetDiagnosisListAction => {
  return { 
    type: SET_DIAGNOSIS_LIST, 
    payload: diagnosisListFromApi 
  }
}

export const addPatient = (newPatient: Patient): PatientActionTypes => {
  return { 
    type: ADD_PATIENT, 
    payload: newPatient 
  }
}

export const addEntry = (newEntry: NewEntry, patientID: string): AddEntryAction => {
  return { 
    type: ADD_ENTRY, 
    payload: newEntry,
    patientID: patientID,
  }
}
