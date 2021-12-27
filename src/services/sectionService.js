import { addDoc, collection, doc, getDocs } from "firebase/firestore";
import { db } from "../config/firebase";
import { mockSections } from "../data";

let tempSections = [...mockSections];
const usersCollection = "users";
const sectionsCollection = "sections";

export const getSections = async (userEmail) => {
  const snapshot = await getDocs(getSectionsCollection(userEmail));

  const sections = snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));

  return sections;
};

export const addSection = async (userEmail, section) => {
  const docRef = await addDoc(
    collection(db, usersCollection, userEmail, sectionsCollection),
    section
  );
  console.log("Document written with ID: ", docRef);
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

const getSectionsCollection = (userEmail) =>
  collection(db, usersCollection, userEmail, sectionsCollection);
