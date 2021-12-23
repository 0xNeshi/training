import { mockSections } from "./data";

let tempSections = [...mockSections];

export const getSections = () => tempSections;

export const addSection = (section) => tempSections.push(section);

export const deleteSection = (sectionId) =>
  (tempSections = tempSections.filter((s) => s.id !== sectionId));

export const updateSection = (sectionId, section) => {
  deleteSection(sectionId);
  tempSections.push(section);
};
