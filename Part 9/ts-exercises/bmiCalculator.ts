const calculateBmi = (height: number, weight: number) : string => {
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

console.log(calculateBmi(180, 120))