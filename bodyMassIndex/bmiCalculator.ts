interface MultiplyValues {
  height: number;
  weight: number;
}

export const parseArguments = (args: string[]): MultiplyValues => {
  if (args.length < 4) throw new Error('Not enough arguments');
  if (args.length > 4) throw new Error('Too many arguments');

  if (!isNaN(Number(args[2])) && !isNaN(Number(args[3]))) {
    return {
      height: Number(args[2]),
      weight: Number(args[3])
    };
  } else {
    throw new Error('Provided values were not numbers!');
  }
};

const calculateBmi = (height: number, weight: number): string => {
  if (isNaN(height) || isNaN(weight)) {
    throw new Error('Provided values were not numbers!');
  }
  const bmi = weight / Math.pow(height/100, 2);
  if (bmi < 18.4) {
    return 'Underweight';
  }
  else if (bmi < 24.9) {
    return 'Normal';
  }
  else if (bmi < 29.9) {
    return 'Overweight';
  }
  else {
    return 'Obese';
  }
};

export default calculateBmi;
