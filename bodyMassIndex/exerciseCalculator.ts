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
    return 1;
  }
  if (1 < hours && hours <= 2) {
    return 2;
  }
  else {
    return 3;
  }
};

const validate = (week: number[], target: number) => {
  const numberWeek = week.map(day => Number(String(day))); // handles booleans becoming 0 and 1
  if (numberWeek.includes(NaN) || isNaN(Number(String(target)))) {
    throw new Error('Provided values were not numbers!');
  }
};

export const calculateExercises = (week: number[], target: number): Result => {
  try {
    validate(week, target);
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
      default:
        ratingDescription = '';
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
    };
  } catch (error) {
    throw new Error('Provided values were not numbers!');
  }
};

export interface InputExercises {
  dailyExercises: number[];
  target: number;
}
