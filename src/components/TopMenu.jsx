import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

const StyledMenu = styled.ul`
  display: flex;
  list-style: none;
  gap: 15px;
`;

function TopMenu() {
  return (
    <nav>
      <StyledMenu>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/todos">All Todos</NavLink>
        </li>
        <li>
          <NavLink to="/login">Login</NavLink>
        </li>
        <main>
          <Outlet />
        </main>
      </StyledMenu>
    </nav>
  );
}

export default TopMenu;
