const defaultIncrements = {
  squat: 5,
  deadlift: 5,
  overhead: 2.5,
  bench: 2.5,
};

const Exercise = {
  Squat: "squat",
  Deadlift: "deadlift",
  Overhead: "overhead",
  Bench: "bench",
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

  const suggestedValues = Object.keys(Exercise).reduce(
    (valuesObj, enumKey) => {
      const exName = Exercise[enumKey];
      const key = `${exName}Max`;
      const exercise = currentExercises.find((ex) => ex.name === exName);

      valuesObj[key] = exercise ? exercise.trainingMax + increments[exName] : 0;

      return valuesObj;
    },
    { blockNumber }
  );

  return suggestedValues;
};

const getIncrements = (currentBlock, lastBlock) => {
  const currentBlockLastExercises = getLastWeeksExercises(currentBlock);
  const lastBlockLastExercises = getLastWeeksExercises(lastBlock);

  const increments = {};
  currentBlockLastExercises.forEach((exercise) => {
    const prevExercise = lastBlockLastExercises.find(
      (e) => e.name === exercise.name
    );
    increments[exercise.name] = !!prevExercise
      ? exercise.trainingMax - prevExercise.trainingMax
      : defaultIncrements[exercise.name];
  });

  return increments;
};

// Gets exercises from the last week (3) of the block
const getLastWeeksExercises = (block) =>
  block.weeks.reduce((prev, curr) => (curr.number > prev.number ? curr : prev))
    .exercises;
