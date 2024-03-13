import patientsData  from "../../data/patients";
import { NonSensitivePatient, Patient, NewPatient } from "../types";
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
  const newPatient: Patient = {...object, id}
  patientsData.push(newPatient)
  return newPatient
};

export default { getNonSensitivePatients, getPatients, addPatient };