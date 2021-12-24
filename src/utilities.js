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

const defaultIncrements = {
  squat: 5,
  deadlift: 5,
  overhead: 2.5,
  bench: 2.5,
};

export const getNewBlockSuggestedValues = (sections = []) => {
  const blocks = sections?.filter((s) => s.type === "block");

  if (!blocks?.length) {
    return {
      blockNumber: 1,
      squatMax: "",
      overheadMax: "",
      deadliftMax: "",
      benchMax: "",
    };
  }

  // sections are sorted descending by dateCreated, so sections[0] is the last section
  const currentBlock = blocks[0];
  const blockNumber = currentBlock.number + 1;
  const currentExercises = getLastWeeksExercises(currentBlock);

  const increments =
    blocks.length === 1
      ? defaultIncrements
      : getIncrements(currentBlock, blocks[1]);

  const suggestedValues = currentExercises.reduce(
    (valuesObj, exercise) => {
      const { name, trainingMax } = exercise;
      valuesObj[`${name}Max`] = trainingMax + increments[name];
      return valuesObj;
    },
    {
      blockNumber,
    }
  );

  return suggestedValues;
};

const getIncrements = (currentSection, lastSection) => {
  const currentSectionLastExercises = getLastWeeksExercises(currentSection);
  const lastSectionLastExercises = getLastWeeksExercises(lastSection);

  const increments = {};
  currentSectionLastExercises.forEach((exercise) => {
    const prevExercise = lastSectionLastExercises.find(
      (e) => e.name === exercise.name
    );
    if (prevExercise) {
      increments[prevExercise.name] =
        exercise.trainingMax - prevExercise.trainingMax;
    }
  });

  return increments;
};

const getLastWeeksExercises = (section) =>
  section.weeks.reduce((prev, curr) =>
    curr.number > prev.number ? curr : prev
  ).exercises;
