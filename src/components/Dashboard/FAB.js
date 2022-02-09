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

export default function FAB(props) {
  const { onAddNoteClicked, onAddBlockClicked, onSignOutClicked } = props;

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
          iconResting={<Menu fontSize="large" color="secondary" />}
          iconActive={<Close fontSize="large" color="secondary" />}
          background="#33691e"
          onClick={(e) => {
            e.preventDefault();
            setOpen((prev) => !prev);
          }}
          size={64}
        />
        <ChildButton
          icon={<FitnessCenter fontSize="large" color="secondary" />}
          background="#33691e"
          size={56}
          onClick={(e) => handleClick(e, onAddBlockClicked)}
        />
        <ChildButton
          icon={<NoteAdd fontSize="large" color="secondary" />}
          background="#33691e"
          size={56}
          onClick={(e) => handleClick(e, onAddNoteClicked)}
        />
        <ChildButton
          icon={<Logout fontSize="large" color="secondary" />}
          background="#33691e"
          size={56}
          onClick={(e) => handleClick(e, onSignOutClicked)}
        />
      </FloatingMenu>
    </div>
  );
}
