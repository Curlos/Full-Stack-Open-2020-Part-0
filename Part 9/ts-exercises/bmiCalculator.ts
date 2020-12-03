export const parseArguments = (args: Array<string>): Array<number> => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return [Number(args[2]), Number(args[3])]
  } else {
    throw new Error('Provided values were not numbers!');
  }
}


export const calculateBmi = (value1: number, value2: number) : string => {
  const height: number = value1;
  const weight: number = value2;

  const BMI = weight / ((height / 100) ** 2); 

  switch(true) {
    case BMI >= 0 && BMI <= 15:
      return 'Very severely underweight';
    case BMI >= 15 && BMI <= 16:
      return 'Severely underweight';
    case BMI >= 16 && BMI <= 18.5:
      return 'Underweight';
    case BMI >= 18.5 && BMI <= 25:
      return 'Normal (healthy weight)';
    case BMI >= 25 && BMI <= 30:
      return 'Overweight';
    case BMI >= 30 && BMI <= 35:
      return 'Obese Class I (Moderately obese)';
    case BMI >= 35 && BMI <= 40:
      return 'Obese Class II (Severely obese)';
    case BMI >= 40:
      return 'Obese Class III (Very severely obese)';
    default:
      throw new Error('BMI is not valid!');
  }
}

/*
try {
  let value1, value2;
  [value1, value2] = parseArguments(process.argv);
  console.log(calculateBmi(value1, value2));
} catch (e) {
  console.log('Error, something bad happened, message: ', e.message);
}
*/