import express from 'express';
import calculateBmi from './bmiCalculator';
const app = express();

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  try {
    const bmi = calculateBmi(height, weight);
    res.json({
      weight,
      height,
      bmi
    })
  } catch (error) {
    res.json({
      error: "malformatted parameters"
    })
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});