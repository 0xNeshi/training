import { mockSections } from "../data";
import { v4 as uuid } from "uuid";
import { collection, addDoc, doc } from "firebase/firestore";
import { db } from "../config/firebase";

let tempSections = [...mockSections];

export const getSections = () => tempSections;

export const addSection = async (section) => {
  // const sectionsRef = collection(db, 'sections')
  // const docRef = await addDoc(collection(db, "sections"), {
  //   ...section,
  //   id: uuid(),
  // });
  // console.log("Document written with ID: ", docRef);
};

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
