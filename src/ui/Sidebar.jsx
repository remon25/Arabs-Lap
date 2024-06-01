import { useEffect, useRef } from 'react';
import styled from "styled-components";
import Logo from "./Logo";
import MainNav from "./MainNav";
import { useSidebar } from '../context/SidebarContext';

const StyledSidebar = styled.aside`
  background-color: var(--color-grey-0);
  padding: 3.2rem 2.4rem;
  border-right: 1px solid var(--color-grey-300);
  grid-row: 1/-1;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
  transition: 0.3s all ease-in;
  @media screen and (max-width: 768px) {
    height: 100%;
    position: absolute;
    right: ${props => (props.isSidebarOpen ? '0' : '-100%')};
  }
`;

function Sidebar() {
  const { isSidebarOpen, closeSidebar } = useSidebar();
  const sidebarRef = useRef();

  // Handle click outside the sidebar
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        closeSidebar();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [closeSidebar]);

  return (
    <StyledSidebar ref={sidebarRef} isSidebarOpen={isSidebarOpen}>
      <Logo />
      <MainNav/>
    </StyledSidebar>
  );
}

export default Sidebar;
