import express from 'express';
import patientService from '../services/patientService';
import toNewPatient from '../utils/toNewPatient';

const router = express.Router();

router.get('/', (_req, res) => {
  res.send(patientService.getPublicPatients());
})

router.get('/:id', (_req, res) => {
  const patient = patientService.findById(_req.params.id);

  if(patient) {
    res.send(patient);
  } else {
    res.sendStatus(404);
  }
})

router.post('/', (_req, res) => {
  try {
    const newPatient = toNewPatient(_req.body);

    const addedPatient = patientService.addPatient(newPatient);
    res.json(addedPatient);
  } catch(e) {
    res.status(400).send(e.message);
  }
})

export default router;