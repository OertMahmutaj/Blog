import { useReducer, createContext, useContext, useEffect } from "react";
import blogServices from "../services/blogs"
import NotificationContext from "./NotificationContext";

const userReducer = (state, action) => {
  switch (action.type) {
    case "SET_USER":
      return action.payload;
    case "LOGOUT_USER":
      return null;
    default:
      return state;
  }
};

const UserContext = createContext();

export const UserContextProvider = (props) => {
  const [user, dispatchUser] = useReducer(userReducer, null);
  const { setNotification } = useContext(NotificationContext);

  const setUser = (user) => {
    dispatchUser({ type: "SET_USER", payload: user });
    localStorage.setItem('loggedNoteappUser', JSON.stringify(user));
    blogServices.setToken(user.token);
    setNotification(`Welcome ${user.username}`, 3000);
  };

  const clearUser = () => {
    dispatchUser({ type: "LOGOUT_USER" });
    localStorage.clear()
  }

  useEffect(() => {
        const savedUser = localStorage.getItem("loggedNoteappUser")
        if (savedUser) {
            setUser(JSON.parse(savedUser))
        }
    }, [])

  return (
    <UserContext.Provider value={{ user, dispatchUser, setUser, clearUser }}>
      {props.children}
    </UserContext.Provider>
  );
};

export default UserContext;
