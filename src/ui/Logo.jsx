import styled from "styled-components";
import { useDarkMode } from "../context/DarkModeContext";

const StyledLogo = styled.div`
  text-align: center;
`;

const Img = styled.img`
  height: 7rem;
  width: auto;
  @media screen and (max-width: 992px) {
    height: 5.6rem;

  }
`;

function Logo() {
  const { darkMode } = useDarkMode();
  const src = darkMode ? "/test.png" : "/test.png";
  return (
    <StyledLogo>
      <Img src={src} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;
