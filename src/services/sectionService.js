import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  where,
} from "firebase/firestore";
import { db } from "../config/firebase";

const usersCollection = "users";
const sectionsCollection = "sections";

const getSectionsCollection = (userEmail) =>
  collection(db, usersCollection, userEmail, sectionsCollection);

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

export const deleteSection = async (userEmail, sectionId) => {
  await deleteDoc(doc(getSectionsCollection(userEmail), sectionId));

  console.log("Deleted document with ID: ", sectionId);
};

export const updateSection = async (userEmail, section) => {
  const { id, ...sectionFields } = section;
  const blockRef = doc(getSectionsCollection(userEmail), section.id);
  await setDoc(blockRef, sectionFields);

  console.log("Updated document with ID: ", section.id);
};

export async function pushBackup(backup) {
  const docRef = await addDoc(collection(db, "backups"), backup);
  console.log("Added backup with ID: ", docRef);
}

export async function getSectionsFromBackup(userEmail) {
  const q = query(
    collection(db, "backups"),
    where("userEmail", "==", userEmail),
    orderBy("lastBackupTime", "desc"),
    limit(1)
  );
  const snapshot = await getDocs(q);
  const sections = extractSections(snapshot.docs[0].data());
  return sections;
}

function extractSections(backup) {
  const stringifiedSections = Buffer.from(
    backup.base64Sections,
    "base64"
  ).toString("utf8");
  const sections = JSON.parse(stringifiedSections);

  return sections;
}
