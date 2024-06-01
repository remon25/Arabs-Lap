import { useDarkMode } from "../context/DarkModeContext";
import ButtonIcon from "../ui/ButtonIcon";
import { HiOutlineMoon, HiOutlineSun } from "react-icons/hi2";
export default function DarkMode() {
  const { darkMode, toggleDarkMode } = useDarkMode();
  return (
    <ButtonIcon onClick={toggleDarkMode}>
      {darkMode ? <HiOutlineSun /> : <HiOutlineMoon />}
    </ButtonIcon>
  );
}
