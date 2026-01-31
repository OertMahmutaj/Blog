import Users from "./Users";
import Togglable from "./Togglable";

const UsersList = ({ users }) => {
  if(!users) {
    return null
  }

  return (
    <div>
      {users.map((user) => (
        <Togglable buttonLabel={`Show details for ${user.name}`}><Users key={user.id} user={user} />
        </Togglable>
      ))}
    </div>
  );
};

export default UsersList;
