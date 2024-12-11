import { Outlet } from 'react-router';
import styled from 'styled-components';
import TopMenu from '../components/TopMenu';
import GlobalStyle from '../styles/GlobalStyle';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  max-width: var(--small-device);
  width: 100%;
  border: 1px solid blue;
`;

const Header = styled.header`
  padding: 1rem;
  width: 100%;
  max-width: var(--small-device);
  border-bottom: 1px solid silver;
`;

const Main = styled.main`
  padding: 2rem 1rem;
  width: 100%;
  max-width: var(--small-device);
  min-height: 80vh;
`;

const Footer = styled.footer`
  padding: 1rem;
  width: 100%;
  max-width: var(--small-device);
  display: flex;
  justify-content: space-evenly;
  border-top: 1px solid silver;
`;

function MainLayout() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <Header>
          <TopMenu />
        </Header>
        <Footer>
          <p>&copy; Jon Bertelsen</p>
          <p>Todo system v. 0.9</p>
        </Footer>
        <Outlet />
      </Container>
    </>
  );
}

export default MainLayout;
