import diagnoses from '../../data/diagnoses';
import { NonLatinDiagnose, Diagnose } from '../types';


const getDiagnoses = (): Array<Diagnose> => {
  return diagnoses;
}

const getNonLatinDiagnoses = (): NonLatinDiagnose[] => {
  return diagnoses.map(({ code, name}) => ({
    code,
    name,
  }));
};

const addDiagnose = () => {
  return null;
};

export default {
  getDiagnoses,
  addDiagnose,
  getNonLatinDiagnoses
};