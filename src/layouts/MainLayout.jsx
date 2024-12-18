import { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from '../pages/theme.js';
import apiFacade from '../util/apiFacade';

const Header = styled.header`
  background-color: #2d3a3f;
  background-color: ${(props) => props.theme.darkSkyBlue};
  color: white;
  display: flex;
  padding: 20px 40px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const LogoLink = styled(Link)`
  text-decoration: none;
  display: inline-flex;
`;

const Logo = styled.img`
  display: flex;
  align-items: left;
  height: 80px;
`;

const Body = styled.div`
  display: flex;
  margin-top: 20px;
  height: calc(100vh - 80px);
  color: #333;
`;

const SideBar = styled.div`
  width: 200px;
  background-color: #f4f4f4;
  padding: 20px;
`;

const SideBarItem = styled(Link)`
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
  max-height: 30%;
`;
const HeaderButton = styled(Link)`
  color: white;
  font-size: 1.1rem;
  border: 1px solid white;
  border-radius: 5px;
  &:hover {
    text-decoration: underline;
    font-weight: bold;
  }
`;

const HeaderTitle = styled.h1`
  font-size: 3.5rem;
  flex: 1;
  text-align: center;
  margin: 0;
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

const ErrorButton = styled.button`
  background-color: #f8d7da;
`;

export default function MainLayout() {
  const [errorMessage, setErrorMessage] = useState('');
  const clearError = () => setErrorMessage('');
  const [loggedIn, setLoggedIn] = useState(false);
  const logOut = () => {
    apiFacade.logout();
    setLoggedIn(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <Header>
        <LeftSideHeaderContent>
          <LogoLink to="/">
            <Logo src="../images/logo.png" alt="Logo" />
          </LogoLink>
        </LeftSideHeaderContent>
        <HeaderTitle> Cool Title Bro </HeaderTitle>
        <RightSideHeaderContent>
          {/* <RightMenu> is used for spreading the buttons in the header*/}
          <RightMenu>
            {loggedIn ? (
              <>
                <HeaderButton to="/profile">Profile</HeaderButton>
                <HeaderButton to="/" as={Link} onClick={logOut}>
                  Logout
                </HeaderButton>
              </>
            ) : (
              <>
                <HeaderButton to="/login">Login</HeaderButton>
                <HeaderButton to="/register">Register</HeaderButton>
              </>
            )}
          </RightMenu>
        </RightSideHeaderContent>
      </Header>

      <Body>
        <SideBar>
          <SideBarItem to="/">Home</SideBarItem>
          {/* Skal den her være her?
           <SideBarItem to="/error">Error handling</SideBarItem> */}
          <SideBarItem to="/zoo">Data</SideBarItem>
          <SideBarItem to="/admin">Admin</SideBarItem>
          <SideBarItem to="/about">About</SideBarItem>
        </SideBar>
        <MainContent>
          {errorMessage && (
            <ErrorBanner>
              {errorMessage}
              <ErrorButton onClick={clearError}>Dismiss</ErrorButton>
            </ErrorBanner>
          )}
          <Outlet
            context={{ errorMessage, setErrorMessage, loggedIn, setLoggedIn }}
          />
        </MainContent>
      </Body>
    </ThemeProvider>
  );
}
