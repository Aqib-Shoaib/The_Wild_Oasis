import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import GlobalStyles from "../styles/GlobalStyles";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Mian = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 8.4rem;
`;

function AppLayout() {
  return (
    <>
      <GlobalStyles />
      <StyledAppLayout>
        <Header />
        <Sidebar />
        <Mian>
          <Outlet />
        </Mian>
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
