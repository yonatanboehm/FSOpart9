import { Patient } from "../types"
import MaleIcon from '@mui/icons-material/Male'
import FemaleIcon from '@mui/icons-material/Female'

const PatientDetails = ({ patient }: {patient: Patient | undefined}) => {
  if (!patient) {
    return null
  }
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
      <h3>{patient.name} {gender}</h3>
      <p>ssn: {patient.ssn}</p>
      <p>occupation: {patient.occupation}</p>
    </div>
  )
}

export default PatientDetails