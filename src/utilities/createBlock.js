export const createBlock = (
  blockNumber,
  squatMax,
  overheadMax,
  deadliftMax,
  benchMax
) => {
  const weeks = [];
  const numberOfWeeks = 3;

  for (let i = 1; i <= numberOfWeeks; i++) {
    weeks.push({
      number: i,
      exercises: [
        createExercise("squat", squatMax),
        createExercise("overhead", overheadMax),
        createExercise("deadlift", deadliftMax),
        createExercise("bench", benchMax),
      ],
    });
  }

  return {
    type: "block",
    number: blockNumber,
    dateCreated: Date.now(),
    weeks: weeks,
  };
};

const createExercise = (exerciseName, trainingMax) => ({
  name: exerciseName,
  trainingMax,
  amrapReps: 0,
});
