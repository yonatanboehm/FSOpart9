import patientsData  from "../../data/patients";
import { NonSensitivePatient, Patient, NewPatient, Entry } from "../types";
import { v1 as uuid } from 'uuid'

const getNonSensitivePatients = (): NonSensitivePatient[] => {
  return patientsData.map(({ id, name, dateOfBirth, gender, occupation}) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
};

const getPatients = (): Patient[] => {
  return patientsData;
};

const addPatient = (object: NewPatient): Patient => {
  const id: string = uuid()
  const entries: Entry[] = []
  const newPatient: Patient = {...object, id, entries}
  patientsData.push(newPatient)
  return newPatient
};

const getOnePatient = (id: string): Patient | undefined => {
  const patient = patientsData.find(patient => patient.id === id)
  return patient
}

const addEntry = (id: string, entry: Entry): Entry => {
  const patient = patientsData.find(p => p.id === id)
  if (!patient) {
    throw new Error('wrong id')
  }
  patient.entries.push(entry)
  patientsData.map(p => p.id === id ? patient : p)
  return entry
}

export default { getNonSensitivePatients, getPatients, addPatient, getOnePatient, addEntry };