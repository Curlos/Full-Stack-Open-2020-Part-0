import { NewPatient, Gender, Entry } from '../types';

const isString = (text: any): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseName = (name: any): string => {
  if (!name || !isString(name)) {
      throw new Error('Incorrect or missing name: ' + name);
  }
  return name;
};

const isGender = (param: any): param is Gender => {
  return Object.values(Gender).includes(param);
};

const parseGender = (gender: any): Gender => {
  if (!gender || !isGender(gender)) {
      throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

const parseOccupation = (occupation: any): string => {
  if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing name: ' + occupation);
  }
  return occupation;
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
const toNewPatient = (object: { name: any; dateOfBirth: any; ssn: any; gender: any; occupation: any; }): NewPatient => {
  return {
    name: parseName(object.name),
    dateOfBirth: parseDate(object.dateOfBirth),
    ssn: object.ssn,
    gender: parseGender(object.gender),
    occupation: parseOccupation(object.occupation),
    entries: <Entry[]>[]
  };
}

export default toNewPatient;