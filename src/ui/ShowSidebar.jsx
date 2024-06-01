import { useSidebar } from '../context/SidebarContext';

import styled from "styled-components";
import { HiOutlineMenu } from "react-icons/hi";

export default function ShowSidebar() {
  const { toggleSidebar } = useSidebar();
  const StyledShowSidebar = styled.div`
    margin-left: auto;
    cursor: pointer;
    display: none;
    @media screen and (max-width: 768px) {
      display: block;
        
    }
  `;
  return (
    <StyledShowSidebar onClick={toggleSidebar}>
      <HiOutlineMenu size={24} />
    </StyledShowSidebar>
  );
}
