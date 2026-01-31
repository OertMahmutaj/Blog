import { StyledNavLink } from "../styles/Navbar.styles";

const Navbar = () => {
  return (
    <div>
      <StyledNavLink to="/blogs">Blogs</StyledNavLink>
      <StyledNavLink to="/users">Users</StyledNavLink>
      <StyledNavLink to="/login">Log in</StyledNavLink>
    </div>
  );
};

export default Navbar;
