import { HiArrowRightOnRectangle, HiOutlineUser } from "react-icons/hi2";
import styled from "styled-components";
import ButtonIcon from "./ButtonIcon";
import useLogout from "../features/authentication/useLogout";
import SpinnerMini from "./SpinnerMini";
import UserAvatar from "../features/authentication/UserAvatar";
import { useNavigate } from "react-router-dom";
const Styledheader = styled.header`
  background-color: var(--color-grey-0);
  padding: 1.2rem 4.8rem;
  border-bottom: 3px solid var(--color-grey-100);
  display: flex;
  align-items: center;
  justify-content: flex-end;
  gap: 0.4rem;
`;

function Header() {
  const navigate = useNavigate();
  const { isLoading: isLogingOut, mutate: logout } = useLogout();
  return (
    <Styledheader>
      <UserAvatar />
      <ButtonIcon onClick={() => navigate("/account")}>
        <HiOutlineUser />
      </ButtonIcon>
      <ButtonIcon disabled={isLogingOut} onClick={logout}>
        {isLogingOut ? <SpinnerMini /> : <HiArrowRightOnRectangle />}
      </ButtonIcon>
    </Styledheader>
  );
}

export default Header;
