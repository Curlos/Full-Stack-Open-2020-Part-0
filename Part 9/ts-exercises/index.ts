import express from 'express';
import bodyParser from 'body-parser';
import {calculateBmi} from './bmiCalculator';
import {calculateExercises} from './exerciseCalculator';

type exerciseRequestBody = {
  "daily_exercises": Array<number>,
  "target": number
};

const app = express();

app.use(bodyParser.json());

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
        });
      } else {
        throw new Error("malformatted parameters");
      }
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorTyped: { error: string } = {error: e.message};
      res.send(errorTyped);
    }
  } else {
    res.send('BMI');
  }
});

app.post('/exercises', (_req, res) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const exercises: exerciseRequestBody = _req.body;
  
  if(exercises) {

    try {
      res.send(calculateExercises(exercises.daily_exercises, exercises.target));
    } catch (e) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorTyped: { error: string } = {error: "malformatted parameters"};
      res.send(errorTyped);
    }
  } else {
    res.send({error: "parameters missing"});
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});