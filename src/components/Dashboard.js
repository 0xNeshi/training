import React from "react";
import { useParams } from "react-router";
import Container from "./Container";

const blocks = [
  {
    number: 1,
    exercise: "squat",
    trainingMax: 75,
  },
  {
    number: 2,
    exercise: "squat",
    trainingMax: 80,
  },
  {
    number: 3,
    exercise: "squat",
    trainingMax: 85,
  },
];

function Dashboard() {
  const { exercise } = useParams();

  return <Container>{exercise}</Container>;
}

export default Dashboard;
