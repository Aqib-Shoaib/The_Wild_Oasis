import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";

const StyledAppLayout = styled.div`
  display: grid;
  height: 100vh;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
`;

const Mian = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 8.4rem;
  overflow: scroll;
`;
const Cunt = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <>
      <StyledAppLayout>
        <Header />
        <Sidebar />
        <Mian>
          <Cunt>
            <Outlet />
          </Cunt>
        </Mian>
      </StyledAppLayout>
    </>
  );
}

export default AppLayout;
