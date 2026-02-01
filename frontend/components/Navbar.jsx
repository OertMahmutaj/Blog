import { StyledNavLink, Wrapper } from "../styles/Navbar.styles";

const Navbar = () => {
  return (
    <Wrapper>
      <StyledNavLink to="/blogs">Blogs</StyledNavLink>
      <StyledNavLink to="/users">Users</StyledNavLink>
      <StyledNavLink to="/login">Log in</StyledNavLink>
      <StyledNavLink to="/logout">Log out</StyledNavLink>
    </Wrapper>
  );
};

export default Navbar;
