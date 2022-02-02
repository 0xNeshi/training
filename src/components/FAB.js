import {
  faBars,
  faEdit,
  faPlus,
  faSignOutAlt,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
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
          iconResting={<Icon icon={faBars} />}
          iconActive={<Icon icon={faTimes} />}
          background="lightgrey"
          onClick={(e) => {
            e.preventDefault();
            setOpen((prev) => !prev);
          }}
          size={60}
        />
        <ChildButton
          icon={<Icon icon={faPlus} />}
          background="lightgrey"
          size={52}
          onClick={(e) => handleClick(e, onAddBlockClicked)}
        />
        <ChildButton
          icon={<Icon icon={faEdit} />}
          background="lightgrey"
          size={52}
          onClick={(e) => handleClick(e, onAddNoteClicked)}
        />
        <ChildButton
          icon={<Icon icon={faSignOutAlt} />}
          background="lightgrey"
          size={52}
          onClick={(e) => handleClick(e, onSignOutClicked)}
        />
      </FloatingMenu>
    </div>
  );
}

const Icon = ({ icon }) => (
  <FontAwesomeIcon icon={icon} size="lg" color="#222" />
);
