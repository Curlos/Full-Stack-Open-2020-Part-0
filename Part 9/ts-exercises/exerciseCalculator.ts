interface ExerciseValues { 
  periodLength: number,
  trainingDays: number,
  success: boolean,
  rating: number,
  ratingDescription: string,
  target: number,
  average: number 
};

const calculateExercises = (exercises: Array<number>, targetValue: number): ExerciseValues => {
  let trainingDays: number = 0;
  let totalHours: number = 0;
  exercises.map(dailyHours => {
    dailyHours > 0 ? trainingDays++ : trainingDays;
    totalHours += dailyHours;

  })
  let averageDailyHours: number = totalHours / exercises.length;
  let rating: number = 0;
  let ratingDescription: string = '';

  switch(true) {
    case averageDailyHours >= targetValue:
      rating = 3;
      ratingDescription = 'Great job! Try raising your goal for next week by 10 minutes.'
      break;
    case Math.round(averageDailyHours) === targetValue && averageDailyHours < targetValue:
      rating = 2;
      ratingDescription = 'Not too bad but could be better.';
      break;
    case Math.round(averageDailyHours) < targetValue && averageDailyHours < targetValue:
      rating = 1;
      ratingDescription = 'Horrible job mate, try again next week.';
      break;
  };

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

console.log(calculateExercises([3, 0, 2, 4.5, 0, 3, 1], 1));