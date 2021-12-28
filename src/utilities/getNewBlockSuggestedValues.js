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

const getIncrements = (currentBlock, lastBlock) => {
  const currentBlockLastExercises = getLastWeeksExercises(currentBlock);
  const lastBlockLastExercises = getLastWeeksExercises(lastBlock);

  const increments = {};
  currentBlockLastExercises.forEach((exercise) => {
    const prevExercise = lastBlockLastExercises.find(
      (e) => e.name === exercise.name
    );
    if (prevExercise) {
      increments[prevExercise.name] =
        exercise.trainingMax - prevExercise.trainingMax;
    }
  });

  return increments;
};

// Gets exercises from the last week (3) of the block
const getLastWeeksExercises = (block) =>
  block.weeks.reduce((prev, curr) => (curr.number > prev.number ? curr : prev))
    .exercises;
