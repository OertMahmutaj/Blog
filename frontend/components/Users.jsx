import { Link } from "react-router-dom";

const Users = ({ user }) => {
  if (!user) {
    return <div>loading...</div>;
  }

  const userStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };

  return (
    <div style={userStyle}>
      <p>
        <Link to={`${user.id}`}>{user.name}</Link> blogs: {user.blogs.length}
      </p>
    </div>
  );
};

export default Users;
