import styled from "styled-components";
import HeaderMenu from "./HeaderMenu";
import UserAvatar from "../features/authentication/UserAvatar";
import ShowSidebar from "./ShowSidebar";

function Header() {
  const StyledHeader = styled.header`
    background-color: var(--color-grey-0);
    padding: 1.2rem 4.8rem;
    border-bottom: 1px solid var(--color-grey-100);
    display: flex;
    gap: 2.4rem;
    align-items: center;
    justify-content: flex-end;
    @media screen and (max-width:576px) {
      padding: 1.2rem 2.5rem;
    }
  `;
  return (
    <StyledHeader>
      <ShowSidebar/>
      <UserAvatar />
      <HeaderMenu />
    </StyledHeader>
  );
}

export default Header;
