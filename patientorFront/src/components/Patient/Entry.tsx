import { Entry, HealthCheckEntry, HospitalEntry, OccupationalHealthcareEntry } from "../../types"
import FavoriteIcon from '@mui/icons-material/Favorite';
import MedicalServicesIcon from '@mui/icons-material/MedicalServices';
import WorkIcon from '@mui/icons-material/Work';

const style = { 
  border: "1px solid",
  borderRadius: "5px",
  margin: "5px",
  padding: "3px"
}

const HealthCheckEntryDetails = ({entry}: {entry: HealthCheckEntry}) => {
  let rating
  switch (entry.healthCheckRating) {
    case 0:
      rating = <FavoriteIcon sx={{ color: "green" }} />
      break
    case 1:
      rating = <FavoriteIcon sx={{ color: "yellow" }} />
      break
    case 2:
      rating = <FavoriteIcon sx={{ color: "orange" }} />
      break
    case 3:
      rating = <FavoriteIcon sx={{ color: "red" }} />
      break
  }
  return (
    <div style={style}>
      <div>{entry.date} <MedicalServicesIcon /></div>
      <div>{entry.description}</div>
      <div>{rating}</div>
      <div>{entry.specialist}</div>
    </div>
  )
}

const HospitalEntryDetails = ({entry}: {entry: HospitalEntry}) => {
  return (
    <div style={style}>
      <div>{entry.date} <MedicalServicesIcon /></div>
      <div>{entry.description}</div>
      <div>{entry.specialist}</div>
    </div>
  )
}

const OccuppationalHealthcareEntryDetails = ({entry}: {entry: OccupationalHealthcareEntry}) => {
  return (
    <div style={style}>
      <div>{entry.date} <WorkIcon/> {entry.employerName}</div>
      <div>{entry.description}</div>
      <div>{entry.specialist}</div>
    </div>
  )
}

const EntryDetails: React.FC<{entry: Entry}> = ({ entry }) => {
  switch(entry.type) {
    case "HealthCheck":
      return <HealthCheckEntryDetails entry={entry} />
    case "Hospital":
      return <HospitalEntryDetails entry={entry} />
    case "OccupationalHealthcare":
      return <OccuppationalHealthcareEntryDetails entry={entry} />
  }
}

export default EntryDetails