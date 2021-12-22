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
    weeks: [
      {
        number: 1,
        exercises: [
          {
            name: "squat",
            trainingMax: 75,
            amrapReps: 10,
          },
          {
            name: "overhead",
            trainingMax: 40,
            amrapReps: 11,
          },
          {
            name: "deadlift",
            trainingMax: 100,
            amrapReps: 12,
          },
          {
            name: "bench",
            trainingMax: 50,
            amrapReps: 7,
          },
        ],
      },
      {
        number: 2,
        exercises: [
          {
            name: "squat",
            trainingMax: 75,
            amrapReps: 9,
          },
          {
            name: "overhead",
            trainingMax: 40,
            amrapReps: 10,
          },
          {
            name: "deadlift",
            trainingMax: 100,
            amrapReps: 10,
          },
          {
            name: "bench",
            trainingMax: 50,
            amrapReps: 8,
          },
        ],
      },
      {
        number: 3,
        exercises: [
          {
            name: "squat",
            trainingMax: 75,
            amrapReps: 7,
          },
          {
            name: "overhead",
            trainingMax: 40,
            amrapReps: 7,
          },
          {
            name: "deadlift",
            trainingMax: 100,
            amrapReps: 7,
          },
          {
            name: "bench",
            trainingMax: 50,
            amrapReps: 8,
          },
        ],
      },
    ],
  },
  {
    id: 2,
    number: 2,
    dateCreated: Date.now() - 1000,
    weeks: [
      {
        number: 1,
        exercises: [
          {
            name: "squat",
            trainingMax: 80,
            amrapReps: 10,
          },
          {
            name: "overhead",
            trainingMax: 42.5,
            amrapReps: 11,
          },
          {
            name: "deadlift",
            trainingMax: 105,
            amrapReps: 12,
          },
          {
            name: "bench",
            trainingMax: 52.5,
            amrapReps: 7,
          },
        ],
      },
      {
        number: 2,
        exercises: [
          {
            name: "squat",
            trainingMax: 80,
            amrapReps: 9,
          },
          {
            name: "overhead",
            trainingMax: 42.5,
            amrapReps: 10,
          },
          {
            name: "deadlift",
            trainingMax: 105,
            amrapReps: 10,
          },
          {
            name: "bench",
            trainingMax: 52.5,
            amrapReps: 8,
          },
        ],
      },
      {
        number: 3,
        exercises: [
          {
            name: "squat",
            trainingMax: 80,
            amrapReps: 0,
          },
          {
            name: "overhead",
            trainingMax: 42.5,
            amrapReps: 0,
          },
          {
            name: "deadlift",
            trainingMax: 105,
            amrapReps: 0,
          },
          {
            name: "bench",
            trainingMax: 52.5,
            amrapReps: 0,
          },
        ],
      },
    ],
  },
];
