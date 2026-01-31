import { StyledNavLink } from "../styles/Navbar.styles";

const Users = ({ user }) => {
  if (!user) {
    return <div>loading...</div>;
  }


  return (
    <div>
      <p>
        <StyledNavLink to={`${user.id}`}>{user.name}</StyledNavLink> blogs: {user.blogs.length}
      </p>
    </div>
  );
};

export default Users;
