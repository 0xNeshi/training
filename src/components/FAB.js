import {
  faBars,
  faEdit,
  faPlus,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import {
  ChildButton,
  Directions,
  FloatingMenu,
  MainButton,
} from "react-floating-button-menu";

const Icon = ({ icon }) => (
  <FontAwesomeIcon icon={icon} size="lg" color="#28342A" />
);

function FAB({ onAddNoteClicked, onAddBlockClicked }) {
  const [isOpen, setOpen] = useState(false);

  const handleClick = (onClick) => {
    onClick();
    setOpen(false);
  };

  return (
    <FloatingMenu
      slideSpeed={500}
      direction={Directions.Up}
      spacing={8}
      isOpen={isOpen}
    >
      <MainButton
        iconResting={<Icon icon={faBars} />}
        iconActive={<Icon icon={faTimes} />}
        background="white"
        onClick={() => setOpen((prev) => !prev)}
        size={60}
      />
      <ChildButton
        icon={<Icon icon={faPlus} />}
        background="white"
        size={52}
        onClick={() => handleClick(onAddBlockClicked)}
      />
      <ChildButton
        icon={<Icon icon={faEdit} />}
        background="white"
        size={52}
        onClick={() => handleClick(onAddNoteClicked)}
      />
      <ChildButton
        icon={<Icon icon={faSignOutAlt} />}
        background="white"
        size={52}
      />
    </FloatingMenu>
  );
}

export default FAB;
