export const mockBlocks = [
  {
    id: 1,
    number: 1,
    exercise: "squat",
    trainingMax: 75,
    dateCreated: Date.now() - 3000,
    weeks: [
      { number: 1, amrapReps: 10 },
      { number: 2, amrapReps: 7 },
      { number: 3, amrapReps: 6 },
    ],
  },
  {
    id: 2,
    number: 2,
    exercise: "squat",
    trainingMax: 80,
    dateCreated: Date.now() - 2000,
    weeks: [
      { number: 1, amrapReps: 10 },
      { number: 2, amrapReps: 7 },
      { number: 3, amrapReps: 6 },
    ],
  },
  {
    id: 3,
    number: 3,
    exercise: "squat",
    trainingMax: 85,
    dateCreated: Date.now() - 1000,
    weeks: [
      { number: 1, amrapReps: 10 },
      { number: 2, amrapReps: 7 },
      { number: 3, amrapReps: 6 },
    ],
  },
  {
    id: 4,
    number: 4,
    exercise: "squat",
    trainingMax: 90,
    dateCreated: Date.now(),
    weeks: [
      { number: 1, amrapReps: 10 },
      { number: 2, amrapReps: 7 },
      { number: 3, amrapReps: 0 },
    ],
  },
];

export const mockNewBlocks = [
  {
    id: 1,
    number: 1,
    dateCreated: Date.now() - 3000,
    exercises: [
      {
        name: "squat",
        trainingMax: 75,
        weeks: [
          { number: 1, amrapReps: 10 },
          { number: 2, amrapReps: 7 },
          { number: 3, amrapReps: 6 },
        ],
      },
      {
        name: "overhead",
        trainingMax: 50,
        weeks: [
          { number: 1, amrapReps: 10 },
          { number: 2, amrapReps: 8 },
          { number: 3, amrapReps: 6 },
        ],
      },
      {
        name: "deadlift",
        trainingMax: 100,
        weeks: [
          { number: 1, amrapReps: 10 },
          { number: 2, amrapReps: 2 },
          { number: 3, amrapReps: 6 },
        ],
      },
      {
        name: "bench",
        trainingMax: 60,
        weeks: [
          { number: 1, amrapReps: 10 },
          { number: 2, amrapReps: 9 },
          { number: 3, amrapReps: 6 },
        ],
      },
    ],
  },
  {
    id: 2,
    number: 2,
    dateCreated: Date.now() - 1000,
    exercises: [
      {
        name: "squat",
        trainingMax: 80,
        weeks: [
          { number: 1, amrapReps: 12 },
          { number: 2, amrapReps: 7 },
          { number: 3, amrapReps: 0 },
        ],
      },
      {
        name: "overhead",
        trainingMax: 52.5,
        weeks: [
          { number: 1, amrapReps: 5 },
          { number: 2, amrapReps: 8 },
          { number: 3, amrapReps: 0 },
        ],
      },
      {
        name: "deadlift",
        trainingMax: 105,
        weeks: [
          { number: 1, amrapReps: 7 },
          { number: 2, amrapReps: 2 },
          { number: 3, amrapReps: 0 },
        ],
      },
      {
        name: "bench",
        trainingMax: 62.5,
        weeks: [
          { number: 1, amrapReps: 8 },
          { number: 2, amrapReps: 9 },
          { number: 3, amrapReps: 0 },
        ],
      },
    ],
  },
];
