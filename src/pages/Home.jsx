import React, { useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styled, { ThemeProvider } from 'styled-components';
import { theme } from './theme.js';

// Header Component
const Header = styled.header`
  background-color: #2d3a3f;
  background-color: ${(props) => props.theme.darkSkyBlue};
  color: white;
  padding: 20px 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
`;

const LogoImg = styled.img`
  height: 40px;
  margin-right: 15px;
`;

const LogoText = styled.h1`
  font-size: 1.8rem;
  color: white;
  margin: 0;
`;

const NavMenu = styled.nav`
  display: flex;
  gap: 30px;
  padding-bottom: 7px;
`;

const NavItem = styled(Link)`
  color: white;
  text-decoration: none;
  font-size: 1.1rem;
  &:hover {
    text-decoration: underline;
    font-weight: bold;
  }
`;

// Content Layout
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

const Home = () => {
  const [errorMessage, setErrorMessage] = React.useState(null);
  const [showRenderError, setShowRenderError] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    setErrorMessage(null);
    setShowRenderError(false);
  }, [location]);

  return (
    <ThemeProvider theme={theme}>
      <Header>
        <Logo onClick={() => navigate('/')}>
          <LogoImg
            src="https://neh.kea.dk/images/logos/cphbusiness_neg.png"
            alt="Logo"
          />
          {/* <LogoText>Styled App</LogoText> */}
        </Logo>
      </Header>

      <Content>
        <LeftMenu>
          <LeftMenuItem to="/">Home</LeftMenuItem>
          <LeftMenuItem to="/error">Error handling</LeftMenuItem>
          <LeftMenuItem to="/zoopage">Zoo</LeftMenuItem>
          <LeftMenuItem to="/register">Register</LeftMenuItem>
          <LeftMenuItem to="/adminpage">Admin</LeftMenuItem>
          <LeftMenuItem to="/login">Login</LeftMenuItem>
          <LeftMenuItem to="/about">About</LeftMenuItem>
        </LeftMenu>
        <MainContent>
          {errorMessage && <ErrorBanner>{errorMessage}</ErrorBanner>}
          <Outlet />
        </MainContent>
      </Content>
    </ThemeProvider>
  );
};

export default Home;
