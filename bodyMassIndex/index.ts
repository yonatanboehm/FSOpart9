import express from 'express';
import calculateBmi from './bmiCalculator';
import { calculateExercises, InputExercises } from './exerciseCalculator';

const app = express();
app.use(express.json());

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  try {
    const bmi = calculateBmi(height, weight);
    res.json({
      weight,
      height,
      bmi
    });
  } catch (error) {
    res.json({
      error: "malformatted parameters"
    });
  }
});

app.post('/exercises', (req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const body: InputExercises = req.body;
  if (!body.dailyExercises || !body.target) {
    return res.status(401).json({ error: "parameters missing" });
  }
  try {
    const result = calculateExercises(body.dailyExercises, body.target);
    return res.json(result);
  } catch (error) {
    return res.status(401).json({ error: "malformatted parameters" });
  }
});

const PORT = 3002;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});