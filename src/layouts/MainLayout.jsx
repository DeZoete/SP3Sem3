import { Link, Outlet } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../pages/theme.js';
import apiFacade from '../util/apiFacade';

const errorMessage = 'This is an error message';

const Header = styled.header`
  background-color: #2d3a3f;
  background-color: ${(props) => props.theme.darkSkyBlue};
  color: white;
  padding: 20px 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LogoLink = styled(Link)`
  text-decoration: none; /* Remove underline */
  display: inline-flex; /* Ensure proper alignment */
`;

const Logo = styled.img`
  display: flex;
  align-items: left;
  height: 80px;
`;

const Content = styled.div`
  display: flex;
  margin-top: 20px;
  height: calc(100vh - 80px);
  color: #333;
`;

const LeftMenu = styled.div`
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
`;

const LeftMenuItem = styled(Link)`
  display: block;
  color: #333;
  text-decoration: none;
  margin-bottom: 10px;
  &:hover {
    text-decoration: underline;
  }
`;
const RightMenu = styled.div`
  display: flex;
  gap: 15px;
`;
const RightMenuItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  &:hover {
    text-decoration: underline;
    font-weight: bold;
  }
`;

const RightSideHeaderContent = styled.div`
  display: flex;
  justify-content: flex-end;
`;

const LeftSideHeaderContent = styled.div`
  display: flex;
  justify-content: flex-start;
`;

const MainContent = styled.div`
  flex: 1;
  padding: 20px;
  background-color: #fafafa;
  border-left: 2px solid #ccc;
  overflow-y: auto; /* Allows scrolling inside the main content if needed */
`;

const ErrorBanner = styled.div`
  background-color: #f8d7da;
  color: #721c24;
  padding: 10px;
  margin-bottom: 20px;
  border-radius: 5px;
`;

function MainLayout({ loggedIn, setLoggedIn }) {
  const logOut = () => {
    apiFacade.logout();
    setLoggedIn(false);
  };
  return (
    <ThemeProvider theme={theme}>
      <Header>
        <LeftSideHeaderContent>
          <LogoLink to="/">
            <Logo src="../../public/logo.png" alt="Logo" />
          </LogoLink>
        </LeftSideHeaderContent>
        <RightSideHeaderContent>
          <RightMenu>
            {loggedIn ? (
              <>
                <RightMenuItem to="/profile">Profile</RightMenuItem>
                <RightMenuItem to="/" as={Link} onClick={logOut}>
                  Logout
                </RightMenuItem>
              </>
            ) : (
              <>
                <RightMenuItem to="/login">Login</RightMenuItem>
                <RightMenuItem to="/register">Register</RightMenuItem>
              </>
            )}
          </RightMenu>
        </RightSideHeaderContent>
      </Header>

      <Content>
        <LeftMenu>
          <LeftMenuItem to="/">Home</LeftMenuItem>
          <LeftMenuItem to="/error">Error handling</LeftMenuItem>
          <LeftMenuItem to="/zoopage">Zoo</LeftMenuItem>
          <LeftMenuItem to="/adminpage">Admin</LeftMenuItem>
          <LeftMenuItem to="/about">About</LeftMenuItem>
        </LeftMenu>
        <MainContent>
          {errorMessage && <ErrorBanner>{errorMessage}</ErrorBanner>}
          <Outlet />
        </MainContent>
      </Content>
    </ThemeProvider>
  );
}

export default MainLayout;
