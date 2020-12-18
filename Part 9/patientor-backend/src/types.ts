export type Diagnose = {
  code: string;
  name: string;
  latin?: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface Entry {
}

export interface Patient {
  id: string;
  name: string;
  ssn: string;
  occupation: string;
  gender: string;
  dateOfBirth: string;
  entries: Entry[]
}

export enum Gender {
  Male = "male",
  Female = "female",
  Other = "other",
}

export type PublicPatient = Omit<Patient, 'ssn' | 'entries' >

export type NonLatinDiagnose = Omit<Diagnose, 'latin'>;

export type NewPatient = Omit<Patient, 'id'>;