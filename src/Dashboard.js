import React from "react";
import { useParams } from "react-router";
import Container from "./Container";

function Dashboard() {
  const { exercise } = useParams();

  return <Container>{exercise}</Container>;
}

export default Dashboard;
