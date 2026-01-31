import Users from "./Users";
import Togglable from "./Togglable";

const UsersList = ({ users }) => {
  if(!users) {
    return null
  }

  return (
    <div>
      <Togglable buttonLabel={`Show Users`}>
      {users.map((user) => (
        <Togglable key={user.id} buttonLabel={`Show details for ${user.name}`}><Users user={user} />
        </Togglable>
      ))}
      </Togglable>
    </div>
  );
};

export default UsersList;
