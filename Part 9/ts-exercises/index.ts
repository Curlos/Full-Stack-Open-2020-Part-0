import express from 'express';
import {calculateBmi} from './bmiCalculator'

const app = express();

app.get('/hello', (_req, res) => {
  res.send('Hello Full Stack!');
});

app.get('/bmi', (_req, res) => {

  if(_req.query.height && _req.query.weight) {

    const height = Number(_req.query.height);
    const weight = Number(_req.query.weight);

    try {
      if (!isNaN(Number(height)) && !isNaN(Number(weight))) {
        const bmi = calculateBmi(height, weight);

        res.send({
          weight: weight,
          height: height,
          bmi: bmi
        })
      } else {
        throw new Error("malformatted parameters");
      }
    } catch (e) {
      res.send({
        error: e.message
      });
    }
  } else {
    res.send('BMI');
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});