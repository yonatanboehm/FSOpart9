import express from "express";
import patientService from '../services/patientService';
import { toNewPatient, toNewEntry } from "../utils";
import { Entry, NewPatient, Patient } from "../types";

const router = express.Router();

router.get('/', (_req, res) => {
  res.json(patientService.getNonSensitivePatients());
});

router.get('/:id', (req, res) => {
  const patient = patientService.getOnePatient(req.params.id);
  if (patient) {
    res.json(patient)
  }
  else {
    res.status(404).json({ error: "patient not found" })
  }
});

router.post('/', (req, res) => {
  try {
    const newPatient: NewPatient = toNewPatient(req.body)
    const addedPatient: Patient = patientService.addPatient(newPatient);
    res.status(201).json(addedPatient);
  } catch (error: unknown) {
    let errorMessage: string = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

router.post('/:id/entries', (req, res) => {
  try {
    const newEntry: Entry = toNewEntry(req.body)
    const addedEntry: Entry = patientService.addEntry(req.params.id, newEntry);
    res.status(201).json(addedEntry);
  } catch (error: unknown) {
    let errorMessage: string = 'Something went wrong. ';
    if (error instanceof Error) {
      errorMessage += error.message;
    }
    res.status(400).send(errorMessage);
  }
});

export default router;