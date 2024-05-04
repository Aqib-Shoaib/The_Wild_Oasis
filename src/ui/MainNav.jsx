/* eslint-disable no-unused-vars */
import { HiOutlineHome, HiOutlineUser, HiOutlineUsers } from "react-icons/hi";
import {
  HiOutlineCalendarDays,
  HiOutlineCog6Tooth,
  HiOutlineHomeModern,
} from "react-icons/hi2";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NavList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const LinkNav = styled(Link)`
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
`;

function MainNav() {
  return (
    <NavList>
      <li>
        <LinkNav to="dashboard">
          <HiOutlineHome />
          <span>Home</span>
        </LinkNav>
      </li>
      <li>
        <LinkNav to="bookings">
          <HiOutlineCalendarDays />
          <span>Bookings</span>
        </LinkNav>
      </li>
      <li>
        <LinkNav to="cabins">
          <HiOutlineHomeModern />
          <span>Cabins</span>
        </LinkNav>
      </li>
      <li>
        <LinkNav to="users">
          <HiOutlineUsers />
          <span>Users</span>
        </LinkNav>
      </li>
      <li>
        <LinkNav to="settings">
          <HiOutlineCog6Tooth />
          <span>Setting</span>
        </LinkNav>
      </li>
    </NavList>
  );
}

export default MainNav;
