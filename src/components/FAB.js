import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Favorite } from "@mui/icons-material";
import React, { useState } from "react";
import {
  ChildButton,
  Directions,
  FloatingMenu,
  MainButton,
} from "react-floating-button-menu";

function FAB() {
  const [isOpen, setOpen] = useState(false);

  return (
    <FloatingMenu
      slideSpeed={500}
      direction={Directions.Up}
      spacing={8}
      isOpen={isOpen}
    >
      <MainButton
        iconResting={<FontAwesomeIcon icon={faBars} size="lg" color="white" />}
        iconActive={<FontAwesomeIcon icon={faTimes} size="lg" color="white" />}
        background="#28342A"
        onClick={() => setOpen((prev) => !prev)}
        size={70}
      />
      <ChildButton
        icon={<Favorite style={{ fontSize: 20 }} />}
        background="white"
        size={70}
        onClick={() => console.log("First button clicked")}
      />
      <ChildButton
        icon={<Favorite style={{ fontSize: 20 }} />}
        background="white"
        size={70}
      />
      <ChildButton
        icon={<Favorite style={{ fontSize: 20 }} />}
        background="white"
        size={70}
      />
    </FloatingMenu>
  );
}

export default FAB;
