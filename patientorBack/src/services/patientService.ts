import patientsData  from "../../data/patients";
import { NonSensitivePatient, Patient } from "../types";

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

export default { getNonSensitivePatients, getPatients };