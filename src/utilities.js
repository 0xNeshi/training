const createBlock = (
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
      nextBlockNumber: 1,
      squatMax: "",
      overheadMax: "",
      deadliftMax: "",
      benchMax: "",
    };
  }

  // sections are sorted descending by dateCreated, so sections[0] is the last section
  const currentBlock = blocks[0];
  const currentExercises = getLastWeeksExercises(currentBlock);

  const increments =
    sections.length === 1 || sections[0].type === "block"
      ? defaultIncrements
      : getIncrements(currentBlock, sections[1]);

  const suggestedValues = currentExercises.reduce((values, exercise) => {
    const { name, trainingMax } = exercise;
    values[`${name}Max`] = trainingMax + increments[name];
    return values;
  }, {});

  const nextBlockNumber = useMemo(
    () => (sections.find((s) => s.type === "block")?.number || 0) + 1,
    [sections]
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
      increments[`${prevExercise.name}Max`] =
        exercise.trainingMax - prevExercise.trainingMax;
    }
  });

  return increments;
};

const getLastWeeksExercises = (section) =>
  section.weeks.reduce((prev, curr) =>
    curr.number > prev.number ? curr : prev
  ).exercises;
