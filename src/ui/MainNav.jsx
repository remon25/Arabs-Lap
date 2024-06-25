import { useRoles } from "../features/authentication/useGetRoles";
import { useLogout } from "../features/authentication/useLogout";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import SpinnerMini from "./SpinnerMini";
import {
  HiOutlineHome,
  HiOutlineCalendar,
  HiOutlineUsers,
  HiOutlineCog6Tooth,
  HiOutlineUser,
  HiArrowRightOnRectangle,
} from "react-icons/hi2";
import { ImLab } from "react-icons/im";

import { FaUserEdit } from "react-icons/fa";

import { useSidebar } from "../context/SidebarContext";

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
  const { isAdmin } = useRoles();
  const { logout, isPending } = useLogout();

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
          <StyledNavLink to="/operation-report" onClick={closeSidebar}>
            <HiOutlineCalendar />
            <span> تقرير التشغيل</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/lab-report" onClick={closeSidebar}>
            <ImLab />
            <span>تقرير المختبر</span>
          </StyledNavLink>
        </li>
        {isAdmin && (
          <li>
            <StyledNavLink to="/users" onClick={closeSidebar}>
              <FaUserEdit />
              <span>مستخدم جديد</span>
            </StyledNavLink>
          </li>
        )}
        {isAdmin && (
          <li>
            <StyledNavLink to="/users-list" onClick={closeSidebar}>
              <HiOutlineUsers />
              <span>المستخدمين</span>
            </StyledNavLink>
          </li>
        )}
        <li>
          <StyledNavLink to="/account" onClick={closeSidebar}>
            <HiOutlineUser />
            <span>الحساب</span>
          </StyledNavLink>
        </li>
        <li>
          <StyledNavLink to="/settings" onClick={closeSidebar}>
            <HiOutlineCog6Tooth />
            <span>الإعدادات</span>
          </StyledNavLink>
        </li>
        <li style={{ marginTop: "25px" }}>
          <StyledNavLink disabled={isPending} onClick={logout}>
            {isPending ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
            <span>خروج</span>
          </StyledNavLink>
        </li>
      </NavList>
    </nav>
  );
}
