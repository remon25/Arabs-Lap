import { Outlet } from "react-router-dom";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styled from "styled-components";
import { SidebarProvider } from '../context/SidebarContext';  

const StyledAppLayout = styled.div`
  display: grid;
  grid-template-columns: 26rem 1fr;
  grid-template-rows: auto 1fr;
  height: 100vh;
  @media screen and (max-width: 992px) {
    grid-template-columns: 19rem 1fr;
  }
  @media screen and (max-width: 768px) {
    grid-template-columns:1fr;
  }
`;

const Main = styled.main`
  background-color: var(--color-grey-50);
  padding: 4rem 4.8rem 6rem;
  overflow: scroll;
  @media screen and (max-width: 576px) {
    padding: 4rem 2.5rem 6rem;

  }
`;

const Container = styled.div`
  max-width: 120rem;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  gap: 3.2rem;
`;

function AppLayout() {
  return (
    <SidebarProvider>
      <StyledAppLayout>
        <Header />
        <Sidebar />
        <Main>
          <Container>
            <Outlet />
          </Container>
        </Main>
      </StyledAppLayout>
    </SidebarProvider>
  );
}

export default AppLayout;
