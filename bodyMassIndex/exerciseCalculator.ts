interface Input {
  target: number;
  week: number[];
}

const parseArgs = (args: string[]): Input => {
  if (args.length < 4) throw new Error('Not enough arguments');

  const numberArgs: number[] = args.slice(2).map(arg => Number(arg));
  if (!numberArgs.includes(NaN)) {
    return {
      target: numberArgs[0],
      week: numberArgs.slice(1)
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

const decideRating = (hours: number): number => {
  if (hours <= 1) {
    return 1
  }
  if (1 < hours && hours <= 2) {
    return 2
  }
  else {
    return 3
  }
}

const calculateExercises = (week: number[], target: number): Result => {
  const periodLength: number = week.length;
  const trainingDays: number = week.filter(day => day !== 0).length;
  const average: number = week.reduce((a, b) => a + b) / periodLength;
  const success: boolean = average >= target;
  const rating: number = decideRating(average);
  let ratingDescription: string;
  switch (rating) {
    case 1:
      ratingDescription = 'exercise more';
      break;
    case 2:
      ratingDescription = 'good!';
      break;
    case 3:
      ratingDescription = 'too much exercise';
      break;
  }
  return {
    periodLength,
    trainingDays,
    average,
    success,
    rating,
    target,
    ratingDescription
  }
}

const { target, week } = parseArgs(process.argv)

console.log(calculateExercises(week, target))