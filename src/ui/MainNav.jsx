import { NavLink } from "react-router-dom";
import styled from "styled-components";
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
  HiMiniDocumentText,
} from "react-icons/hi2";
import { useSidebar } from '../context/SidebarContext';

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const StyledNavLink = styled(NavLink)`
  &:link,
  &:visited {
    display: flex;
    align-items: center;
    gap: 1.2rem;

    color: var(--color-grey-600);
    font-size: 1.6rem;
    font-weight: 500;
    padding: 1.2rem 2.4rem;
    transition: all 0.3s;
  }

  /* This works because react-router places the active class on the active NavLink */
  &:hover,
  &:active,
  &.active:link,
  &.active:visited {
    color: var(--color-grey-800);
    background-color: var(--color-grey-50);
    border-radius: var(--border-radius-sm);
  }

  & svg {
    width: 2.4rem;
    height: 2.4rem;
    color: var(--color-grey-400);
    transition: all 0.3s;
  }

  &:hover svg,
  &:active svg,
  &.active:link svg,
  &.active:visited svg {
    color: var(--color-brand-600);
  }
  @media screen and (max-width: 992px) {
    &:link,
    &:visited {
      font-size: 1.2rem;
    }
    & svg {
      width: 2rem;
      height: 2rem;
    }
  }
`;

export default function MainNav() {
  const { closeSidebar } = useSidebar();

  return (
    <nav>
      <NavList>
        <li>
          <StyledNavLink to="/dashboard" onClick={closeSidebar}>
            <HiOutlineHome />
            <span>الرئيسية</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/bookings" onClick={closeSidebar}>
            <HiOutlineCalendar />
            <span>تقارير أ</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/cabins" onClick={closeSidebar}>
            <HiMiniDocumentText />
            <span>تقارير ب</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/users" onClick={closeSidebar}>
            <HiOutlineUsers />
            <span>المستخدمين</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings" onClick={closeSidebar}>
            <HiOutlineCog6Tooth />
            <span>الإعدادات</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}
