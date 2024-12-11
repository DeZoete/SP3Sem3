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

function MainLayout() {
  return (
    <>
      <GlobalStyle />
      <Container>
        <header>
          <TopMenu />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <p>&copy; Jon Bertelsen</p>
          <p>Todo system v. 0.9</p>
        </footer>
      </Container>
    </>
  );
}

export default MainLayout;
