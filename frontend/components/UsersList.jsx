import Users from "./Users";

const UsersList = ({ users }) => {
  if(!users) {
    return null
  }
  return (
    <div>
      {users.map((user) => (
        <Users key={user.id} user={user} />
      ))}
    </div>
  );
};

export default UsersList;
