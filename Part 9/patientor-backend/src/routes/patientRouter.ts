import express from 'express';
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getNoSsnPatients());
})

router.post('/', (_req, res) => {
  const { name, dateOfBirth, gender, occupation } = _req.body;
  const newPatient = patientService.addPatient({
    name, 
    dateOfBirth,
    gender,
    occupation
  });
  res.json(newPatient);
})

export default router;