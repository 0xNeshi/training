import {
  Close,
  FitnessCenter,
  Logout,
  Menu,
  NoteAdd,
} from "@mui/icons-material";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  ChildButton,
  Directions,
  FloatingMenu,
  MainButton,
} from "react-floating-button-menu";

export default function FAB({
  onAddNoteClicked,
  onAddBlockClicked,
  onSignOutClicked,
}) {
  const [isOpen, setOpen] = useState(false);
  const ref = useRef();

  const handleClick = useCallback((event, onClick) => {
    event.preventDefault();
    onClick();
    setOpen(false);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const path = event.path || (event.composedPath && event.composedPath());

      if (!path.includes(ref.current)) {
        setOpen(false);
      }
    };

    document.addEventListener("click", handleClickOutside);

    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  return (
    <div ref={ref}>
      <FloatingMenu
        slideSpeed={500}
        direction={Directions.Up}
        spacing={8}
        isOpen={isOpen}
      >
        <MainButton
          iconResting={<Menu fontSize="large" color="primary" />}
          iconActive={<Close fontSize="large" color="primary" />}
          background="lightgrey"
          onClick={(e) => {
            e.preventDefault();
            setOpen((prev) => !prev);
          }}
          size={64}
        />
        <ChildButton
          icon={<FitnessCenter fontSize="large" color="primary" />}
          background="lightgrey"
          size={56}
          onClick={(e) => handleClick(e, onAddBlockClicked)}
        />
        <ChildButton
          icon={<NoteAdd fontSize="large" color="primary" />}
          background="lightgrey"
          size={56}
          onClick={(e) => handleClick(e, onAddNoteClicked)}
        />
        <ChildButton
          icon={<Logout fontSize="large" color="primary" />}
          background="lightgrey"
          size={56}
          onClick={(e) => handleClick(e, onSignOutClicked)}
        />
      </FloatingMenu>
    </div>
  );
}
