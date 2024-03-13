import express from "express";
import patientService from '../services/patientService';
import toNewPatient from "../utils";
import { NewPatient, Patient } from "../types";

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.post('/', (req, res) => {
  const newPatient: NewPatient = toNewPatient(req.body)
  const addedPatient: Patient = patientService.addPatient(newPatient);
  res.json(addedPatient);
});

export default router;