import Users from "./Users";
import Togglable from "./Togglable";

const UsersList = ({ users }) => {
  if (!users) {
    return null;
  }

  return (
    <div>
      <Togglable buttonLabel={`Show Users`}>
        {users.map((user) => (
          <Users key={user.id} user={user} />
        ))}
      </Togglable>
    </div>
  );
};

export default UsersList;
