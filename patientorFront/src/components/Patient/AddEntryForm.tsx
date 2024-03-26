import { useState, SyntheticEvent } from "react";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import {  TextField, Grid, Button } from '@mui/material';
import { EntryFormValues } from "../../types";

interface Props {
  onCancel: () => void;
  onSubmit: (values: EntryFormValues, id: string) => void;
  id: string
}

const AddEntryForm = ({ onCancel, onSubmit, id }: Props) => {
  const [date, setDate] = useState('');
  const [description, setDescription] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [rating, setRating] = useState('');

  const [visibility, setVisibility] = useState('hidden')

  const addEntry = (event: SyntheticEvent) => {
    event.preventDefault();
    onSubmit({
      date,
      description,
      specialist,
      healthCheckRating: Number(rating),
      type: "HealthCheck",
    }, id);
  };

  return (
    <div>
      <form onSubmit={addEntry}>
        <TextField
          label="Date"
          placeholder="YYYY-MM-DD"
          fullWidth 
          value={date}
          onChange={({ target }) => setDate(target.value)}
        />
        <TextField
          label="Description"
          fullWidth
          value={description}
          onChange={({ target }) => setDescription(target.value)}
        />
        <TextField
          label="Specialist"
          fullWidth
          value={specialist}
          onChange={({ target }) => setSpecialist(target.value)}
        />
        <TextField
          label="Health rating"
          fullWidth
          value={rating}
          onChange={({ target }) => setRating((target.value))}
        />
        <Grid>
          <Grid item>
            <Button
              color="secondary"
              variant="contained"
              style={{ float: "left" }}
              type="button"
              onClick={onCancel}
            >
              Cancel
            </Button>
          </Grid>
          <Grid item>
            <Button
              style={{
                float: "right",
              }}
              type="submit"
              variant="contained"
            >
              Add
            </Button>
          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default AddEntryForm;