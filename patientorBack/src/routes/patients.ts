import express from "express";
import patientService from '../services/patientService';

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const newPatient = req.body
  res.json(patientService.addPatient(newPatient));
});

export default router;