import { mockSections } from "./data";
import { v4 as uuid } from "uuid";

let tempSections = [...mockSections];

export const getSections = () => tempSections;

export const addSection = (section) =>
  tempSections.push({ ...section, id: uuid() });

export const deleteSection = (sectionId) =>
  (tempSections = tempSections.filter((s) => s.id !== sectionId));

export const updateSection = (sectionId, section) => {
  deleteSection(sectionId);
  tempSections.push(section);
};

export const updateAmrapReps = (
  sectionId,
  weekNumber,
  exerciseName,
  amrapReps
) => {
  const section = tempSections.find((x) => x.id === sectionId);
  const week = section.weeks.find((week) => week.number === weekNumber);
  const exercise = week.exercises.find((e) => e.name === exerciseName);
  exercise.amrapReps = amrapReps;
};
