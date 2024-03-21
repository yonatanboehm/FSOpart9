import { useState, useEffect } from "react";
import { BrowserRouter as Router, Route, Link, Routes, useMatch } from "react-router-dom";
import { Button, Divider, Container, Typography } from '@mui/material';
import { Patient } from "./types";
import PatientDetails from "./components/Patient";
import patientService from "./services/patients";
import PatientListPage from "./components/PatientListPage";

const App = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [patient, setPatient] = useState<Patient | undefined>(undefined)

  const match = useMatch('patients/:id')
  useEffect(() => {
    (async() => {
      if (match && match.params.id) {
        const patientDetails: Patient = await patientService.getOne(match.params.id)
        setPatient(patientDetails)
      } else {
        setPatient(undefined)
      }
    })()
  },[match])

  useEffect(() => {
    const fetchPatientList = async () => {
      const patients = await patientService.getAll();
      setPatients(patients);
    };
    void fetchPatientList();
  }, []);
  
  return (
    <div className="App">
      <Container>
        <Typography variant="h3" style={{ marginBottom: "0.5em" }}>
          Patientor
        </Typography>
        <Button component={Link} to="/" variant="contained" color="primary">
          Home
        </Button>
        <Divider hidden />
        <Routes>
          <Route path="/" element={<PatientListPage patients={patients} setPatients={setPatients} />} />
          <Route path="/patients/:id" element={<PatientDetails patient={patient} />} />
        </Routes>
      </Container>
    </div>
  );
};

export default App;
