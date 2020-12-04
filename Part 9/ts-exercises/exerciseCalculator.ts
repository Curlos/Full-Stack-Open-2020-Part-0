interface ExerciseValues { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number 
}

const parseArguments2 = (args: Array<string>): Array<number> => {
  if (args.length < 3) throw new Error('Not enough arguments');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [_arg1, _arg2, ...restOfArgs] = args;
  console.log(`${_arg1} ${_arg2}`);

  return restOfArgs.map((arg, _i) => {
    if (isNaN(Number(arg))) {
      console.log(Number(arg));
      throw new Error('Provided values were not numebrs!');
    }
    return Number(arg);
  });
};


export const calculateExercises = (exercises: Array<number>, targetValue: number): ExerciseValues => {
  let trainingDays = 0;
  let totalHours = 0;
  exercises.map(dailyHours => {
    dailyHours > 0 ? trainingDays++ : trainingDays;
    totalHours += dailyHours;

  });
  const averageDailyHours: number = totalHours / exercises.length;
  let rating = 0;
  let ratingDescription = '';

  switch(true) {
    case averageDailyHours >= targetValue:
      rating = 3;
      ratingDescription = 'Great job! Try raising your goal for next week by 10 minutes.';
      break;
    case Math.round(averageDailyHours) === targetValue && averageDailyHours < targetValue:
      rating = 2;
      ratingDescription = 'Not too bad but could be better.';
      break;
    case Math.round(averageDailyHours) < targetValue && averageDailyHours < targetValue:
      rating = 1;
      ratingDescription = 'Horrible job mate, try again next week.';
      break;
  }

  return {
    periodLength: exercises.length,
    trainingDays: trainingDays,
    success: averageDailyHours >= targetValue ? true : false,
    rating: rating,
    ratingDescription: ratingDescription,
    target: targetValue,
    average: averageDailyHours 
  };
};


try {
  const [targetValue, ...dailyHours] = parseArguments2(process.argv);
  
  console.log(calculateExercises(dailyHours, targetValue));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}

