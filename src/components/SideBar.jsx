export default function SideBar() {
  return (
    <div>
      <h1>
        <NavMenu>
          <NavItem to="/">Home</NavItem>
          <NavItem to="/about">About</NavItem>
          <NavItem to="/contact">Contact</NavItem>
        </NavMenu>
      </h1>

      <Content>
        <LeftMenu>
          <LeftMenuItem to="/error">Error handling</LeftMenuItem>
          <LeftMenuItem to="/images">Images</LeftMenuItem>
          <LeftMenuItem to="/stories">Stories</LeftMenuItem>
        </LeftMenu>
        <MainContent>
          {errorMessage && <ErrorBanner>{errorMessage}</ErrorBanner>}
          <Outlet context={{ name: 'Holger', setErrorMessage }} />
        </MainContent>
      </Content>
    </div>
  );
}
