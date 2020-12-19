import { NewEntry } from '../types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: any): string => {
  if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};


/* eslint-disable @typescript-eslint/no-explicit-any */
const toNewOccupationalHealthcareEntry = (object: { type: any; date: any; specialist: any; diagnosisCodes: any; description: any; employerName: any; sickLeave?: any;}): NewEntry => {
  return {
    type: object.type,
    date: parseDate(object.date),
    specialist: object.specialist,
    diagnosisCodes: object.diagnosisCodes,
    description: object.description,
    employerName: object.employerName,
    sickLeave: object.sickLeave
  };
}

export default toNewOccupationalHealthcareEntry;