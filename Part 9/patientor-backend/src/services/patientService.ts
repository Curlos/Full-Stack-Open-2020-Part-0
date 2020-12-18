import patients from '../../data/patients';
import { PublicPatient, Patient, NewPatient } from '../types';


const getPatients = (): Array<Patient> => {
  return patients;
}

const getPublicPatients = (): PublicPatient[] => {
  return patients.map(({ id, name, occupation, gender, dateOfBirth}) => ({
    id, 
    name, 
    occupation, 
    gender, 
    dateOfBirth
  }));
};

const findById = (id: string): Patient | undefined => {
  const patient = patients.find(patient => patient.id === id);
  return patient;
}

const addPatient = ( patient: NewPatient ): Patient => {
  const newPatient = {
    id: String(Math.max(...patients.map(p => Number(p.id))) + 1), 
    ...patient
  };

  patients.push(newPatient);
  return newPatient;
};

export default {
  getPatients,
  findById,
  addPatient,
  getPublicPatients
};