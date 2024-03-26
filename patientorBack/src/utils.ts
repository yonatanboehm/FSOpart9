import { Gender, NewPatient, Entry, HealthCheckRating, Discharge, Diagnosis } from "./types";
import { v4 as uuid } from "uuid";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Boolean(Object.values(Gender).map(g => g.toString()).includes(gender))
};

const isRating = (rating: number): rating is HealthCheckRating => {
  return Boolean(Object.values(HealthCheckRating).map(r => Number(r)).includes(rating))
};

const parseDiagnosisCodes = (object: unknown): Array<Diagnosis['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    return [] as Array<Diagnosis['code']>;
  }

  return object.diagnosisCodes as Array<Diagnosis['code']>;
};

const parseDischarge = (discharge: unknown): Discharge => {
  if ( !discharge || typeof discharge !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('date' in discharge && 'criteria' in discharge) {
    if (isString(discharge.date) && isDate(discharge.date) && isString(discharge.criteria)) {
      return discharge as Discharge
    }
    throw new Error('Incorrect or missing data');
  };
  throw new Error('Incorrect or missing data');
};

const parseRating = (rating: unknown): HealthCheckRating => {
  if (!(typeof rating === 'number') || !isRating((rating))) {
    throw new Error('Incorrect rating');
  };
  return Number(rating);
};

const parseString = (name: unknown): string => {
  if (!isString(name)) {
    throw new Error('Incorrect name');
  };

  return name;
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect date: ' + date);
  };
  return date;
};

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect gender: ' + gender);
  };

  return gender;
};

export const toNewPatient = (object: unknown): NewPatient => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'gender' in object && 'ssn' in object && 'occupation' in object && 'dateOfBirth' in object) {
    const newPatient: NewPatient = {
      name: parseString(object.name),
      gender: parseGender(object.gender),
      ssn: parseString(object.ssn),
      occupation: parseString(object.occupation),
      dateOfBirth: parseDate(object.dateOfBirth)
    };
    return newPatient;
  }

  throw new Error('Incorrect data: some fields are missing');
};

export const toNewEntry = (object: unknown): Entry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }
  if ('date' in object && 'description' in object && 'specialist' in object && 'type' in object) {
    switch(object.type) {
      case "HealthCheck":
        if ('healthCheckRating' in object) {
          const newEntry = {
            id: uuid(),
            type: object.type,
            date: parseDate(object.date),
            description: parseString(object.description),
            specialist: parseString(object.specialist),
            healthCheckRating: parseRating(object.healthCheckRating),
            diagnosisCodes: parseDiagnosisCodes(object)
          };
          return newEntry
        } else {
          throw new Error('Incorrect data: no health rating provided');
        }
        break
      case "Hospital":
        if ('discharge' in object) {
          const newEntry = {
            id: uuid(),
            type: object.type,
            date: parseDate(object.date),
            description: parseString(object.description),
            specialist: parseString(object.specialist),
            discharge: parseDischarge(object.discharge),
            diagnosisCodes: parseDiagnosisCodes(object)
          };
          return newEntry
        } else {
          throw new Error('Incorrect data: no discharge provided');
        }
        break
      case "OccupationalHealthcare":
        if ('employerName' in object) {
          const newEntry = {
            id: uuid(),
            type: object.type,
            date: parseDate(object.date),
            description: parseString(object.description),
            specialist: parseString(object.specialist),
            employerName: parseString(object.employerName),
            diagnosisCodes: parseDiagnosisCodes(object)
          };
          return newEntry
        } else {
          throw new Error('Incorrect data: no employer name provided');
        }
        break
      default:
        throw new Error('Incorrect data: type incorrect');
    }
  } else {
    throw new Error('Incorrect data: some fields are missing');
  }
}