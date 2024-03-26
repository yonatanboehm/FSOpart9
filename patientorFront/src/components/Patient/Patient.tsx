import { Patient, Entry, Diagnosis, EntryFormValues } from "../../types"
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'
import { useEffect, useState } from "react"
import diagnosesService from '../../services/diagnoses'
import EntryDetails from "./Entry"
import AddEntryModal from "./AddEntryModal"
import { Button } from "@mui/material"
import patientsService from "../../services/patients"
import axios from "axios"

const PatientDetails = ({ patient, setPatient }: { 
    patient: Patient | undefined, 
    setPatient: React.Dispatch<React.SetStateAction<Patient | undefined >> 
  }) => {
  const [diagnoses, setDiagnoses] = useState<Diagnosis[]>([])
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [error, setError] = useState<string>();

  useEffect(() => {
    const fetchDiagnoses = async () => {
      const diagnosesData = await diagnosesService.getAll()
      setDiagnoses(diagnosesData)
    }
    void fetchDiagnoses()
  },[])

  const openModal = (): void => setModalOpen(true);

  const closeModal = (): void => {
    setModalOpen(false);
    setError(undefined);
  };

  if (!patient) {
    return null
  }

  const submitNewEntry = async (entryValues: EntryFormValues, id: string) => {
    try {
      const newEntry = await patientsService.createEntry(entryValues, id)
      const patientWithEntry: Patient = {...patient, entries: patient.entries.concat(newEntry)}
      setPatient(patientWithEntry)
      setModalOpen(false);
    } catch (e: unknown) {
      if (axios.isAxiosError(e)) {
        if (e?.response?.data && typeof e?.response?.data === "string") {
          const message = e.response.data.replace('Something went wrong. Error: ', '');
          console.error(message);
          setError(message);
        } else {
          setError("Unrecognized axios error");
        }
      } else {
        console.error("Unknown error", e);
        setError("Unknown error");
      }
    }
  };

  let gender: any
  switch(patient.gender) {
    case "male":
      gender = <MaleIcon />
      break
    case "female": 
      gender = <FemaleIcon />
      break
    case "other":
      break
  }
  return (
    <div>
      <div>
        <h1>{patient.name} {gender}</h1>
        <p>ssn: {patient.ssn}</p>
        <p>occupation: {patient.occupation}</p>
      </div>
      <div>
      <AddEntryModal
        modalOpen={modalOpen}
        onSubmit={submitNewEntry}
        error={error}
        onClose={closeModal}
        id={patient.id}
      />
      <Button variant="contained" onClick={() => openModal()}>
        Add New Entry
      </Button>
      </div>
      <div>
        <h3>Entries</h3>
        {patient.entries.map((entry: Entry) => {
          return ( 
            <EntryDetails entry={entry} key={entry.id}/>
          )
        })}
      </div>
    </div>
    
  )
}

export default PatientDetails