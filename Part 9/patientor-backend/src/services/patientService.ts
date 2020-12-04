import patients from '../../data/patients';
import { noSsnPatients, Patient } from '../types';


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

const addPatient = () => {
  return null;
};

export default {
  getPatients,
  addPatient,
  getNoSsnPatients
};