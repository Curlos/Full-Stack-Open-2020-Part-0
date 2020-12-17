import patients from '../../data/patients';
import { noSsnPatients, Patient, NewPatient } from '../types';


const getPatients = (): Array<Patient> => {
  return patients;
}

const getNoSsnPatients = (): noSsnPatients[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id, 
    name, 
    dateOfBirth, 
    gender, 
    occupation
  }));
};

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
  addPatient,
  getNoSsnPatients
};