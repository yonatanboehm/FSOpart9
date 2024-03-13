import { Gender, NewPatient } from "./types";

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const isGender = (gender: string): gender is Gender => {
  return Boolean(Object.values(Gender).map(g => g.toString()).includes(gender))
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

const toNewPatient = (object: unknown): NewPatient => {
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

export default toNewPatient